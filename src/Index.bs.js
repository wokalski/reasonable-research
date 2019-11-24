'use strict';

var React = require("react");
var ReactDOMRe = require("reason-react/src/ReactDOMRe.js");
var App$ReasonReactExamples = require("./App.bs.js");

function Index$Logo(Props) {
  return React.createElement("header", undefined, React.createElement("span", {
                  className: "font-mono text-lg text-gray-800 text-center"
                }, "Reasonable Research"), React.createElement("a", {
                  className: "bg-white hover:text-red-800 text-red-600 font-normal underline text-md ml-4",
                  href: "/how-to.html"
                }, "How to"));
}

var Logo = {
  make: Index$Logo
};

function Index$Footer$Link(Props) {
  var href = Props.href;
  var text = Props.text;
  return React.createElement("a", {
              className: "text-gray-800 hover:text-black underline text-md",
              href: href
            }, text);
}

var Link = {
  make: Index$Footer$Link
};

function Index$Footer(Props) {
  return React.createElement("footer", {
              className: "text-gray-800 text-xs font-medium items-end px-2 py-2 mt-4 bg-red-300"
            }, React.createElement("span", undefined, "Made by "), React.createElement(Index$Footer$Link, {
                  href: "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",
                  text: "Marta Konopko"
                }), React.createElement("span", undefined, " & "), React.createElement(Index$Footer$Link, {
                  href: "https://twitter.com/wokalski",
                  text: "Wojtek Czekalski"
                }));
}

var Footer = {
  Link: Link,
  make: Index$Footer
};

ReactDOMRe.renderToElementWithId(React.createElement(React.Fragment, {
          children: null
        }, React.createElement("div", {
              className: "flex-grow container mt-10 mx-auto sm:mx-4 md:mx-6"
            }, React.createElement(Index$Logo, { }), React.createElement("main", undefined, React.createElement(App$ReasonReactExamples.make, { }))), React.createElement(Index$Footer, { })), "index");

exports.Logo = Logo;
exports.Footer = Footer;
/*  Not a pure module */
