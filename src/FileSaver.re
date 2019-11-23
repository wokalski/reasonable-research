module Blob = {
  type type_ = {type_: string};
  type t;
  [@bs.new] external make: (array(string), type_) => t = "Blob";
};

[@bs.val] [@bs.module "file-saver"]
external saveAs: (Blob.t, string) => unit = "saveAs";
