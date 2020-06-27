type importResult = Belt.Result.t(File.t, string);

type state =
  | ImportingDatabase(option(importResult));

type action =
  | ImportedDatabase(importResult);

let reducer = (state, action) => {
  switch (state, action) {
  | (ImportingDatabase(_), ImportedDatabase(database)) =>
    ImportingDatabase(Some(database))
  };
};

[@react.component]
let make = (~loadSaved, ~submit) => {
  let (ImportingDatabase(currentDatabase), dispatch) =
    React.useReducer(reducer, ImportingDatabase(None));
  let (config, setConfig) = React.useState(() => "");
  <div>
    <Header title=Strings.createConfig />
    <textarea
      placeholder={|SOURCE_COLUMN;RESULT_COLUMN;SEARCH_PHRASE;SEARCH_PHRASE_2;SEARCH_PHRASE_3
    SOURCE_COLUMN_2;RESULT_COLUMN;SEARCH_PHRASE;SEARCH_PHRASE2;...|}
      className="font-mono w-5/6 h-32 p-2"
      value=config
      onChange={x => {
        let nextValue = ReactEvent.Form.target(x)##value;
        setConfig(_ => nextValue);
      }}
    />
    {switch (loadSaved, config) {
     | (Some(load), "") =>
       <button
         className={RedButton.className ++ " mt-4"} onClick={_ => load()}>
         {React.string(Strings.loadSaved)}
       </button>
     | _ => React.null
     }}
    <FileImport
      title=Strings.importDatabase
      currentImport=currentDatabase
      onImportedFile={file => dispatch(ImportedDatabase(file))}
    />
    {Belt.Result.(
       switch (config, currentDatabase) {
       | (config, Some(Ok(database))) =>
         <div className="mt-6">
           <LinkButton
             onClick={_ => submit(~config, ~database)}
             title=Strings.next
           />
         </div>
       | _ => React.null
       }
     )}
  </div>;
};
