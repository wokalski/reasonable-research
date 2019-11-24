type result = array(Js.Dict.t(string));

type searchItem = {
  slug: string,
  getTextHTML: unit => React.element,
};

type search = {
  resultColumn: string,
  items: list(searchItem),
  saveProgress: unit => unit,
  submit: bool => t,
  back: option(unit => t),
}
and t = {
  currentSearch: option(search),
  result,
};

let make:
  (~config: File.t, ~database: File.t) =>
  Js.Promise.t(Belt.Result.t(t, string));

let load: unit => option(t);
