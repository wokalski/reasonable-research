module Logo = {
  [@react.component]
  let make = () =>
    <header>
      <span className="font-mono text-lg text-gray-800 text-center">
        {React.string("Reasonable Research")}
      </span>
      <a
        className="bg-white hover:text-red-800 text-red-600 font-normal underline text-md ml-4"
        href="/how-to.html">
        {React.string("How to")}
      </a>
    </header>;
};

module Footer = {
  module Link = {
    [@react.component]
    let make = (~href, ~text) =>
      <a className="text-gray-800 hover:text-black underline text-md" href>
        {React.string(text)}
      </a>;
  };
  [@react.component]
  let make = () =>
    <footer
      className="text-gray-800 text-xs font-medium items-end px-2 py-2 bg-red-300">
      <span> {React.string("Made by ")} </span>
      <Link
        href="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif"
        text="Marta Konopko"
      />
      <span> {React.string(" & ")} </span>
      <Link href="https://twitter.com/wokalski" text="Wojtek Czekalski" />
    </footer>;
};

ReactDOMRe.renderToElementWithId(
  <React.Fragment>
    <div className="flex-grow container mt-10 mx-auto sm:mx-4 md:mx-6">
      <Logo />
      <main> <App /> </main>
    </div>
    <Footer />
  </React.Fragment>,
  "index",
);
