'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Strings$ReasonReactExamples = require("./Strings.bs.js");

function FileImport(Props) {
  var title = Props.title;
  var currentImport = Props.currentImport;
  var opacity = Props.opacity;
  var onImportedFile = Props.onImportedFile;
  var tmp;
  if (currentImport !== undefined) {
    var match = currentImport;
    tmp = match.tag ? React.createElement("span", undefined, match[0]) : React.createElement("span", undefined, match[0].name);
  } else {
    tmp = null;
  }
  return React.createElement("div", {
              style: {
                opacity: opacity.toString()
              }
            }, React.createElement("h1", undefined, title), React.createElement("form", undefined, React.createElement("input", {
                      accept: ".csv",
                      type: "file",
                      onChange: (function (formEvent) {
                          var $$event = formEvent.currentTarget;
                          var files = $$event.files;
                          if (files.length === 1) {
                            return Curry._1(onImportedFile, /* Ok */Block.__(0, [Caml_array.caml_array_get(files, 0)]));
                          } else {
                            return Curry._1(onImportedFile, /* Error */Block.__(1, [Strings$ReasonReactExamples.$$Error.pleaseSelectOneFile]));
                          }
                        })
                    })), tmp);
}

var make = FileImport;

exports.make = make;
/* react Not a pure module */
