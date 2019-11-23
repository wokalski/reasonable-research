module Logo = {
  [@react.component]
  let make = () =>
    <div>
      <span className="font-mono text-lg text-gray-800 text-center">
        {React.string("Reasonable Doctor")}
      </span>
      <a
        className="bg-white hover:text-red-800 text-red-600 font-normal underline text-md ml-4"
        href="/how-to.html">
        {React.string("How to")}
      </a>
    </div>;
};

ReactDOMRe.renderToElementWithId(
  <div className="container mt-10 mx-auto sm:mx-4 md:mx-6">
    <Logo />
    <App />
  </div>,
  "index",
);
