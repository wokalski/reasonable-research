'use strict';

var React = require("react");

function Header(Props) {
  var title = Props.title;
  return React.createElement("h1", {
              className: "my-4"
            }, title);
}

var make = Header;

exports.make = make;
/* react Not a pure module */
