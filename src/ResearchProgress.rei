type result = array(Js.Dict.t(string));

type searchItem = {
  slug: string,
  getTextHTML: unit => React.element,
};

type submission =
  | Yes
  | No
  | Idontknow;

type search = {
  resultColumn: string,
  items: list(searchItem),
  saveProgress: unit => unit,
  submit: submission => t,
  back: option(unit => t),
  row: Js.Dict.t(string),
  currentValue: option(string),
}
and t = {
  currentSearch: option(search),
  result,
};

let make:
  (~config: string, ~database: File.t) =>
  Js.Promise.t(Belt.Result.t(t, string));

let load: unit => option(t);
