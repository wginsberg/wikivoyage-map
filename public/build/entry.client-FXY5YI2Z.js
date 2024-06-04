import {
  require_client
} from "/build/_shared/chunk-2FQXHUTK.js";
import {
  RemixBrowser
} from "/build/_shared/chunk-B7ZTPHPC.js";
import "/build/_shared/chunk-UI5Z6CPU.js";
import "/build/_shared/chunk-LTW3UDJL.js";
import {
  createHotContext
} from "/build/_shared/chunk-HBWSAMQU.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/entry.client.tsx
var import_react2 = __toESM(require_react(), 1);
var import_client = __toESM(require_client(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/entry.client.tsx"
  );
  import.meta.hot.lastModified = "1717543595578.7393";
}
(0, import_react2.startTransition)(() => {
  (0, import_client.hydrateRoot)(
    document,
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RemixBrowser, {}, void 0, false, {
      fileName: "app/entry.client.tsx",
      lineNumber: 19,
      columnNumber: 5
    }, this)
  );
});
//# sourceMappingURL=/build/entry.client-FXY5YI2Z.js.map
