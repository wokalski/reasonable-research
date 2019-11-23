module LocalStorage = {
  open Dom.Storage2;
  let saveConfig = setItem(localStorage, "config");
  let saveDb = setItem(localStorage, "db");
  let removeConfig = () => removeItem(localStorage, "config");
  let removeDb = () => removeItem(localStorage, "db");
  let getConfig = () => getItem(localStorage, "config");
  let getDb = () => getItem(localStorage, "db");
  let generateOperations = key => {
    (
      index => setItem(localStorage, key, Js.Int.toString(index)),
      () => removeItem(localStorage, key),
      () =>
        Belt.Option.map(getItem(localStorage, key), num =>
          num |> Js.Float.fromString |> int_of_float
        ),
    );
  };
  let (saveRowIndex, removeRowIndex, getRowIndex) =
    generateOperations("rowIndex");
  let (saveQueryIndex, removeQueryIndex, getQueryIndex) =
    generateOperations("queryIndex");
};

type result = array(Js.Dict.t(string));

type query = {
  column: string,
  keyphrase: string,
  resultColumn: string,
};
type search = {
  saveProgress: unit => unit,
  slug: string,
  getTextHTML: unit => React.element,
  submit: bool => t,
  back: option(unit => t),
}
and t = {
  currentSearch: option(search),
  result,
};

type queryState = {
  queryIndex: int,
  queries: array(query),
  rowIndex: int,
};

type location = {
  from: int,
  to_: int,
};

let getInitialQueryState = (~rowIndex, ~queryIndex, ~database, ~queries) => {
  let dbLength = Js.Array.length(database);
  let queriesLength = Js.Array.length(queries);
  if (dbLength > 0 && queriesLength > 0) {
    let queryIndex = queryIndex < queriesLength ? queryIndex : 0;
    let rowIndex = rowIndex < dbLength ? rowIndex : 0;
    Some({queryIndex, queries, rowIndex});
  } else {
    None;
  };
};

let getNextQueryState = (~database, ~queryState) =>
  if (Array.length(database) > 0) {
    if (Js.Array.length(database) > queryState.rowIndex + 1) {
      Some({...queryState, rowIndex: queryState.rowIndex + 1});
    } else if (queryState.queryIndex
               + 1 == Js.Array.length(queryState.queries)) {
      None;
    } else {
      Some({
        queryIndex: queryState.queryIndex + 1,
        queries: queryState.queries,
        rowIndex: 0,
      });
    };
  } else {
    None;
  };

let normalize = str =>
  Js.String.normalizeByForm("NFD", str)
  |> Js.String.replaceByRe(
       Js.Re.fromStringWithFlags("[\u0300-\u036f]", ~flags="g"),
       "",
     )
  |> Js.String.toLowerCase;

let findKeyphrase = (~query, string) => {
  let normalizedQuery = normalize(query);
  let normalizedString = normalize(string);
  let length = Js.String.length(normalizedQuery);
  let rec findFromIndex = (index, acc) => {
    let nextIndex =
      Js.String.indexOfFrom(normalizedQuery, index, normalizedString);
    if (nextIndex == (-1)) {
      acc;
    } else {
      findFromIndex(
        nextIndex + length,
        [{from: nextIndex, to_: nextIndex + length + 1}, ...acc],
      );
    };
  };
  findFromIndex(0, []) |> List.rev;
};

let buildTextHTML = (~text, ~locations) => {
  let (prevMatchLocation, acc) =
    List.fold_left(
      ((prevMatchLocation, acc), location) => {
        let nonHighlighted =
          Js.String.substring(
            ~from=prevMatchLocation,
            ~to_=location.from,
            text,
          )
          |> React.string;
        let highlighted =
          Js.String.substring(~from=location.from, ~to_=location.to_, text)
          |> React.string;
        (
          location.to_,
          [<Highlighted> highlighted </Highlighted>, nonHighlighted, ...acc],
        );
      },
      (0, []),
      locations,
    );
  (
    if (prevMatchLocation < Js.String.length(text) - 1) {
      [
        React.string(Js.String.substr(~from=prevMatchLocation, text)),
        ...acc,
      ];
    } else {
      acc;
    }
  )
  |> List.rev
  |> Array.of_list
  |> React.array;
};

let getQuery = ({queryIndex, queries}) => queries[queryIndex];

let rec generate = (~config, ~previous, ~database, ~queryState) => {
  let {rowIndex} = queryState;
  let query = getQuery(queryState);
  let row = database[rowIndex];
  let text = Js.Dict.get(row, query.column);
  let nextSearch = (~previous) => {
    switch (getNextQueryState(~database, ~queryState)) {
    | Some(nextQueryState) =>
      generate(~config, ~previous, ~database, ~queryState=nextQueryState)
    | None => {currentSearch: None, result: database}
    };
  };
  switch (text) {
  | None => nextSearch(~previous)
  | Some(text) =>
    let matches = findKeyphrase(~query=query.keyphrase, text);
    switch (matches) {
    | [] => nextSearch(~previous)
    | locations =>
      let rec this = {
        currentSearch:
          Some({
            saveProgress: () => {
              LocalStorage.saveDb(Papa.unparse(database));
              LocalStorage.saveConfig(Papa.unparseWithoutHeaders(config));
              LocalStorage.saveQueryIndex(queryState.queryIndex);
              LocalStorage.saveRowIndex(queryState.rowIndex);
              Window.onBeforeUnload(None);
            },
            slug: query.column ++ " - " ++ query.keyphrase,
            getTextHTML: () => buildTextHTML(~text, ~locations),
            submit: result => {
              Window.onBeforeUnload(
                Some(evt => evt.returnValue = "WARNING, UNSAVED"),
              );
              Js.Dict.set(row, query.resultColumn, result ? "1" : "0");
              nextSearch(~previous=Some(this));
            },
            back:
              switch (previous) {
              | Some(previous) => Some(() => previous)
              | None => None
              },
          }),
        result: database,
      };
      this;
    };
  };
};

let createSearchState = (~rowIndex=0, ~queryIndex=0, ~config, ~database, ()) => {
  open Belt.Result;
  let result =
    Js.Array.reduce(
      (acc, row) =>
        switch (acc, row) {
        | (Ok(queries), [|column, keyphrase, resultColumn|]) =>
          Js.Array.push({column, keyphrase, resultColumn}, queries) |> ignore;
          Ok(queries);
        | (Ok(queries), [|""|]) => Ok(queries)
        | _ => Error(Strings.invalidConfigFormat)
        },
      Ok([||]),
      config,
    );
  flatMapU(result, (. queries) =>
    switch (getInitialQueryState(~rowIndex, ~queryIndex, ~database, ~queries)) {
    | None => Error(Strings.noMatches)
    | Some(queryState) =>
      Ok(generate(~config, ~previous=None, ~database, ~queryState))
    }
  );
};

let make = (~config, ~database) =>
  Belt.Result.(
    Js.Promise.(
      all2((Papa.parse(config), Papa.parseWithHeader(database)))
      |> then_(
           fun
           | (Ok(config), Ok(database)) => {
               createSearchState(~config, ~database, ()) |> resolve;
             }
           | (Error(_), _) => resolve(Error(Strings.couldntLoadConfig))
           | (_, Error(_)) => resolve(Error(Strings.couldntLoadDatabase)),
         )
    )
  );

let load = () => {
  let onError = () => {
    LocalStorage.removeConfig();
    LocalStorage.removeDb();
    LocalStorage.removeQueryIndex();
    LocalStorage.removeRowIndex();
    None;
  };
  switch (
    LocalStorage.getConfig(),
    LocalStorage.getDb(),
    LocalStorage.getRowIndex(),
    LocalStorage.getQueryIndex(),
  ) {
  | (Some(config), Some(database), Some(rowIndex), Some(queryIndex)) =>
    let config = Papa.String.parseWithoutHeader(config);
    let database = Papa.String.parse(database);
    switch (createSearchState(~rowIndex, ~queryIndex, ~config, ~database, ())) {
    | Ok(r) => Some(r)
    | Error(_) => onError()
    };
  | _ => onError()
  };
};
