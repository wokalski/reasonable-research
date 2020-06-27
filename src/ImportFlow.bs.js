'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Header$ReasonReactExamples = require("./Header.bs.js");
var Strings$ReasonReactExamples = require("./Strings.bs.js");
var RedButton$ReasonReactExamples = require("./RedButton.bs.js");
var FileImport$ReasonReactExamples = require("./FileImport.bs.js");
var LinkButton$ReasonReactExamples = require("./LinkButton.bs.js");

function reducer(state, action) {
  return /* ImportingDatabase */[action[0]];
}

function ImportFlow(Props) {
  var loadSaved = Props.loadSaved;
  var submit = Props.submit;
  var match = React.useReducer(reducer, /* ImportingDatabase */[undefined]);
  var dispatch = match[1];
  var currentDatabase = match[0][0];
  var match$1 = React.useState((function () {
          return "";
        }));
  var setConfig = match$1[1];
  var config = match$1[0];
  var tmp;
  if (loadSaved !== undefined) {
    var load = loadSaved;
    tmp = config === "" ? React.createElement("button", {
            className: RedButton$ReasonReactExamples.className + " mt-4",
            onClick: (function (param) {
                return Curry._1(load, /* () */0);
              })
          }, Strings$ReasonReactExamples.loadSaved) : null;
  } else {
    tmp = null;
  }
  var tmp$1;
  if (currentDatabase !== undefined) {
    var match$2 = currentDatabase;
    if (match$2.tag) {
      tmp$1 = null;
    } else {
      var database = match$2[0];
      tmp$1 = React.createElement("div", {
            className: "mt-6"
          }, React.createElement(LinkButton$ReasonReactExamples.make, {
                title: Strings$ReasonReactExamples.next,
                onClick: (function (param) {
                    return Curry._2(submit, config, database);
                  })
              }));
    }
  } else {
    tmp$1 = null;
  }
  return React.createElement("div", undefined, React.createElement(Header$ReasonReactExamples.make, {
                  title: Strings$ReasonReactExamples.createConfig
                }), React.createElement("textarea", {
                  className: "font-mono w-5/6 h-32 p-2",
                  placeholder: "SOURCE_COLUMN;RESULT_COLUMN;SEARCH_PHRASE;SEARCH_PHRASE_2;SEARCH_PHRASE_3\n    SOURCE_COLUMN_2;RESULT_COLUMN;SEARCH_PHRASE;SEARCH_PHRASE2;...",
                  value: config,
                  onChange: (function (x) {
                      var nextValue = x.target.value;
                      return Curry._1(setConfig, (function (param) {
                                    return nextValue;
                                  }));
                    })
                }), tmp, React.createElement(FileImport$ReasonReactExamples.make, {
                  title: Strings$ReasonReactExamples.importDatabase,
                  currentImport: currentDatabase,
                  onImportedFile: (function (file) {
                      return Curry._1(dispatch, /* ImportedDatabase */[file]);
                    })
                }), tmp$1);
}

var make = ImportFlow;

exports.reducer = reducer;
exports.make = make;
/* react Not a pure module */
