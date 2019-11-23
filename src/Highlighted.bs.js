'use strict';

var React = require("react");

function Highlighted(Props) {
  var children = Props.children;
  return React.createElement("b", {
              className: "underline text-red-800"
            }, children);
}

var make = Highlighted;

exports.make = make;
/* react Not a pure module */
