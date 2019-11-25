'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Header$ReasonReactExamples = require("./Header.bs.js");
var Strings$ReasonReactExamples = require("./Strings.bs.js");
var RedButton$ReasonReactExamples = require("./RedButton.bs.js");

function FileImport(Props) {
  var title = Props.title;
  var currentImport = Props.currentImport;
  var onImportedFile = Props.onImportedFile;
  var preventDefault = function (evt) {
    evt.preventDefault();
    return /* () */0;
  };
  var importFiles = function (files) {
    if (files.length === 1) {
      return Curry._1(onImportedFile, /* Ok */Block.__(0, [Caml_array.caml_array_get(files, 0)]));
    } else {
      return Curry._1(onImportedFile, /* Error */Block.__(1, [Strings$ReasonReactExamples.$$Error.pleaseSelectOneFile]));
    }
  };
  var match = React.useReducer((function (param, action) {
          if (action) {
            return true;
          } else {
            return false;
          }
        }), false);
  var dispatch = match[1];
  var tmp;
  tmp = match[0] ? Strings$ReasonReactExamples.dropFile : (
      currentImport !== undefined && !currentImport.tag ? Strings$ReasonReactExamples.changeFile : Strings$ReasonReactExamples.selectFile
    );
  var tmp$1;
  if (currentImport !== undefined) {
    var match$1 = currentImport;
    tmp$1 = match$1.tag ? React.createElement("span", undefined, match$1[0]) : React.createElement("span", undefined, Strings$ReasonReactExamples.selectedFile + (" " + match$1[0].name));
  } else {
    tmp$1 = null;
  }
  return React.createElement("div", undefined, React.createElement(Header$ReasonReactExamples.make, {
                  title: title
                }), React.createElement("div", {
                  className: "mt-6 flex items-center",
                  onDragEnter: (function ($$event) {
                      Curry._1(dispatch, /* DragEnter */1);
                      $$event.preventDefault();
                      return /* () */0;
                    }),
                  onDragLeave: (function ($$event) {
                      Curry._1(dispatch, /* DragLeave */0);
                      $$event.preventDefault();
                      return /* () */0;
                    }),
                  onDragOver: preventDefault,
                  onDrop: (function ($$event) {
                      var e = $$event.nativeEvent;
                      var files = e.dataTransfer.files;
                      importFiles(files);
                      Curry._1(dispatch, /* DragLeave */0);
                      $$event.preventDefault();
                      return /* () */0;
                    })
                }, React.createElement("label", {
                      className: RedButton$ReasonReactExamples.className
                    }, tmp, React.createElement("input", {
                          hidden: true,
                          accept: ".csv",
                          type: "file",
                          onChange: (function (formEvent) {
                              var $$event = formEvent.currentTarget;
                              return importFiles($$event.files);
                            })
                        })), React.createElement("span", {
                      className: "pl-4"
                    }, tmp$1)));
}

var make = FileImport;

exports.make = make;
/* react Not a pure module */
