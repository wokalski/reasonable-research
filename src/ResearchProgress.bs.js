'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Papaparse = require("papaparse");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Belt_Result = require("bs-platform/lib/js/belt_Result.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Papa$ReasonReactExamples = require("./Papa.bs.js");
var Window$ReasonReactExamples = require("./Window.bs.js");
var Strings$ReasonReactExamples = require("./Strings.bs.js");
var Highlighted$ReasonReactExamples = require("./Highlighted.bs.js");

var partial_arg = localStorage;

function saveConfig(param) {
  partial_arg.setItem("config", param);
  return /* () */0;
}

var partial_arg$1 = localStorage;

function saveDb(param) {
  partial_arg$1.setItem("db", param);
  return /* () */0;
}

function generateOperations(key) {
  return /* tuple */[
          (function (index) {
              localStorage.setItem(key, index.toString());
              return /* () */0;
            }),
          (function (param) {
              localStorage.removeItem(key);
              return /* () */0;
            }),
          (function (param) {
              return Belt_Option.map(Caml_option.null_to_opt(localStorage.getItem(key)), (function (num) {
                            return Number(num) | 0;
                          }));
            })
        ];
}

var match = generateOperations("rowIndex");

var getRowIndex = match[2];

var removeRowIndex = match[1];

var saveRowIndex = match[0];

var match$1 = generateOperations("queryIndex");

var getQueryIndex = match$1[2];

var removeQueryIndex = match$1[1];

var saveQueryIndex = match$1[0];

function getInitialQueryState(rowIndex, queryIndex, database, queries) {
  var dbLength = database.length;
  var queriesLength = queries.length;
  if (dbLength > 0 && queriesLength > 0) {
    var match = queryIndex < queriesLength;
    var queryIndex$1 = match ? queryIndex : 0;
    var match$1 = rowIndex < dbLength;
    var rowIndex$1 = match$1 ? rowIndex : 0;
    return {
            queryIndex: queryIndex$1,
            queries: queries,
            rowIndex: rowIndex$1
          };
  }
  
}

function getNextQueryState(database, queryState) {
  if (database.length !== 0) {
    if (database.length > (queryState.rowIndex + 1 | 0)) {
      return {
              queryIndex: queryState.queryIndex,
              queries: queryState.queries,
              rowIndex: queryState.rowIndex + 1 | 0
            };
    } else if ((queryState.queryIndex + 1 | 0) === queryState.queries.length) {
      return ;
    } else {
      return {
              queryIndex: queryState.queryIndex + 1 | 0,
              queries: queryState.queries,
              rowIndex: 0
            };
    }
  }
  
}

function normalize(str) {
  return str.normalize("NFD").replace(new RegExp("[\\u0300-\\u036f]", "g"), "").toLowerCase();
}

function findKeyphrase(query, string) {
  var normalizedQuery = normalize(query);
  var normalizedString = normalize(string);
  var length = normalizedQuery.length;
  var findFromIndex = function (_index, _acc) {
    while(true) {
      var acc = _acc;
      var index = _index;
      var nextIndex = normalizedString.indexOf(normalizedQuery, index);
      if (nextIndex === -1) {
        return acc;
      } else {
        _acc = /* :: */[
          {
            from: nextIndex,
            to_: (nextIndex + length | 0) + 1 | 0
          },
          acc
        ];
        _index = nextIndex + length | 0;
        continue ;
      }
    };
  };
  return List.rev(findFromIndex(0, /* [] */0));
}

function getQuery(param) {
  return Caml_array.caml_array_get(param.queries, param.queryIndex);
}

function generate(config, previous, database, queryState) {
  var query = getQuery(queryState);
  var row = Caml_array.caml_array_get(database, queryState.rowIndex);
  var text = Js_dict.get(row, query.column);
  var nextSearch = function (previous) {
    var match = getNextQueryState(database, queryState);
    if (match !== undefined) {
      return generate(config, previous, database, match);
    } else {
      return {
              currentSearch: undefined,
              result: database
            };
    }
  };
  if (text !== undefined) {
    var text$1 = text;
    var matches = findKeyphrase(query.keyphrase, text$1);
    if (matches) {
      var $$this = [];
      var tmp;
      if (previous !== undefined) {
        var previous$1 = previous;
        tmp = (function (param) {
            return previous$1;
          });
      } else {
        tmp = undefined;
      }
      Caml_obj.caml_update_dummy($$this, {
            currentSearch: {
              saveProgress: (function (param) {
                  Curry._1(saveDb, Papaparse.unparse(database));
                  Curry._1(saveConfig, Papaparse.unparse(config));
                  Curry._1(saveQueryIndex, queryState.queryIndex);
                  Curry._1(saveRowIndex, queryState.rowIndex);
                  return Window$ReasonReactExamples.onBeforeUnload(undefined);
                }),
              slug: query.column + (" - " + query.keyphrase),
              getTextHTML: (function (param) {
                  var text$2 = text$1;
                  var locations = matches;
                  var match = List.fold_left((function (param, $$location) {
                          var nonHighlighted = text$2.substring(param[0], $$location.from);
                          var highlighted = text$2.substring($$location.from, $$location.to_);
                          return /* tuple */[
                                  $$location.to_,
                                  /* :: */[
                                    React.createElement(Highlighted$ReasonReactExamples.make, {
                                          children: highlighted
                                        }),
                                    /* :: */[
                                      nonHighlighted,
                                      param[1]
                                    ]
                                  ]
                                ];
                        }), /* tuple */[
                        0,
                        /* [] */0
                      ], locations);
                  var acc = match[1];
                  var prevMatchLocation = match[0];
                  return $$Array.of_list(List.rev(prevMatchLocation < (text$2.length - 1 | 0) ? /* :: */[
                                    text$2.substr(prevMatchLocation),
                                    acc
                                  ] : acc));
                }),
              submit: (function (result) {
                  Window$ReasonReactExamples.onBeforeUnload((function (evt) {
                          evt.returnValue = "WARNING, UNSAVED";
                          return /* () */0;
                        }));
                  row[query.resultColumn] = result ? "1" : "0";
                  return nextSearch($$this);
                }),
              back: tmp
            },
            result: database
          });
      return $$this;
    } else {
      return nextSearch(previous);
    }
  } else {
    return nextSearch(previous);
  }
}

function createSearchState($staropt$star, $staropt$star$1, config, database, param) {
  var rowIndex = $staropt$star !== undefined ? $staropt$star : 0;
  var queryIndex = $staropt$star$1 !== undefined ? $staropt$star$1 : 0;
  var result = config.reduce((function (acc, row) {
          if (acc.tag) {
            return /* Error */Block.__(1, [Strings$ReasonReactExamples.invalidConfigFormat]);
          } else {
            var switcher = row.length - 1 | 0;
            if (switcher > 2 || switcher < 0) {
              return /* Error */Block.__(1, [Strings$ReasonReactExamples.invalidConfigFormat]);
            } else {
              var queries = acc[0];
              switch (switcher) {
                case 0 :
                    var match = row[0];
                    if (match === "") {
                      return /* Ok */Block.__(0, [queries]);
                    } else {
                      return /* Error */Block.__(1, [Strings$ReasonReactExamples.invalidConfigFormat]);
                    }
                case 1 :
                    return /* Error */Block.__(1, [Strings$ReasonReactExamples.invalidConfigFormat]);
                case 2 :
                    var column = row[0];
                    var keyphrase = row[1];
                    var resultColumn = row[2];
                    queries.push({
                          column: column,
                          keyphrase: keyphrase,
                          resultColumn: resultColumn
                        });
                    return /* Ok */Block.__(0, [queries]);
                
              }
            }
          }
        }), /* Ok */Block.__(0, [/* array */[]]));
  return Belt_Result.flatMapU(result, (function (queries) {
                var match = getInitialQueryState(rowIndex, queryIndex, database, queries);
                if (match !== undefined) {
                  return /* Ok */Block.__(0, [generate(config, undefined, database, match)]);
                } else {
                  return /* Error */Block.__(1, [Strings$ReasonReactExamples.noMatches]);
                }
              }));
}

function make(config, database) {
  return Promise.all(/* tuple */[
                Papa$ReasonReactExamples.parse(config),
                Papa$ReasonReactExamples.parseWithHeader(database)
              ]).then((function (param) {
                var match = param[0];
                if (match.tag) {
                  return Promise.resolve(/* Error */Block.__(1, [Strings$ReasonReactExamples.couldntLoadConfig]));
                } else {
                  var match$1 = param[1];
                  if (match$1.tag) {
                    return Promise.resolve(/* Error */Block.__(1, [Strings$ReasonReactExamples.couldntLoadDatabase]));
                  } else {
                    return Promise.resolve(createSearchState(undefined, undefined, match[0], match$1[0], /* () */0));
                  }
                }
              }));
}

function load(param) {
  var onError = function (param) {
    localStorage.removeItem("config");
    localStorage.removeItem("db");
    Curry._1(removeQueryIndex, /* () */0);
    Curry._1(removeRowIndex, /* () */0);
    return ;
  };
  var match = localStorage.getItem("config");
  var match$1 = localStorage.getItem("db");
  var match$2 = Curry._1(getRowIndex, /* () */0);
  var match$3 = Curry._1(getQueryIndex, /* () */0);
  if (match !== null && match$1 !== null && match$2 !== undefined && match$3 !== undefined) {
    var config = Papa$ReasonReactExamples.$$String.parseWithoutHeader(match);
    var database = Papa$ReasonReactExamples.$$String.parse(match$1);
    var match$4 = createSearchState(match$2, match$3, config, database, /* () */0);
    if (match$4.tag) {
      return onError(/* () */0);
    } else {
      return match$4[0];
    }
  } else {
    return onError(/* () */0);
  }
}

exports.make = make;
exports.load = load;
/* partial_arg Not a pure module */
