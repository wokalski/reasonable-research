'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Strings$ReasonReactExamples = require("./Strings.bs.js");
var FileImport$ReasonReactExamples = require("./FileImport.bs.js");

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

function importConfigOpacity(param) {
  if (param.tag) {
    return 0.4;
  } else {
    return 1;
  }
}

function ImportFlow(Props) {
  var submit = Props.submit;
  var match = React.useReducer(reducer, /* ImportingConfig */Block.__(0, [undefined]));
  var dispatch = match[1];
  var state = match[0];
  var tmp;
  if (state.tag) {
    var currentDatabase = state[1];
    var config = state[0];
    var tmp$1;
    if (config.tag || currentDatabase === undefined) {
      tmp$1 = null;
    } else {
      var match$1 = currentDatabase;
      var config$1 = config[0];
      if (match$1.tag) {
        tmp$1 = null;
      } else {
        var database = match$1[0];
        tmp$1 = React.createElement("button", {
              onClick: (function (param) {
                  return Curry._2(submit, config$1, database);
                })
            });
      }
    }
    tmp = React.createElement(React.Fragment, {
          children: null
        }, React.createElement(FileImport$ReasonReactExamples.make, {
              title: Strings$ReasonReactExamples.importDatabase,
              currentImport: currentDatabase,
              opacity: 1,
              onImportedFile: (function (file) {
                  return Curry._1(dispatch, /* ImportedDatabase */Block.__(1, [file]));
                })
            }), tmp$1);
  } else {
    tmp = null;
  }
  return React.createElement(React.Fragment, {
              children: null
            }, React.createElement(FileImport$ReasonReactExamples.make, {
                  title: Strings$ReasonReactExamples.importConfig,
                  currentImport: currentConfig(state),
                  opacity: importConfigOpacity(state),
                  onImportedFile: (function (file) {
                      return Curry._1(dispatch, /* ImportedConfig */Block.__(0, [file]));
                    })
                }), tmp);
}

var make = ImportFlow;

exports.reducer = reducer;
exports.currentConfig = currentConfig;
exports.importConfigOpacity = importConfigOpacity;
exports.make = make;
/* react Not a pure module */
