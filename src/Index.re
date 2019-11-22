module Header = {
  [@react.component]
  let make = () =>
    <header> <h4> {React.string("Reasonable Doctor")} </h4> </header>;
};

ReactDOMRe.renderToElementWithId(<div> <Header /> <App /> </div>, "index");
