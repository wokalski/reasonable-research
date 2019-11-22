'use strict';

var React = require("react");
var ReactDOMRe = require("reason-react/src/ReactDOMRe.js");
var App$ReasonReactExamples = require("./App.bs.js");

function Index$Header(Props) {
  return React.createElement("header", undefined, React.createElement("h4", undefined, "Reasonable Doctor"));
}

var Header = {
  make: Index$Header
};

ReactDOMRe.renderToElementWithId(React.createElement("div", undefined, React.createElement(Index$Header, { }), React.createElement(App$ReasonReactExamples.make, { })), "index");

exports.Header = Header;
/*  Not a pure module */
