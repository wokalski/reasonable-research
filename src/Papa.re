type resultRow;

external resultsToArrays: array(resultRow) => array(array(string)) =
  "%identity";
external resultsToDicts: array(resultRow) => array(Js.Dict.t(string)) =
  "%identity";

type result = {data: array(resultRow)};

type config = {
  header: bool,
  complete: option((. result) => unit),
  error: option((. unit) => unit),
};

[@bs.val] [@bs.module "papaparse"]
external parseFile: (File.t, config) => unit = "parse";

let error = Belt.Result.Error(Strings.cantParseCSVFile);

let parse = file => {
  Js.Promise.make((~resolve, ~reject as _) => {
    parseFile(
      file,
      {
        header: false,
        complete:
          Some(
            (. {data}) =>
              if (Js.Array.length(data) > 0 && Js.Array.isArray(data[0])) {
                Js.log(data);
                resolve(. Belt.Result.Ok(resultsToArrays(data)));
              } else {
                resolve(. error);
              },
          ),
        error: Some((.) => {resolve(. error)}),
      },
    )
  });
};

let parseWithHeader = file => {
  Js.Promise.make((~resolve, ~reject as _) => {
    parseFile(
      file,
      {
        header: true,
        complete:
          Some(
            (. {data}) =>
              if (Js.Array.length(data) > 0 && !Js.Array.isArray(data[0])) {
                Js.log(data);
                resolve(. Belt.Result.Ok(resultsToDicts(data)));
              } else {
                resolve(. error);
              },
          ),
        error: Some((.) => {resolve(. error)}),
      },
    )
  });
};

[@bs.val] [@bs.module "papaparse"]
external unparse: array(Js.Dict.t(string)) => string = "unparse";
[@bs.val] [@bs.module "papaparse"]
external unparseWithoutHeaders: array(array(string)) => string = "unparse";

module String = {
  [@bs.val] [@bs.module "papaparse"]
  external parseString: (string, config) => result = "parse";

  let parse = string => {
    let {data} = parseString(string, {header: true, complete: None, error: None});
    resultsToDicts(data);
  };
  let parseWithoutHeader = string => {
    let {data} =
      parseString(string, {header: false, complete: None, error: None});
    resultsToArrays(data);
  };
};
