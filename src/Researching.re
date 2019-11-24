module ControlButtons = {
  [@react.component]
  let make = (~title, ~onYes, ~onNo, ~onBack) =>
    <div className="flex justify-between">
      <span>
        {switch (onBack) {
         | None => React.null
         | Some(onBack) =>
           <LinkButton title=Strings.goBack onClick={_ => onBack()} />
         }}
      </span>
      <div className="flex flex-row mt-6 ">
        <div className="text-md flex flex-col justify-center font-semibold text-grey-800"> {React.string(Strings.resultColumn ++ ": " ++ title)} </div>
        <div className="w-6" />
        <LinkButton title=Strings.no onClick={_ => onNo()} />
        <div className="w-6" />
        <LinkButton title=Strings.yes onClick={_ => onYes()} />
      </div>
    </div>;
};

type item = {
  slug: string,
  textHTML: React.element,
};

[@react.component]
let make = (~resultColumn, ~items, ~onYes, ~onNo, ~onBack, ~saveProgress) => {
  <div className="flex flex-col">
    <div className="flex">
      <Header title=Strings.researchTitle />
      <button
        className="flex flex-col bg-white hover:text-red-600 text-red-400 font-normal underline text-lg ml-4 justify-center"
        onClick={_ => saveProgress()}>
        <span>
        {React.string(Strings.saveProgress)}
        </span>
      </button>
    </div>
    {items
     |> List.map(({slug, textHTML}) =>
          <React.Fragment key=slug>
            <div className="pt-8 pb-5">
              <span className="font-medium text-lg text-blue-900">
                {React.string(slug)}
              </span>
            </div>
            <div
              className="h-64 p-3 border border-solid rounded border-gray-400">
              textHTML
            </div>
          </React.Fragment>
        )
     |> Array.of_list
     |> React.array}
    <ControlButtons title=resultColumn onYes onNo onBack />
  </div>;
};
