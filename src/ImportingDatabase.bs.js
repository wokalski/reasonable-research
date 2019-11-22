'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Strings$ReasonReactExamples = require("./Strings.bs.js");
var FileImport$ReasonReactExamples = require("./FileImport.bs.js");
var ImportingConfig$ReasonReactExamples = require("./ImportingConfig.bs.js");

function ImportingDatabase(Props) {
  var config = Props.config;
  var currentDatabase = Props.currentDatabase;
  var onImportedConfig = Props.onImportedConfig;
  var onImportedDatabase = Props.onImportedDatabase;
  var submit = Props.submit;
  var tmp;
  tmp = config.tag || !(currentDatabase !== undefined && !currentDatabase.tag) ? null : React.createElement("button", {
          onClick: (function (param) {
              return Curry._1(submit, /* () */0);
            })
        });
  return React.createElement(React.Fragment, {
              children: null
            }, React.createElement(ImportingConfig$ReasonReactExamples.make, {
                  opacity: 0.4,
                  currentConfig: config,
                  onImportedFile: onImportedConfig
                }), React.createElement(FileImport$ReasonReactExamples.make, {
                  title: Strings$ReasonReactExamples.importDatabase,
                  currentImport: currentDatabase,
                  opacity: 1,
                  onImportedFile: onImportedDatabase
                }), tmp);
}

var make = ImportingDatabase;

exports.make = make;
/* react Not a pure module */
