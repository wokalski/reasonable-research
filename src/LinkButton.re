[@react.component]
let make = (~title, ~onClick) =>
  <button
    className="bg-white hover:text-blue-600 text-blue-400 font-normal underline text-2xl"
    onClick>
    {React.string(title)}
  </button>;
