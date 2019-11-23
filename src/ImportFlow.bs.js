'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Strings$ReasonReactExamples = require("./Strings.bs.js");
var RedButton$ReasonReactExamples = require("./RedButton.bs.js");
var FileImport$ReasonReactExamples = require("./FileImport.bs.js");
var LinkButton$ReasonReactExamples = require("./LinkButton.bs.js");

function reducer(state, action) {
  if (state.tag) {
    if (action.tag) {
      return /* ImportingDatabase */Block.__(1, [
                state[0],
                action[0]
              ]);
    } else {
      return /* ImportingDatabase */Block.__(1, [
                action[0],
                state[1]
              ]);
    }
  } else if (action.tag) {
    return state;
  } else {
    var result = action[0];
    if (result.tag) {
      return /* ImportingConfig */Block.__(0, [result]);
    } else {
      return /* ImportingDatabase */Block.__(1, [
                /* Ok */Block.__(0, [result[0]]),
                undefined
              ]);
    }
  }
}

function currentConfig(param) {
  if (param.tag) {
    return param[0];
  } else {
    return param[0];
  }
}

function ImportFlow(Props) {
  var loadSaved = Props.loadSaved;
  var submit = Props.submit;
  var match = React.useReducer(reducer, /* ImportingConfig */Block.__(0, [undefined]));
  var dispatch = match[1];
  var state = match[0];
  var match$1 = currentConfig(state);
  var tmp;
  if (loadSaved !== undefined && match$1 === undefined) {
    var load = loadSaved;
    tmp = React.createElement("button", {
          className: RedButton$ReasonReactExamples.className + " mt-4",
          onClick: (function (param) {
              return Curry._1(load, /* () */0);
            })
        }, Strings$ReasonReactExamples.loadSaved);
  } else {
    tmp = null;
  }
  var tmp$1;
  if (state.tag) {
    var currentDatabase = state[1];
    var config = state[0];
    var tmp$2;
    if (config.tag || currentDatabase === undefined) {
      tmp$2 = null;
    } else {
      var match$2 = currentDatabase;
      var config$1 = config[0];
      if (match$2.tag) {
        tmp$2 = null;
      } else {
        var database = match$2[0];
        tmp$2 = React.createElement(LinkButton$ReasonReactExamples.make, {
              title: Strings$ReasonReactExamples.next,
              onClick: (function (param) {
                  return Curry._2(submit, config$1, database);
                })
            });
      }
    }
    tmp$1 = React.createElement(React.Fragment, {
          children: null
        }, React.createElement(FileImport$ReasonReactExamples.make, {
              title: Strings$ReasonReactExamples.importDatabase,
              currentImport: currentDatabase,
              onImportedFile: (function (file) {
                  return Curry._1(dispatch, /* ImportedDatabase */Block.__(1, [file]));
                })
            }), tmp$2);
  } else {
    tmp$1 = null;
  }
  return React.createElement("div", undefined, React.createElement(FileImport$ReasonReactExamples.make, {
                  title: Strings$ReasonReactExamples.importConfig,
                  currentImport: currentConfig(state),
                  onImportedFile: (function (file) {
                      return Curry._1(dispatch, /* ImportedConfig */Block.__(0, [file]));
                    })
                }), tmp, tmp$1);
}

var make = ImportFlow;

exports.reducer = reducer;
exports.currentConfig = currentConfig;
exports.make = make;
/* react Not a pure module */
