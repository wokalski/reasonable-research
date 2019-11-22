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

let importConfigOpacity =
  fun
  | ImportingConfig(_) => 1.
  | ImportingDatabase(_) => 0.4;

[@react.component]
let make = (~submit) => {
  let (state, dispatch) = React.useReducer(reducer, ImportingConfig(None));
  <React.Fragment>
    <FileImport
      title=Strings.importConfig
      currentImport={currentConfig(state)}
      opacity={importConfigOpacity(state)}
      onImportedFile={file => dispatch(ImportedConfig(file))}
    />
    {switch (state) {
     | ImportingDatabase(config, currentDatabase) =>
       <React.Fragment>
         <FileImport
           opacity=1.
           title=Strings.importDatabase
           currentImport=currentDatabase
           onImportedFile={file => dispatch(ImportedDatabase(file))}
         />
         {Belt.Result.(
            switch (config, currentDatabase) {
            | (Ok(config), Some(Ok(database))) =>
              <button onClick={_ => submit(~config, ~database)} />
            | _ => React.null
            }
          )}
       </React.Fragment>
     | _ => React.null
     }}
  </React.Fragment>;
};
