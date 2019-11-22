module ResearchProgress = {
  type query = {
    column: string,
    keyphrase: string,
    resultColumn: string,
  };
  type search = {
    slug: string,
    getTextHTML: unit => React.element,
    submit: bool => t,
    back: option(unit => t),
  }
  and t = {
    currentSearch: option(search),
    result: list(Js.Dict.t(string)),
  };

  type queryState = {
    query,
    nextQueries: list(query),
    rowIndex: int,
  };

  type location = {
    from: int,
    to_: int,
  };

  let getNextQueryState = (~database, ~nextQueries, ~rowIndex) =>
    if (Array.length(database) > 0) {
      switch (nextQueries) {
      | [] => None
      | [query, ...rest] =>
        if (Js.Array.length(database) > rowIndex + 1) {
          Some({query, nextQueries: rest, rowIndex: rowIndex + 1});
        } else {
          switch (rest) {
          | [] => None
          | [nextQuery, ...rest] =>
            Some({query: nextQuery, nextQueries: rest, rowIndex: 0})
          };
        }
      };
    } else {
      None;
    };

  let normalize = str =>
    Js.String.normalizeByForm(str, "NFD")
    |> Js.String.replaceByRe(
         Js.Re.fromStringWithFlags("[\u0300-\u036f]", ~flags="g"),
         "",
       );

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
            [<bold> highlighted </bold>, nonHighlighted, ...acc],
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

  let rec next =
          (~database, ~queryState as {nextQueries, rowIndex}, ~updatedDB) => {
    switch (getNextQueryState(~database, ~nextQueries, ~rowIndex)) {
    | None => {currentSearch: None, result: updatedDB}
    | Some({query, rowIndex: index} as queryState) =>
      let row = database[index] |> Js.Dict.entries |> Js.Dict.fromArray;
      let text = Js.Dict.get(row, query.column);
      switch (text) {
      | None => next(~database, ~queryState, ~updatedDB)
      | Some(text) =>
        let matches = findKeyphrase(~query=query.keyphrase, text);
        switch (matches) {
        | [] => next(~database, ~queryState, ~updatedDB)
        | locations => {
            currentSearch:
              Some({
                slug: query.column ++ " - " ++ query.keyphrase,
                getTextHTML: () => buildTextHTML(~text, ~locations),
                submit: result => {
                  Js.Dict.set(row, query.resultColumn, result ? "1" : "0");
                  next(
                    ~database,
                    ~queryState,
                    ~updatedDB=[row, ...updatedDB],
                  );
                },
                back: None,
              }),
            result: updatedDB,
          }
        };
      };
    };
  };

  let make = (~config, ~database) =>
    Belt.Result.(
      Js.Promise.(
        all2((Papa.parse(config), Papa.parseWithHeader(database)))
        |> then_(
             fun
             | (Ok(config), Ok(database)) => {
                 let result =
                   Js.Array.reduce(
                     (acc, row) =>
                       switch (acc, row) {
                       | (Ok(queries), [|column, keyphrase, resultColumn|]) =>
                         Js.Array.push(
                           {column, keyphrase, resultColumn},
                           queries,
                         )
                         |> ignore;
                         Ok(queries);
                       | _ => Error(Strings.invalidConfigFormat)
                       },
                     Ok([||]),
                     config,
                   );
                 flatMapU(result, (. queries) =>
                   switch (
                     getNextQueryState(
                       ~database,
                       ~nextQueries=Array.to_list(queries),
                       ~rowIndex=0,
                     )
                   ) {
                   | None => Error(Strings.noMatches)
                   | Some(queryState) =>
                     Ok(next(~database, ~queryState, ~updatedDB=[]))
                   }
                 )
                 |> resolve;
               }
             | (Error(_), _) => resolve(Error(Strings.couldntLoadConfig))
             | (_, Error(_)) => resolve(Error(Strings.couldntLoadDatabase)),
           )
      )
    );
};

module ControlButtons = {
  [@react.component]
  let make = () => <div />;
};

type state = {
  config: File.t,
  database: File.t,
  researchProgress: ResearchProgress.t,
};

let makeState = (~config, ~database) => {
  config,
  database,
  researchProgress: (),
};

[@react.component]
let make = (~state: state) => {
  let current = ResearchProgress.current(state.researchProgress);
  <div>
    <h1> {React.string(Strings.researchTitle)} </h1>
    <span> {React.string(current.slug)} </span>
    <div> {current.getTextHTML()} </div>
    <ControlButtons />
  </div>;
};
