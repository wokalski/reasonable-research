[@react.component]
let make = (~title, ~currentImport, ~opacity: float, ~onImportedFile) => {
  <div
    style={ReactDOMRe.Style.make(~opacity=Js.Float.toString(opacity), ())}>
    <h1> {React.string(title)} </h1>
    <form>
      <input
        type_="file"
        accept=".csv"
        onChange={formEvent => {
          let event = ReactEvent.Form.currentTarget(formEvent);
          let files = event##files;
          if (Js.Array.length(files) === 1) {
            onImportedFile(Belt.Result.Ok(files[0]));
          } else {
            onImportedFile(
              Belt.Result.Error(Strings.Error.pleaseSelectOneFile),
            );
          };
        }}
      />
    </form>
    {switch (currentImport) {
     | None => React.null
     | Some(Ok(file)) => <span> {React.string(File.name(file))} </span>
     | Some(Error(e)) => <span> {React.string(e)} </span>
     }}
  </div>;
};
