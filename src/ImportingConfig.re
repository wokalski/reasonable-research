[@react.component]
let make = (~opacity, ~currentConfig, ~onImportedFile) => {
  <FileImport
    title=Strings.importConfig
    currentImport=currentConfig
    opacity
    onImportedFile
  />;
};
