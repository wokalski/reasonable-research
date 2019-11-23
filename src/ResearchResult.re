type t = FileSaver.Blob.t;

[@react.component]
let make = (~researchResult: t) =>
  <div>
    <Header title=Strings.resultTitle />
    <button
      className=RedButton.className
      onClick={_ => {
        FileSaver.saveAs(researchResult, "Result.csv");
        Window.onBeforeUnload(None);
      }}>
      {React.string(Strings.download)}
    </button>
  </div>;
