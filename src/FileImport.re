type action =
  | DragLeave
  | DragEnter;

[@react.component]
let make = (~title, ~currentImport, ~onImportedFile) => {
  let preventDefault = evt => ReactEvent.Mouse.preventDefault(evt);
  let importFiles = files =>
    if (Js.Array.length(files) === 1) {
      onImportedFile(Belt.Result.Ok(files[0]));
    } else {
      onImportedFile(Belt.Result.Error(Strings.Error.pleaseSelectOneFile));
    };
  let (isDroppingAFile, dispatch) =
    React.useReducer(
      (_, action) =>
        switch (action) {
        | DragLeave => false
        | DragEnter => true
        },
      false,
    );
  <div>
    <Header title />
    <div
      onDragOver=preventDefault
      onDragLeave={event => {
        dispatch(DragLeave);
        preventDefault(event);
      }}
      onDragEnter={event => {
        dispatch(DragEnter);
        preventDefault(event);
      }}
      onDrop={event => {
        let e = ReactEvent.Mouse.nativeEvent(event);
        let files = e##dataTransfer##files;
        importFiles(files);
        dispatch(DragLeave);
        ReactEvent.Mouse.preventDefault(event);
      }}
      className="mt-6 flex items-center">
      <label className=RedButton.className>
        {if (!isDroppingAFile) {
           (
             switch (currentImport) {
             | Some(Belt.Result.Ok(_)) => Strings.changeFile
             | _ => Strings.selectFile
             }
           )
           |> React.string;
         } else {
           React.string(Strings.dropFile);
         }}
        <input
          hidden=true
          type_="file"
          accept=".csv"
          onChange={formEvent => {
            let event = ReactEvent.Form.currentTarget(formEvent);
            let files = event##files;
            importFiles(files);
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
