type unloadEvent = {mutable returnValue: string};
type window;
[@bs.val] external window: window = "window";

[@bs.set]
external onBeforeUnload: (window, option(unloadEvent => unit)) => unit =
  "onbeforeunload";

let onBeforeUnload = onBeforeUnload(window);
