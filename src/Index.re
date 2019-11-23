module Logo = {
  [@react.component]
  let make = () =>
    <span className="font-mono text-lg text-gray-800 text-center">
      {React.string("Reasonable Doctor")}
    </span>;
};

ReactDOMRe.renderToElementWithId(
  <div className="container mt-10 mx-auto sm:mx-4 md:mx-6">
    <Logo />
    <App />
  </div>,
  "index",
);
