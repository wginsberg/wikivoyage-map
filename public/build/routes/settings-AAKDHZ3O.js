import {
  GEOLOCATION_OPTION,
  usePersistentState,
  useResetScrollPosition_default
} from "/build/_shared/chunk-IBWQ2DCL.js";
import {
  BuyMeACoffee_default
} from "/build/_shared/chunk-GTEQ2YK4.js";
import {
  Link,
  init_dist2 as init_dist
} from "/build/_shared/chunk-UI5Z6CPU.js";
import "/build/_shared/chunk-LTW3UDJL.js";
import {
  createHotContext
} from "/build/_shared/chunk-HBWSAMQU.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/src/pages/Settings.jsx
init_dist();
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/src/pages/Settings.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/src/pages/Settings.jsx"
  );
  import.meta.hot.lastModified = "1715114286064.1064";
}
function Settings() {
  _s();
  useResetScrollPosition_default();
  const [location, setLocation] = usePersistentState(GEOLOCATION_OPTION, false);
  const handleLocationChange = () => setLocation(!location);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "settings page", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/", children: "Home" }, void 0, false, {
        fileName: "app/src/pages/Settings.jsx",
        lineNumber: 36,
        columnNumber: 25
      }, this) }, void 0, false, {
        fileName: "app/src/pages/Settings.jsx",
        lineNumber: 35,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "app/src/pages/Settings.jsx",
        lineNumber: 34,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { children: "Settings" }, void 0, false, {
        fileName: "app/src/pages/Settings.jsx",
        lineNumber: 39,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Show my location on the map" }, void 0, false, {
          fileName: "app/src/pages/Settings.jsx",
          lineNumber: 42,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", checked: !!location, onChange: handleLocationChange }, void 0, false, {
          fileName: "app/src/pages/Settings.jsx",
          lineNumber: 43,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "app/src/pages/Settings.jsx",
        lineNumber: 41,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "app/src/pages/Settings.jsx",
        lineNumber: 40,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/src/pages/Settings.jsx",
      lineNumber: 33,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BuyMeACoffee_default, {}, void 0, false, {
      fileName: "app/src/pages/Settings.jsx",
      lineNumber: 47,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "app/src/pages/Settings.jsx",
    lineNumber: 32,
    columnNumber: 10
  }, this);
}
_s(Settings, "EqNnO7xXlVa5ohNLCdwEFQI9ItA=", false, function() {
  return [useResetScrollPosition_default, usePersistentState];
});
_c = Settings;
var Settings_default = Settings;
var _c;
$RefreshReg$(_c, "Settings");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/settings.tsx
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/settings.tsx"
  );
  import.meta.hot.lastModified = "1717538797740.5112";
}
export {
  Settings_default as default
};
//# sourceMappingURL=/build/routes/settings-AAKDHZ3O.js.map
