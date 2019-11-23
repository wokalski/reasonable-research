'use strict';

var React = require("react");
var FileSaver = require("file-saver");
var Header$ReasonReactExamples = require("./Header.bs.js");
var Window$ReasonReactExamples = require("./Window.bs.js");
var Strings$ReasonReactExamples = require("./Strings.bs.js");
var RedButton$ReasonReactExamples = require("./RedButton.bs.js");

function ResearchResult(Props) {
  var researchResult = Props.researchResult;
  return React.createElement("div", undefined, React.createElement(Header$ReasonReactExamples.make, {
                  title: Strings$ReasonReactExamples.resultTitle
                }), React.createElement("button", {
                  className: RedButton$ReasonReactExamples.className,
                  onClick: (function (param) {
                      FileSaver.saveAs(researchResult, "Result.csv");
                      return Window$ReasonReactExamples.onBeforeUnload(undefined);
                    })
                }, Strings$ReasonReactExamples.download));
}

var make = ResearchResult;

exports.make = make;
/* react Not a pure module */
