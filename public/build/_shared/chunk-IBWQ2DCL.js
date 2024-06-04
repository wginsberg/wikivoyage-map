import {
  init_dist2 as init_dist,
  useLocation
} from "/build/_shared/chunk-UI5Z6CPU.js";
import {
  createHotContext
} from "/build/_shared/chunk-HBWSAMQU.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/src/hooks/usePersistentState.ts
var import_react = __toESM(require_react(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/src/hooks/usePersistentState.ts"
  );
  import.meta.hot.lastModified = "1717541819815.3132";
}
function usePersistentState(key, defaultValue) {
  const [reactState, setReactState] = (0, import_react.useState)(defaultValue);
  (0, import_react.useEffect)(() => {
    const persistentValue = window.localStorage.getItem(key);
    if (persistentValue !== null) {
      setReactState(JSON.parse(persistentValue));
    }
  }, [key]);
  const setState = (0, import_react.useCallback)((value) => {
    setReactState(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, setReactState]);
  return [reactState, setState];
}

// app/src/hooks/useResetScrollPosition.js
var import_react2 = __toESM(require_react(), 1);
init_dist();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/src/hooks/useResetScrollPosition.js"
  );
  import.meta.hot.lastModified = "1708456901473.0247";
}
function useResetScrollPosition() {
  const { pathname } = useLocation();
  (0, import_react2.useEffect)(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}
var useResetScrollPosition_default = useResetScrollPosition;

// app/src/constants.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/src/constants.ts"
  );
  import.meta.hot.lastModified = "1717095006379.431";
}
var MAX_ZOOM = 12;
var MAX_VISIBLE_NODES = 199;
var INITIAL_MAP_BOUNDS = "-275.62500000000006,-86.69798221404793,243.98437500000003,87.38445679076668";
var GEOLOCATION_OPTION = "options.location";

export {
  usePersistentState,
  useResetScrollPosition_default,
  MAX_ZOOM,
  MAX_VISIBLE_NODES,
  INITIAL_MAP_BOUNDS,
  GEOLOCATION_OPTION
};
//# sourceMappingURL=/build/_shared/chunk-IBWQ2DCL.js.map
