[@react.component]
let make =
    (
      ~config,
      ~currentDatabase,
      ~onImportedConfig,
      ~onImportedDatabase,
      ~submit,
    ) => {
  <React.Fragment>
    <ImportingConfig
      currentConfig={Some(config)}
      opacity=0.4
      onImportedFile=onImportedConfig
    />
    <FileImport
      opacity=1.
      title=Strings.importDatabase
      currentImport=currentDatabase
      onImportedFile=onImportedDatabase
    />
    {Belt.Result.(
       switch (config, currentDatabase) {
       | (Ok(_), Some(Ok(_))) =>
         <button onClick={_ => submit()} />
       | _ => React.null
       }
     )}
  </React.Fragment>;
};
