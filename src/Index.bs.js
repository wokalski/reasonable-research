'use strict';

var React = require("react");
var ReactDOMRe = require("reason-react/src/ReactDOMRe.js");
var App$ReasonReactExamples = require("./App.bs.js");

function Index$Logo(Props) {
  return React.createElement("span", {
              className: "font-mono text-lg text-gray-800 text-center"
            }, "Reasonable Doctor");
}

var Logo = {
  make: Index$Logo
};

ReactDOMRe.renderToElementWithId(React.createElement("div", {
          className: "container mt-10 mx-auto"
        }, React.createElement(Index$Logo, { }), React.createElement(App$ReasonReactExamples.make, { })), "index");

exports.Logo = Logo;
/*  Not a pure module */
