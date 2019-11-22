type resultRow;

external resultRowToArray: resultRow => array(string) = "%identity";
external resultRowToDict: resultRow => Js.Dict.t(string) = "%identity";

type result = {
  data: array(resultRow),
}

type config = {
  header: bool,
  complete: array(result) => unit,
  error: unit => unit
};

[@bs.val] [@bs.module "papaparse"]
external parseFile: (File.t, config) => unit = "parse";

let parse = (file) => {
  Js.Promise.make((resolve, reject) => {

  });
};

