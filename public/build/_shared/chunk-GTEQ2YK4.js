import {
  createHotContext
} from "/build/_shared/chunk-HBWSAMQU.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/src/components/Support/BuyMeACoffee.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/src/components/Support/BuyMeACoffee.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/src/components/Support/BuyMeACoffee.tsx"
  );
  import.meta.hot.lastModified = "1714697274784.6174";
}
function BuyMeACoffee() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { id: "buy-me-a-coffee", href: "https://www.buymeacoffee.com/wginsberg", target: "_blank", rel: "noreferrer noopener", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png", alt: "Buy Me A Coffee", width: 171, height: 48 }, void 0, false, {
    fileName: "app/src/components/Support/BuyMeACoffee.tsx",
    lineNumber: 24,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "app/src/components/Support/BuyMeACoffee.tsx",
    lineNumber: 23,
    columnNumber: 10
  }, this);
}
_c = BuyMeACoffee;
var BuyMeACoffee_default = BuyMeACoffee;
var _c;
$RefreshReg$(_c, "BuyMeACoffee");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  BuyMeACoffee_default
};
//# sourceMappingURL=/build/_shared/chunk-GTEQ2YK4.js.map
