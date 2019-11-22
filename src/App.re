type importResult = Belt.Result.t(File.t, string);

type state =
  | Importing
  | Researching(Researching.state)
  | Result(Researching.state, ResearchResult.t);

type action =
  | GoToResearch(Researching.state);

let reducer = (state, action) => {
  switch (state, action) {
  | (Importing, GoToResearch(state)) => Researching(state)
  | _ => state
  };
};

[@react.component]
let make = () => {
  let (state, dispatch) = React.useReducer(reducer, Importing);
  switch (state) {
  | Importing =>
    <ImportFlow
      submit={(~config, ~database) =>
        dispatch(GoToResearch(Researching.makeState(~config, ~database)))
      }
    />
  | Researching(state) => <Researching state />
  | Result(_, researchResult) => <ResearchResult researchResult />
  };
};
