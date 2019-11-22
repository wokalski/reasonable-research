'use strict';

var React = require("react");
var Strings$ReasonReactExamples = require("./Strings.bs.js");
var FileImport$ReasonReactExamples = require("./FileImport.bs.js");

function ImportingConfig(Props) {
  var opacity = Props.opacity;
  var currentConfig = Props.currentConfig;
  var onImportedFile = Props.onImportedFile;
  return React.createElement(FileImport$ReasonReactExamples.make, {
              title: Strings$ReasonReactExamples.importConfig,
              currentImport: currentConfig,
              opacity: opacity,
              onImportedFile: onImportedFile
            });
}

var make = ImportingConfig;

exports.make = make;
/* react Not a pure module */
