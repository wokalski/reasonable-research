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
var Caml_primitive = require("bs-platform/lib/js/caml_primitive.js");
var Belt_HashMapInt = require("bs-platform/lib/js/belt_HashMapInt.js");
var Belt_HashMapString = require("bs-platform/lib/js/belt_HashMapString.js");
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

function getInitialQueryState(rowIndex, queryIndex, database, queryGroups) {
  var dbLength = database.length;
  var queriesLength = queryGroups.length;
  if (dbLength > 0 && queriesLength > 0) {
    var match = queryIndex < queriesLength;
    var queryIndex$1 = match ? queryIndex : 0;
    var match$1 = rowIndex < dbLength;
    var rowIndex$1 = match$1 ? rowIndex : 0;
    return {
            queryIndex: queryIndex$1,
            queryGroups: queryGroups,
            rowIndex: rowIndex$1
          };
  }
  
}

function getNextQueryState(database, queryState) {
  if (database.length > 0) {
    if (database.length > (queryState.rowIndex + 1 | 0)) {
      return {
              queryIndex: queryState.queryIndex,
              queryGroups: queryState.queryGroups,
              rowIndex: queryState.rowIndex + 1 | 0
            };
    } else if ((queryState.queryIndex + 1 | 0) === queryState.queryGroups.length) {
      return ;
    } else {
      return {
              queryIndex: queryState.queryIndex + 1 | 0,
              queryGroups: queryState.queryGroups,
              rowIndex: 0
            };
    }
  }
  
}

function normalize(str) {
  return str.normalize("NFD").replace(new RegExp("[\\u0300-\\u036f]", "g"), "").toLowerCase();
}

function removeDuplicateLocations(l) {
  var map = Belt_HashMapInt.make(List.length(l));
  List.iter((function ($$location) {
          var key = $$location.from;
          var match = Belt_HashMapInt.get(map, key);
          if (match !== undefined && match.to_ >= $$location.to_) {
            return /* () */0;
          } else {
            return Belt_HashMapInt.set(map, key, $$location);
          }
        }), l);
  var locations = Belt_HashMapInt.valuesToArray(map);
  $$Array.sort((function (l1, l2) {
          return Caml_primitive.caml_int_compare(l1.from, l2.from);
        }), locations);
  return locations;
}

function findKeyphrases(queries, string) {
  return $$Array.to_list(removeDuplicateLocations(List.flatten(queries.map((function (query) {
                              var query$1 = query;
                              var string$1 = string;
                              var normalizedQuery = normalize(query$1);
                              var normalizedString = normalize(string$1);
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
                            })).reduce((function (acc, locations) {
                            return /* :: */[
                                    locations,
                                    acc
                                  ];
                          }), /* [] */0))));
}

function getQuery(param) {
  return Caml_array.caml_array_get(param.queryGroups, param.queryIndex);
}

function generate(config, previous, database, queryState) {
  var match = getQuery(queryState);
  var resultColumn = match.resultColumn;
  var row = Caml_array.caml_array_get(database, queryState.rowIndex);
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
  var results = match.queries.reduce((function (acc, param) {
          var keyphrases = param.keyphrases;
          var column = param.column;
          var text = Js_dict.get(row, column);
          if (text !== undefined) {
            var text$1 = text;
            var matches = findKeyphrases(keyphrases, text$1);
            if (matches) {
              return /* :: */[
                      {
                        slug: column + (" - " + keyphrases.join(" | ")),
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
                          })
                      },
                      acc
                    ];
            } else {
              return acc;
            }
          } else {
            return acc;
          }
        }), /* [] */0);
  if (results) {
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
            resultColumn: resultColumn,
            items: results,
            saveProgress: (function (param) {
                Curry._1(saveDb, Papaparse.unparse(database));
                Curry._1(saveConfig, Papaparse.unparse(config));
                Curry._1(saveQueryIndex, queryState.queryIndex);
                Curry._1(saveRowIndex, queryState.rowIndex);
                return Window$ReasonReactExamples.onBeforeUnload(undefined);
              }),
            submit: (function (result) {
                Window$ReasonReactExamples.onBeforeUnload((function (evt) {
                        evt.returnValue = "WARNING, UNSAVED";
                        return /* () */0;
                      }));
                row[resultColumn] = result ? "1" : "0";
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
}

function createSearchState($staropt$star, $staropt$star$1, config, database, param) {
  var rowIndex = $staropt$star !== undefined ? $staropt$star : 0;
  var queryIndex = $staropt$star$1 !== undefined ? $staropt$star$1 : 0;
  var result = config.reduce((function (acc, row) {
          if (acc.tag) {
            return /* Error */Block.__(1, [Strings$ReasonReactExamples.invalidConfigFormat]);
          } else {
            var queryGroups = acc[0];
            if (row.length >= 3) {
              var resultColumn = Caml_array.caml_array_get(row, 1);
              var column = Caml_array.caml_array_get(row, 0);
              var keyphrases = row.slice(2);
              var match = Belt_HashMapString.get(queryGroups, resultColumn);
              if (match !== undefined) {
                match.queries.push({
                      column: column,
                      keyphrases: keyphrases
                    });
              } else {
                Belt_HashMapString.set(queryGroups, resultColumn, {
                      queries: /* array */[{
                          column: column,
                          keyphrases: keyphrases
                        }],
                      resultColumn: resultColumn
                    });
              }
              return /* Ok */Block.__(0, [queryGroups]);
            } else if (row.length !== 1) {
              return /* Error */Block.__(1, [Strings$ReasonReactExamples.invalidConfigFormat]);
            } else {
              var match$1 = row[0];
              if (match$1 === "") {
                return /* Ok */Block.__(0, [queryGroups]);
              } else {
                return /* Error */Block.__(1, [Strings$ReasonReactExamples.invalidConfigFormat]);
              }
            }
          }
        }), /* Ok */Block.__(0, [Belt_HashMapString.make(config.length)]));
  return Belt_Result.flatMapU(result, (function (queryGroups) {
                var match = getInitialQueryState(rowIndex, queryIndex, database, Belt_HashMapString.valuesToArray(queryGroups));
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
