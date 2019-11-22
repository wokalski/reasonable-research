'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var CamlinternalOO = require("bs-platform/lib/js/camlinternalOO.js");
var Strings$ReasonReactExamples = require("./Strings.bs.js");

var class_tables = /* Cons */[
  0,
  0,
  0
];

function start(config, database) {
  if (!class_tables[0]) {
    var $$class = CamlinternalOO.create_table(0);
    var env = CamlinternalOO.new_variable($$class, "");
    var env_init = function (env$1) {
      var self = CamlinternalOO.create_object_opt(0, $$class);
      self[env] = env$1;
      return self;
    };
    CamlinternalOO.init_class($$class);
    class_tables[0] = env_init;
  }
  return Curry._1(class_tables[0], 0);
}

function current(param) {
  return {
          slug: "test",
          getTextHTML: (function (param) {
              return React.createElement(React.Fragment, {
                          children: null
                        }, "Blah blah", React.createElement("bold", undefined, "Blah blah"), "Blah blah");
            })
        };
}

var ResearchProgress = {
  start: start,
  current: current
};

function Researching$ControlButtons(Props) {
  return React.createElement("div", undefined);
}

var ControlButtons = {
  make: Researching$ControlButtons
};

function makeState(config, database) {
  return {
          config: config,
          database: database,
          researchProgress: /* () */0
        };
}

function Researching(Props) {
  var state = Props.state;
  var current$1 = current(state.researchProgress);
  return React.createElement("div", undefined, React.createElement("h1", undefined, Strings$ReasonReactExamples.researchTitle), React.createElement("span", undefined, current$1.slug), React.createElement("div", undefined, Curry._1(current$1.getTextHTML, /* () */0)), React.createElement(Researching$ControlButtons, { }));
}

var make = Researching;

exports.ResearchProgress = ResearchProgress;
exports.ControlButtons = ControlButtons;
exports.makeState = makeState;
exports.make = make;
/* react Not a pure module */
