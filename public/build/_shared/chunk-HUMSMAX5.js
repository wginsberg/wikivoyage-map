import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/remix-utils/build/react/client-only.js
var React = __toESM(require_react(), 1);

// node_modules/remix-utils/build/react/use-hydrated.js
var import_react = __toESM(require_react(), 1);
function subscribe() {
  return () => {
  };
}
function useHydrated() {
  return (0, import_react.useSyncExternalStore)(subscribe, () => true, () => false);
}

// node_modules/remix-utils/build/react/client-only.js
function ClientOnly({ children, fallback = null }) {
  return useHydrated() ? React.createElement(React.Fragment, null, children()) : React.createElement(React.Fragment, null, fallback);
}

export {
  ClientOnly
};
//# sourceMappingURL=/build/_shared/chunk-HUMSMAX5.js.map
