'use strict';

var React = require("react");
var ReactDOMRe = require("reason-react/src/ReactDOMRe.js");
var App$ReasonReactExamples = require("./App.bs.js");

function Index$Logo(Props) {
  return React.createElement("div", undefined, React.createElement("span", {
                  className: "font-mono text-lg text-gray-800 text-center"
                }, "Reasonable Research"), React.createElement("a", {
                  className: "bg-white hover:text-red-800 text-red-600 font-normal underline text-md ml-4",
                  href: "/how-to.html"
                }, "How to"));
}

var Logo = {
  make: Index$Logo
};

ReactDOMRe.renderToElementWithId(React.createElement("div", {
          className: "container mt-10 mx-auto sm:mx-4 md:mx-6"
        }, React.createElement(Index$Logo, { }), React.createElement(App$ReasonReactExamples.make, { })), "index");

exports.Logo = Logo;
/*  Not a pure module */
