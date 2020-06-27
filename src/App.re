type importResult = Belt.Result.t(File.t, string);

[@bs.val] external alert: string => unit = "alert";

type state =
  | Importing(option(ResearchProgress.search))
  | Researching(ResearchProgress.search)
  | Result(ResearchResult.t);

type action =
  | LoadFailed
  | LoadSucceded(ResearchProgress.search)
  | GoToResearch(ResearchProgress.search)
  | ShowResults(ResearchProgress.result);

let reducer = (state, action) => {
  switch (state, action) {
  | (Importing(_), GoToResearch(state)) => Researching(state)
  | (Importing(_), LoadSucceded(state)) => Importing(Some(state))
  | (Researching(_), GoToResearch(state)) => Researching(state)
  | (Researching(_), ShowResults(result)) =>
    let csv = Papa.unparse(result);
    Result(FileSaver.Blob.make([|csv|], {type_: "text/csv"}));
  | _ => state
  };
};

[@react.component]
let make = () => {
  open Belt.Result;
  open ResearchProgress;
  let (state, dispatch) = React.useReducer(reducer, Importing(None));
  React.useEffect1(
    () => {
      if (state == Importing(None)) {
        switch (ResearchProgress.load()) {
        | Some({currentSearch: Some(search)}) =>
          dispatch(LoadSucceded(search))
        | Some({result}) => dispatch(ShowResults(result))
        | None => dispatch(LoadFailed)
        };
      };
      None;
    },
    [|state|],
  );
  let handleNewState = state => {
    switch (state) {
    | {currentSearch: Some(search)} => dispatch(GoToResearch(search))
    | {result} => dispatch(ShowResults(result))
    };
  };
  switch (state) {
  | Importing(saved) =>
    <ImportFlow
      loadSaved={
        switch (saved) {
        | Some(search) => Some(() => dispatch(GoToResearch(search)))
        | None => None
        }
      }
      submit={(~config, ~database) => {
        ResearchProgress.make(~config, ~database)
        |> Js.Promise.then_(result =>
             (
               switch (result) {
               | Ok({currentSearch: Some(search)}) =>
                 dispatch(GoToResearch(search))
               | Ok(_) => alert(Strings.noMatches)
               | Error(error) => alert(error)
               }
             )
             |> Js.Promise.resolve
           )
        |> ignore
      }}
    />
  | Researching({
      resultColumn,
      items,
      submit,
      back,
      saveProgress,
      currentValue,
      row,
    }) =>
    <Researching
      items={List.map(
        ({slug, getTextHTML}) =>
          {Researching.slug, textHTML: getTextHTML()},
        items,
      )}
      resultColumn
      saveProgress
      onYes={() => handleNewState(submit(Yes))}
      onNo={() => handleNewState(submit(No))}
      onSkip={() => handleNewState(submit(Idontknow))}
      onBack={
        switch (back) {
        | Some(handler) => Some(() => handleNewState(handler()))
        | None => None
        }
      }
      row
      currentValue
    />
  | Result(researchResult) => <ResearchResult researchResult />
  };
};
