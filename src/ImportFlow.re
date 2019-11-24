type importResult = Belt.Result.t(File.t, string);

type state =
  | ImportingConfig(option(importResult))
  | ImportingDatabase(importResult, option(importResult));

type action =
  | ImportedConfig(importResult)
  | ImportedDatabase(importResult);

let reducer = (state, action) => {
  switch (state, action) {
  | (ImportingConfig(_), ImportedConfig(Ok(file))) =>
    ImportingDatabase(Ok(file), None)
  | (ImportingConfig(_), ImportedConfig(result)) =>
    ImportingConfig(Some(result))
  | (ImportingDatabase(_, database), ImportedConfig(result)) =>
    ImportingDatabase(result, database)
  | (ImportingDatabase(config, _), ImportedDatabase(database)) =>
    ImportingDatabase(config, Some(database))
  | _ => state
  };
};

let currentConfig =
  fun
  | ImportingConfig(c) => c
  | ImportingDatabase(c, _) => Some(c);

[@react.component]
let make = (~loadSaved, ~submit) => {
  let (state, dispatch) = React.useReducer(reducer, ImportingConfig(None));
  <div>
    <FileImport
      title=Strings.importConfig
      currentImport={currentConfig(state)}
      onImportedFile={file => dispatch(ImportedConfig(file))}
    />
    {switch (loadSaved, currentConfig(state)) {
     | (Some(load), None) =>
       <button
         className={RedButton.className ++ " mt-4"} onClick={_ => load()}>
         {React.string(Strings.loadSaved)}
       </button>
     | _ => React.null
     }}
    {switch (state) {
     | ImportingDatabase(config, currentDatabase) =>
       <React.Fragment>
         <FileImport
           title=Strings.importDatabase
           currentImport=currentDatabase
           onImportedFile={file => dispatch(ImportedDatabase(file))}
         />
         {Belt.Result.(
            switch (config, currentDatabase) {
            | (Ok(config), Some(Ok(database))) =>
              <div className="mt-6">
                <LinkButton
                  onClick={_ => submit(~config, ~database)}
                  title=Strings.next
                />
              </div>
            | _ => React.null
            }
          )}
       </React.Fragment>
     | _ => React.null
     }}
  </div>;
};
