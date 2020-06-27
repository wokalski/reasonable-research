module ControlButtons = {
  [@react.component]
  let make = (~title, ~onYes, ~onSkip, ~onNo, ~onBack) =>
    <div className="flex justify-between">
      <span>
        {switch (onBack) {
         | None => React.null
         | Some(onBack) =>
           <LinkButton title=Strings.goBack onClick={_ => onBack()} />
         }}
      </span>
      <div className="flex flex-row mt-6 ">
        <div
          className="text-md flex flex-col justify-center font-semibold text-grey-800">
          {React.string(Strings.resultColumn ++ ": " ++ title)}
        </div>
        <div className="w-6" />
        <LinkButton title=Strings.skip onClick={_ => onSkip()} />
        <div className="w-6" />
        <LinkButton title=Strings.no onClick={_ => onNo()} />
        <div className="w-6" />
        <LinkButton title=Strings.yes onClick={_ => onYes()} />
      </div>
    </div>;
};

module ValueTable = {
  [@react.component]
  let make = (~values) => {
    <div className="p-t-2">
      <div className="w-full border-solid border border-gray-300">
        {Js.Array.map(
           ((key, value)) => {
             <div
               key
               className="flex align-center border-solid border-b border-gray-300">
               <div className="bg-gray-100 p-1 w-64 overflow-hidden">
                 <span className="bold"> {React.string(key)} </span>
               </div>
               <div className="w-3/6 p-1"> {React.string(value)} </div>
             </div>
           },
           Js.Dict.entries(values),
         )
         |> React.array}
      </div>
    </div>;
  };
};

type item = {
  slug: string,
  textHTML: React.element,
};

[@react.component]
let make =
    (
      ~resultColumn,
      ~items,
      ~onYes,
      ~onNo,
      ~onSkip,
      ~onBack,
      ~saveProgress,
      ~currentValue,
      ~row,
    ) => {
  <div className="flex flex-col">
    <div className="flex">
      <Header title=Strings.researchTitle />
      <button
        className="flex flex-col bg-white hover:text-red-600 text-red-400 font-normal underline text-lg ml-4 justify-center"
        onClick={_ => saveProgress()}>
        <span> {React.string(Strings.saveProgress)} </span>
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
              className="h-64 p-3 border border-solid rounded border-gray-400 overflow-scroll">
              textHTML
            </div>
          </React.Fragment>
        )
     |> Array.of_list
     |> React.array}
    <div className="flex justify-end">
      <span>
        {React.string(Strings.currentValue ++ ": ")}
        {switch (currentValue) {
         | None =>
           <span className="italic"> {React.string(Strings.none)} </span>
         | Some(x) => React.string(x)
         }}
      </span>
    </div>
    <ControlButtons title=resultColumn onSkip onYes onNo onBack />
    <Header title=Strings.otherValuesInRow />
    <ValueTable values=row />
  </div>;
};
