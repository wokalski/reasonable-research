'use strict';

var List = require("bs-platform/lib/js/list.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Papaparse = require("papaparse");
var Strings$ReasonReactExamples = require("./Strings.bs.js");
var ImportFlow$ReasonReactExamples = require("./ImportFlow.bs.js");
var Researching$ReasonReactExamples = require("./Researching.bs.js");
var ResearchResult$ReasonReactExamples = require("./ResearchResult.bs.js");
var ResearchProgress$ReasonReactExamples = require("./ResearchProgress.bs.js");

function reducer(state, action) {
  switch (state.tag | 0) {
    case /* Importing */0 :
        if (typeof action === "number") {
          return state;
        } else {
          switch (action.tag | 0) {
            case /* LoadSucceded */0 :
                return /* Importing */Block.__(0, [action[0]]);
            case /* GoToResearch */1 :
                return /* Researching */Block.__(1, [action[0]]);
            case /* ShowResults */2 :
                return state;
            
          }
        }
    case /* Researching */1 :
        if (typeof action === "number") {
          return state;
        } else {
          switch (action.tag | 0) {
            case /* LoadSucceded */0 :
                return state;
            case /* GoToResearch */1 :
                return /* Researching */Block.__(1, [action[0]]);
            case /* ShowResults */2 :
                var csv = Papaparse.unparse(action[0]);
                return /* Result */Block.__(2, [new Blob(/* array */[csv], {
                                type_: "text/csv"
                              })]);
            
          }
        }
    case /* Result */2 :
        return state;
    
  }
}

function App(Props) {
  var match = React.useReducer(reducer, /* Importing */Block.__(0, [undefined]));
  var dispatch = match[1];
  var state = match[0];
  React.useEffect((function () {
          if (Caml_obj.caml_equal(state, /* Importing */Block.__(0, [undefined]))) {
            var match = ResearchProgress$ReasonReactExamples.load(/* () */0);
            if (match !== undefined) {
              var match$1 = match;
              var match$2 = match$1.currentSearch;
              if (match$2 !== undefined) {
                Curry._1(dispatch, /* LoadSucceded */Block.__(0, [match$2]));
              } else {
                Curry._1(dispatch, /* ShowResults */Block.__(2, [match$1.result]));
              }
            } else {
              Curry._1(dispatch, /* LoadFailed */0);
            }
          }
          return ;
        }), /* array */[state]);
  var handleNewState = function (state) {
    var match = state.currentSearch;
    if (match !== undefined) {
      return Curry._1(dispatch, /* GoToResearch */Block.__(1, [match]));
    } else {
      return Curry._1(dispatch, /* ShowResults */Block.__(2, [state.result]));
    }
  };
  switch (state.tag | 0) {
    case /* Importing */0 :
        var saved = state[0];
        var tmp;
        if (saved !== undefined) {
          var search = saved;
          tmp = (function (param) {
              return Curry._1(dispatch, /* GoToResearch */Block.__(1, [search]));
            });
        } else {
          tmp = undefined;
        }
        return React.createElement(ImportFlow$ReasonReactExamples.make, {
                    loadSaved: tmp,
                    submit: (function (config, database) {
                        ResearchProgress$ReasonReactExamples.make(config, database).then((function (result) {
                                var tmp;
                                if (result.tag) {
                                  alert(result[0]);
                                  tmp = /* () */0;
                                } else {
                                  var match = result[0].currentSearch;
                                  if (match !== undefined) {
                                    tmp = Curry._1(dispatch, /* GoToResearch */Block.__(1, [match]));
                                  } else {
                                    alert(Strings$ReasonReactExamples.noMatches);
                                    tmp = /* () */0;
                                  }
                                }
                                return Promise.resolve(tmp);
                              }));
                        return /* () */0;
                      })
                  });
    case /* Researching */1 :
        var match$1 = state[0];
        var back = match$1.back;
        var submit = match$1.submit;
        var tmp$1;
        if (back !== undefined) {
          var handler = back;
          tmp$1 = (function (param) {
              return handleNewState(Curry._1(handler, /* () */0));
            });
        } else {
          tmp$1 = undefined;
        }
        return React.createElement(Researching$ReasonReactExamples.make, {
                    resultColumn: match$1.resultColumn,
                    items: List.map((function (param) {
                            return {
                                    slug: param.slug,
                                    textHTML: Curry._1(param.getTextHTML, /* () */0)
                                  };
                          }), match$1.items),
                    onYes: (function (param) {
                        return handleNewState(Curry._1(submit, /* Yes */0));
                      }),
                    onNo: (function (param) {
                        return handleNewState(Curry._1(submit, /* No */1));
                      }),
                    onSkip: (function (param) {
                        return handleNewState(Curry._1(submit, /* Idontknow */2));
                      }),
                    onBack: tmp$1,
                    saveProgress: match$1.saveProgress,
                    currentValue: match$1.currentValue,
                    row: match$1.row
                  });
    case /* Result */2 :
        return React.createElement(ResearchResult$ReasonReactExamples.make, {
                    researchResult: state[0]
                  });
    
  }
}

var make = App;

exports.reducer = reducer;
exports.make = make;
/* react Not a pure module */
