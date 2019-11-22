'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var ImportFlow$ReasonReactExamples = require("./ImportFlow.bs.js");
var Researching$ReasonReactExamples = require("./Researching.bs.js");
var ResearchResult$ReasonReactExamples = require("./ResearchResult.bs.js");

function reducer(state, action) {
  if (typeof state === "number") {
    return /* Researching */Block.__(0, [action[0]]);
  } else {
    return state;
  }
}

function App(Props) {
  var match = React.useReducer(reducer, /* Importing */0);
  var dispatch = match[1];
  var state = match[0];
  if (typeof state === "number") {
    return React.createElement(ImportFlow$ReasonReactExamples.make, {
                submit: (function (config, database) {
                    return Curry._1(dispatch, /* GoToResearch */[Researching$ReasonReactExamples.makeState(config, database)]);
                  })
              });
  } else if (state.tag) {
    return React.createElement(ResearchResult$ReasonReactExamples.make, {
                researchResult: state[1]
              });
  } else {
    return React.createElement(Researching$ReasonReactExamples.make, {
                state: state[0]
              });
  }
}

var make = App;

exports.reducer = reducer;
exports.make = make;
/* react Not a pure module */
