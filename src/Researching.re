module ControlButtons = {
  [@react.component]
  let make = (~onYes, ~onNo, ~onBack) =>
    <div className="flex justify-between">
      <span>
        {switch (onBack) {
         | None => React.null
         | Some(onBack) =>
           <LinkButton title=Strings.goBack onClick={_ => onBack()} />
         }}
      </span>
      <div className="flex flex-row">
        <LinkButton title=Strings.no onClick={_ => onNo()} />
        <div className="w-6" />
        <LinkButton title=Strings.yes onClick={_ => onYes()} />
      </div>
    </div>;
};

[@react.component]
let make = (~slug, ~textHTML, ~onYes, ~onNo, ~onBack, ~saveProgress) => {
  <div className="flex flex-col">
    <div className="flex">
      <Header title=Strings.researchTitle />
      <button
        className="bg-white hover:text-red-600 text-red-400 font-normal underline text-lg ml-4"
        onClick={_ => saveProgress()}>
        {React.string(Strings.saveProgress)}
      </button>
    </div>
    <div className="pb-5">
      <span className="font-medium text-lg text-blue-900">
        {React.string(slug)}
      </span>
    </div>
    <div className="h-64 p-3 border border-solid rounded border-gray-400">
      textHTML
    </div>
    <ControlButtons onYes onNo onBack />
  </div>;
};