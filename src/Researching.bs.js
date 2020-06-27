'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Header$ReasonReactExamples = require("./Header.bs.js");
var Strings$ReasonReactExamples = require("./Strings.bs.js");
var LinkButton$ReasonReactExamples = require("./LinkButton.bs.js");

function Researching$ControlButtons(Props) {
  var title = Props.title;
  var onYes = Props.onYes;
  var onSkip = Props.onSkip;
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
                  className: "flex flex-row mt-6 "
                }, React.createElement("div", {
                      className: "text-md flex flex-col justify-center font-semibold text-grey-800"
                    }, Strings$ReasonReactExamples.resultColumn + (": " + title)), React.createElement("div", {
                      className: "w-6"
                    }), React.createElement(LinkButton$ReasonReactExamples.make, {
                      title: Strings$ReasonReactExamples.skip,
                      onClick: (function (param) {
                          return Curry._1(onSkip, /* () */0);
                        })
                    }), React.createElement("div", {
                      className: "w-6"
                    }), React.createElement(LinkButton$ReasonReactExamples.make, {
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

function Researching$ValueTable(Props) {
  var values = Props.values;
  return React.createElement("div", {
              className: "p-t-2"
            }, React.createElement("div", {
                  className: "w-full border-solid border border-gray-300"
                }, Js_dict.entries(values).map((function (param) {
                        var key = param[0];
                        return React.createElement("div", {
                                    key: key,
                                    className: "flex align-center border-solid border-b border-gray-300"
                                  }, React.createElement("div", {
                                        className: "bg-gray-100 p-1 w-64 overflow-hidden"
                                      }, React.createElement("span", {
                                            className: "bold"
                                          }, key)), React.createElement("div", {
                                        className: "w-3/6 p-1"
                                      }, param[1]));
                      }))));
}

var ValueTable = {
  make: Researching$ValueTable
};

function Researching(Props) {
  var resultColumn = Props.resultColumn;
  var items = Props.items;
  var onYes = Props.onYes;
  var onNo = Props.onNo;
  var onSkip = Props.onSkip;
  var onBack = Props.onBack;
  var saveProgress = Props.saveProgress;
  var currentValue = Props.currentValue;
  var row = Props.row;
  return React.createElement("div", {
              className: "flex flex-col"
            }, React.createElement("div", {
                  className: "flex"
                }, React.createElement(Header$ReasonReactExamples.make, {
                      title: Strings$ReasonReactExamples.researchTitle
                    }), React.createElement("button", {
                      className: "flex flex-col bg-white hover:text-red-600 text-red-400 font-normal underline text-lg ml-4 justify-center",
                      onClick: (function (param) {
                          return Curry._1(saveProgress, /* () */0);
                        })
                    }, React.createElement("span", undefined, Strings$ReasonReactExamples.saveProgress))), $$Array.of_list(List.map((function (param) {
                        var slug = param.slug;
                        return React.createElement(React.Fragment, {
                                    children: null,
                                    key: slug
                                  }, React.createElement("div", {
                                        className: "pt-8 pb-5"
                                      }, React.createElement("span", {
                                            className: "font-medium text-lg text-blue-900"
                                          }, slug)), React.createElement("div", {
                                        className: "h-64 p-3 border border-solid rounded border-gray-400 overflow-scroll"
                                      }, param.textHTML));
                      }), items)), React.createElement("div", {
                  className: "flex justify-end"
                }, React.createElement("span", undefined, Strings$ReasonReactExamples.currentValue + ": ", currentValue !== undefined ? currentValue : React.createElement("span", {
                            className: "italic"
                          }, Strings$ReasonReactExamples.none))), React.createElement(Researching$ControlButtons, {
                  title: resultColumn,
                  onYes: onYes,
                  onSkip: onSkip,
                  onNo: onNo,
                  onBack: onBack
                }), React.createElement(Header$ReasonReactExamples.make, {
                  title: Strings$ReasonReactExamples.otherValuesInRow
                }), React.createElement(Researching$ValueTable, {
                  values: row
                }));
}

var make = Researching;

exports.ControlButtons = ControlButtons;
exports.ValueTable = ValueTable;
exports.make = make;
/* react Not a pure module */
