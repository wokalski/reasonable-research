'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Papaparse = require("papaparse");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Strings$ReasonReactExamples = require("./Strings.bs.js");

var error = /* Error */Block.__(1, [Strings$ReasonReactExamples.cantParseCSVFile]);

function parse(file) {
  return new Promise((function (resolve, param) {
                Papaparse.parse(file, {
                      header: false,
                      complete: Caml_option.some((function (param) {
                              var data = param.data;
                              if (data.length > 0 && Array.isArray(Caml_array.caml_array_get(data, 0))) {
                                console.log(data);
                                return resolve(/* Ok */Block.__(0, [data]));
                              } else {
                                return resolve(error);
                              }
                            })),
                      error: Caml_option.some((function () {
                              return resolve(error);
                            }))
                    });
                return /* () */0;
              }));
}

function parseWithHeader(file) {
  return new Promise((function (resolve, param) {
                Papaparse.parse(file, {
                      header: true,
                      complete: Caml_option.some((function (param) {
                              var data = param.data;
                              if (data.length > 0 && !Array.isArray(Caml_array.caml_array_get(data, 0))) {
                                console.log(data);
                                return resolve(/* Ok */Block.__(0, [data]));
                              } else {
                                return resolve(error);
                              }
                            })),
                      error: Caml_option.some((function () {
                              return resolve(error);
                            }))
                    });
                return /* () */0;
              }));
}

function parse$1(string) {
  return Papaparse.parse(string, {
              header: true,
              complete: undefined,
              error: undefined
            }).data;
}

function parseWithoutHeader(string) {
  return Papaparse.parse(string, {
              header: false,
              complete: undefined,
              error: undefined
            }).data;
}

var $$String = {
  parse: parse$1,
  parseWithoutHeader: parseWithoutHeader
};

exports.error = error;
exports.parse = parse;
exports.parseWithHeader = parseWithHeader;
exports.$$String = $$String;
/* papaparse Not a pure module */
