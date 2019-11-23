'use strict';

var React = require("react");

function LinkButton(Props) {
  var title = Props.title;
  var onClick = Props.onClick;
  return React.createElement("button", {
              className: "bg-white hover:text-blue-600 text-blue-400 font-normal underline text-2xl mt-6",
              onClick: onClick
            }, title);
}

var make = LinkButton;

exports.make = make;
/* react Not a pure module */
