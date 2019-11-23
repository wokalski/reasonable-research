'use strict';


var partial_arg = window;

function onBeforeUnload(param) {
  partial_arg.onbeforeunload = param;
  return /* () */0;
}

exports.onBeforeUnload = onBeforeUnload;
/* partial_arg Not a pure module */
