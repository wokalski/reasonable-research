[@react.component]
let make = (~title, ~currentImport, ~onImportedFile) => {
  <div>
    <Header title />
    <div className="mt-6 flex items-center">
      <label
        className=RedButton.className>
        {(
           switch (currentImport) {
           | Some(Belt.Result.Ok(_)) => Strings.changeFile
           | _ => Strings.selectFile
           }
         )
         |> React.string}
        <input
          hidden=true
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
      </label>
      <span className="pl-4">
        {switch (currentImport) {
         | None => React.null
         | Some(Ok(file)) =>
           <span>
             {React.string(Strings.selectedFile ++ " " ++ File.name(file))}
           </span>
         | Some(Error(e)) => <span> {React.string(e)} </span>
         }}
      </span>
    </div>
  </div>;
};
