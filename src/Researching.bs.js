'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Header$ReasonReactExamples = require("./Header.bs.js");
var Strings$ReasonReactExamples = require("./Strings.bs.js");
var LinkButton$ReasonReactExamples = require("./LinkButton.bs.js");

function Researching$ControlButtons(Props) {
  var onYes = Props.onYes;
  var onNo = Props.onNo;
  var onBack = Props.onBack;
  var tmp;
  if (onBack !== undefined) {
    var onBack$1 = onBack;
    tmp = React.createElement(LinkButton$ReasonReactExamples.make, {
          title: Strings$ReasonReactExamples.goBack,
          onClick: (function (param) {
              return Curry._1(onBack$1, /* () */0);
            })
        });
  } else {
    tmp = null;
  }
  return React.createElement("div", {
              className: "flex justify-between"
            }, React.createElement("span", undefined, tmp), React.createElement("div", {
                  className: "flex flex-row"
                }, React.createElement(LinkButton$ReasonReactExamples.make, {
                      title: Strings$ReasonReactExamples.no,
                      onClick: (function (param) {
                          return Curry._1(onNo, /* () */0);
                        })
                    }), React.createElement("div", {
                      className: "w-6"
                    }), React.createElement(LinkButton$ReasonReactExamples.make, {
                      title: Strings$ReasonReactExamples.yes,
                      onClick: (function (param) {
                          return Curry._1(onYes, /* () */0);
                        })
                    })));
}

var ControlButtons = {
  make: Researching$ControlButtons
};

function Researching(Props) {
  var slug = Props.slug;
  var textHTML = Props.textHTML;
  var onYes = Props.onYes;
  var onNo = Props.onNo;
  var onBack = Props.onBack;
  var saveProgress = Props.saveProgress;
  return React.createElement("div", {
              className: "flex flex-col"
            }, React.createElement("div", {
                  className: "flex"
                }, React.createElement(Header$ReasonReactExamples.make, {
                      title: Strings$ReasonReactExamples.researchTitle
                    }), React.createElement("button", {
                      className: "bg-white hover:text-red-600 text-red-400 font-normal underline text-lg ml-4",
                      onClick: (function (param) {
                          return Curry._1(saveProgress, /* () */0);
                        })
                    }, Strings$ReasonReactExamples.saveProgress)), React.createElement("div", {
                  className: "pb-5"
                }, React.createElement("span", {
                      className: "font-medium text-lg text-blue-900"
                    }, slug)), React.createElement("div", {
                  className: "h-64 p-3 border border-solid rounded border-gray-400"
                }, textHTML), React.createElement(Researching$ControlButtons, {
                  onYes: onYes,
                  onNo: onNo,
                  onBack: onBack
                }));
}

var make = Researching;

exports.ControlButtons = ControlButtons;
exports.make = make;
/* react Not a pure module */
