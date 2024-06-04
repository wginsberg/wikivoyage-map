import {
  GEOLOCATION_OPTION,
  INITIAL_MAP_BOUNDS,
  MAX_VISIBLE_NODES,
  MAX_ZOOM,
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
import {
  ClientOnly
} from "/build/_shared/chunk-HUMSMAX5.js";
import {
  createHotContext
} from "/build/_shared/chunk-HBWSAMQU.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/src/pages/Main.tsx
var import_react6 = __toESM(require_react(), 1);
init_dist();

// app/src/components/Header/ExternalLinkIcon.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/src/components/Header/ExternalLinkIcon.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/src/components/Header/ExternalLinkIcon.tsx"
  );
  import.meta.hot.lastModified = "1714865614993.2175";
}
var ExternalLinkIcon = () => {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M15.6396 7.02527H12.0181V5.02527H19.0181V12.0253H17.0181V8.47528L12.1042 13.3892L10.6899 11.975L15.6396 7.02527Z", fill: "blue" }, void 0, false, {
      fileName: "app/src/components/Header/ExternalLinkIcon.tsx",
      lineNumber: 23,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M10.9819 6.97473H4.98193V18.9747H16.9819V12.9747H14.9819V16.9747H6.98193V8.97473H10.9819V6.97473Z", fill: "blue" }, void 0, false, {
      fileName: "app/src/components/Header/ExternalLinkIcon.tsx",
      lineNumber: 24,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "app/src/components/Header/ExternalLinkIcon.tsx",
    lineNumber: 22,
    columnNumber: 10
  }, this);
};
_c = ExternalLinkIcon;
var ExternalLinkIcon_default = ExternalLinkIcon;
var _c;
$RefreshReg$(_c, "ExternalLinkIcon");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/src/components/Header/HeaderContent.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/src/components/Header/HeaderContent.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/src/components/Header/HeaderContent.tsx"
  );
  import.meta.hot.lastModified = "1717016804090.7224";
}
function Header(props) {
  const {
    node
  } = props;
  const {
    title,
    byline
  } = node;
  const href = `https://en.wikivoyage.org/wiki/${title}`;
  const trimmedByline = byline?.startsWith(title) ? byline.slice(title.length).trimStart() : byline;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_jsx_dev_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("a", { href, target: "_blank", rel: "noreferrer", children: [
      title,
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ExternalLinkIcon_default, {}, void 0, false, {
        fileName: "app/src/components/Header/HeaderContent.tsx",
        lineNumber: 35,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/src/components/Header/HeaderContent.tsx",
      lineNumber: 33,
      columnNumber: 13
    }, this),
    trimmedByline
  ] }, void 0, true, {
    fileName: "app/src/components/Header/HeaderContent.tsx",
    lineNumber: 32,
    columnNumber: 10
  }, this);
}
_c2 = Header;
var HeaderContent_default = Header;
var _c2;
$RefreshReg$(_c2, "Header");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/src/components/Header/EmptyHeaderContent.tsx
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/src/components/Header/EmptyHeaderContent.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/src/components/Header/EmptyHeaderContent.tsx"
  );
  import.meta.hot.lastModified = "1717016704043.522";
}
function EmptyHeaderContent() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h1", { children: "Click a location to see where you could go next" }, void 0, false, {
    fileName: "app/src/components/Header/EmptyHeaderContent.tsx",
    lineNumber: 22,
    columnNumber: 10
  }, this);
}
_c3 = EmptyHeaderContent;
var _c3;
$RefreshReg$(_c3, "EmptyHeaderContent");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/src/components/Header/VerboseHeader.tsx
var import_jsx_dev_runtime4 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/src/components/Header/VerboseHeader.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/src/components/Header/VerboseHeader.tsx"
  );
  import.meta.hot.lastModified = "1717454805187.5894";
}
function VerboseHeader(props) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h1", { children: [
    "Where to go after ",
    props.nodeTitle
  ] }, void 0, true, {
    fileName: "app/src/components/Header/VerboseHeader.tsx",
    lineNumber: 22,
    columnNumber: 10
  }, this);
}
_c4 = VerboseHeader;
var _c4;
$RefreshReg$(_c4, "VerboseHeader");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/src/components/Header/index.tsx
var import_jsx_dev_runtime5 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/src/components/Header/index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/src/components/Header/index.tsx"
  );
  import.meta.hot.lastModified = "1717454805187.7258";
}
function Header2(props) {
  const {
    verbose,
    nodeTitle,
    node
  } = props;
  if (!node) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("header", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(EmptyHeaderContent, {}, void 0, false, {
      fileName: "app/src/components/Header/index.tsx",
      lineNumber: 32,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "app/src/components/Header/index.tsx",
      lineNumber: 31,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("header", { children: [
    verbose && nodeTitle && /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(VerboseHeader, { nodeTitle }, void 0, false, {
      fileName: "app/src/components/Header/index.tsx",
      lineNumber: 36,
      columnNumber: 38
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(HeaderContent_default, { node }, void 0, false, {
      fileName: "app/src/components/Header/index.tsx",
      lineNumber: 37,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "app/src/components/Header/index.tsx",
    lineNumber: 35,
    columnNumber: 10
  }, this);
}
_c5 = Header2;
var Header_default = Header2;
var _c5;
$RefreshReg$(_c5, "Header");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/src/components/Connections/index.tsx
var import_jsx_dev_runtime6 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/src/components/Connections/index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/src/components/Connections/index.tsx"
  );
  import.meta.hot.lastModified = "1717537319617.443";
}
function Connections(props) {
  const {
    verbose,
    activeNode,
    activeEdges,
    hoverNode,
    onClick,
    onMouseEnter,
    onMouseLeave
  } = props;
  const activeTitle = activeNode?.title;
  const hoverTitle = hoverNode?.title;
  const titles = activeEdges?.map((edge) => [edge.origin.title, edge.destination.title]).flat().filter((title) => title !== activeTitle);
  const uniqueTitles = [...new Set(titles)];
  const sortedTitles = uniqueTitles.sort();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "connections", children: [
    verbose && activeNode?.title && /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { style: {
      textAlign: "center"
    }, children: [
      "After visiting ",
      activeNode.title,
      " you could go next to"
    ] }, void 0, true, {
      fileName: "app/src/components/Connections/index.tsx",
      lineNumber: 37,
      columnNumber: 46
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("ul", { children: titles?.map((title) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("button", { className: title === hoverTitle ? "active" : "", onClick: () => onClick(title), onMouseEnter: () => onMouseEnter(title), onMouseLeave, children: title }, void 0, false, {
      fileName: "app/src/components/Connections/index.tsx",
      lineNumber: 44,
      columnNumber: 25
    }, this) }, title, false, {
      fileName: "app/src/components/Connections/index.tsx",
      lineNumber: 43,
      columnNumber: 39
    }, this)) }, void 0, false, {
      fileName: "app/src/components/Connections/index.tsx",
      lineNumber: 42,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "app/src/components/Connections/index.tsx",
    lineNumber: 36,
    columnNumber: 10
  }, this);
}
_c6 = Connections;
var Connections_default = Connections;
var _c6;
$RefreshReg$(_c6, "Connections");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/src/hooks/useGeolocation.ts
var import_react = __toESM(require_react(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/src/hooks/useGeolocation.ts"
  );
  import.meta.hot.lastModified = "1717094278291.4417";
}
function useGeolocation() {
  const [enabled] = usePersistentState(GEOLOCATION_OPTION, false);
  const [position, setPosition] = (0, import_react.useState)();
  (0, import_react.useEffect)(() => {
    if (!enabled)
      return;
    const onSuccess = ({ coords }) => {
      const { latitude, longitude } = coords;
      setPosition({ latitude, longitude });
    };
    const watcherId = navigator.geolocation.watchPosition(onSuccess);
    return () => navigator.geolocation.clearWatch(watcherId);
  }, [enabled]);
  return position;
}
var useGeolocation_default = useGeolocation;

// app/src/hooks/useWorldNodes.ts
var import_react2 = __toESM(require_react(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/src/hooks/useWorldNodes.ts"
  );
  import.meta.hot.lastModified = "1717520566434.405";
}
var useWorldNodes = (nodeId) => {
  const [loading, setLoading] = (0, import_react2.useState)(true);
  const [nodes, setNodes] = (0, import_react2.useState)({});
  (0, import_react2.useEffect)(() => {
    fetch("world_edges.json", { credentials: "include", mode: "no-cors" }).then((response) => response.json()).then((json) => {
      setNodes((prev) => ({
        ...json,
        ...prev
      }));
      setLoading(false);
    });
  }, []);
  (0, import_react2.useEffect)(() => {
    if (!nodeId)
      return;
    if (nodes[nodeId])
      return;
    setLoading(true);
    const firstThreeChars = nodeId.slice(0, 3);
    fetch(`nodes/${firstThreeChars}.json`).then((response) => response.json()).then((loadedNodes) => {
      setNodes((prev) => ({
        ...loadedNodes,
        ...prev
      }));
      setLoading(false);
      return loadedNodes[nodeId].edges;
    }).then((relatedNodeIds) => {
      relatedNodeIds.forEach((relatedNodeId) => {
        if (nodes[relatedNodeId])
          return;
        const firstThreeChars2 = relatedNodeId.slice(0, 3);
        fetch(`nodes/${firstThreeChars2}.json`).then((response) => response.json()).then((loadedNodes) => {
          setNodes((prev) => ({
            ...loadedNodes,
            ...prev
          }));
        });
      });
    });
  }, [nodeId]);
  return {
    loadingNodes: loading,
    nodes
  };
};
var useWorldNodes_default = useWorldNodes;

// app/src/hooks/useActiveWikivoyagePage.ts
var import_react3 = __toESM(require_react(), 1);

// app/src/utils.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/src/utils.ts"
  );
  import.meta.hot.lastModified = "1717015145594.0647";
}
function getFormattedName(title) {
  return title.replace(/ /g, "_").replace(/&/g, "%26");
}
function parseFormattedName(title) {
  return title.replace(/_/g, " ").replace(/%26/g, "&");
}

// app/src/hooks/useActiveWikivoyagePage.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/src/hooks/useActiveWikivoyagePage.ts"
  );
  import.meta.hot.lastModified = "1717521818728.6042";
}
function useActiveWikivoyagePage() {
  const [loadingActiveId, setLoadingActiveId] = (0, import_react3.useState)(true);
  const [activeId, _setActiveId] = usePersistentState("activeId", "");
  const [isFreshSession, setIsFreshSession] = (0, import_react3.useState)(false);
  (0, import_react3.useEffect)(() => {
    const slug = window.location.hash.slice(1) || window.location.pathname.slice(1);
    setLoadingActiveId(false);
    if (!slug)
      return;
    const id = parseFormattedName(decodeURIComponent(slug));
    _setActiveId(id);
    setIsFreshSession(true);
  }, [_setActiveId]);
  const setActiveId = (id) => {
    const cleanId = getFormattedName(id);
    const newUrl = window.location.origin + "#" + cleanId;
    window.history.replaceState(null, "", newUrl);
    _setActiveId(id);
    setIsFreshSession(false);
  };
  return {
    loadingActiveId,
    activeId,
    setActiveId,
    isFreshSession
  };
}
var useActiveWikivoyagePage_default = useActiveWikivoyagePage;

// app/src/capitals.json
var capitals_default = {
  capitals: [
    "Kabul",
    "Tirana",
    "Algiers",
    "Andorra la Vella",
    "Luanda",
    "Saint John's",
    "Buenos Aires",
    "Yerevan",
    "Canberra",
    "Vienna",
    "Baku",
    "Nassau",
    "Manama",
    "Dhaka",
    "Bridgetown",
    "Minsk",
    "Brussels",
    "Belmopan",
    "Porto Novo",
    "Thimphu",
    "La Paz",
    "Sarajevo",
    "Gaborone",
    "Brasilia",
    "Bandar Seri Begawan",
    "Sofia",
    "Ouagadougou",
    "Gitega",
    "Phnom Penh",
    "Yaound\xE9",
    "Ottawa",
    "Praia",
    "Bangui",
    "N'Djamena",
    "Santiago",
    "Beijing",
    "Bogot\xE1",
    "Moroni",
    "Kinshasa",
    "Brazzaville",
    "San Jose",
    "Yamoussoukro",
    "Zagreb",
    "Havana",
    "Nicosia",
    "Prague",
    "Copenhagen",
    "Djibouti",
    "Roseau",
    "Santo Domingo",
    "Dili",
    "Quito",
    "Cairo",
    "San Salvador",
    "London",
    "Malabo",
    "Asmara",
    "Tallinn",
    "Mbabane",
    "Addis Ababa",
    "Palikir",
    "Suva",
    "Helsinki",
    "Paris",
    "Libreville",
    "Banjul",
    "Tbilisi",
    "Berlin",
    "Accra",
    "Athens",
    "Saint George's",
    "Guatemala City",
    "Conakry",
    "Bissau",
    "Georgetown",
    "Port au Prince",
    "Tegucigalpa",
    "Budapest",
    "Reykjav\xEDk",
    "Delhi",
    "Jakarta",
    "Tehran",
    "Baghdad",
    "Dublin",
    "Rome",
    "Kingston",
    "Tokyo",
    "Amman",
    "Astana",
    "Nairobi",
    "Tarawa Atoll",
    "Pristina",
    "Kuwait City",
    "Bishkek",
    "Vientiane",
    "Riga",
    "Beirut",
    "Maseru",
    "Monrovia",
    "Tripoli",
    "Vaduz",
    "Vilnius",
    "Luxembourg",
    "Antananarivo",
    "Lilongwe",
    "Kuala Lumpur",
    "Male",
    "Bamako",
    "Valletta",
    "Majuro",
    "Nouakchott",
    "Port Louis",
    "Mexico City",
    "Chisinau",
    "Monaco",
    "Ulaanbaatar",
    "Podgorica",
    "Rabat",
    "Maputo",
    "Nay Pyi Taw",
    "Windhoek",
    "Kathmandu",
    "Amsterdam",
    "Wellington",
    "Managua",
    "Niamey",
    "Abuja",
    "Pyongyang",
    "Skopje",
    "Belfast",
    "Oslo",
    "Muscat",
    "Islamabad",
    "Melekeok",
    "Jerusalem",
    "Panama City",
    "Port Moresby",
    "Asuncion",
    "Lima",
    "Manila",
    "Warsaw",
    "Lisbon",
    "Doha",
    "Bucharest",
    "Moscow",
    "Kigali",
    "Basseterre",
    "Castries",
    "Kingstown",
    "Apia",
    "San Marino",
    "Sao Tome",
    "Riyadh",
    "Edinburgh",
    "Dakar",
    "Belgrade",
    "Victoria",
    "Freetown",
    "Singapore",
    "Bratislava",
    "Ljubljana",
    "Honiara",
    "Mogadishu",
    "Pretoria, Bloemfontein, Cape Town",
    "Seoul",
    "Juba",
    "Madrid",
    "Sri Jayawardenapura Kotte",
    "Khartoum",
    "Paramaribo",
    "Stockholm",
    "Bern",
    "Damascus",
    "Taipei",
    "Dushanbe",
    "Dodoma",
    "Bangkok",
    "Lome",
    "Nuku'alofa",
    "Port of Spain",
    "Tunis",
    "Ankara",
    "Ashgabat",
    "Funafuti",
    "Kampala",
    "Kyiv or Kiev",
    "Abu Dhabi",
    "London",
    "Washington, D.C.",
    "Montevideo",
    "Tashkent",
    "Port Vila",
    "Vatican City",
    "Caracas",
    "Hanoi",
    "Cardiff",
    "Sana'a",
    "Lusaka",
    "Harare"
  ]
};

// app/src/capitals.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/src/capitals.ts"
  );
  import.meta.hot.lastModified = "1714695176547.9941";
}
var capitals = new Set(capitals_default.capitals);
var capitals_default2 = capitals;

// app/src/components/Meta/Description.tsx
var import_react4 = __toESM(require_react(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/src/components/Meta/Description.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/src/components/Meta/Description.tsx"
  );
  import.meta.hot.lastModified = "1717458687534.916";
}
function MetaDescription({
  node
}) {
  _s();
  const [done, setDone] = (0, import_react4.useState)(false);
  (0, import_react4.useEffect)(() => {
    if (done)
      return;
    if (!node?.title)
      return;
    const description = node.edges.length > 1 ? `Want to know where to go after visiting ${node.title}? Discover ${node.edges.length} different places to go after ${node.title}.` : `Find out where to go after visiting ${node.title}`;
    const metaTag = document.createElement("meta");
    metaTag.setAttribute("name", "description");
    metaTag.setAttribute("content", description);
    document.head.append(metaTag);
    setDone(true);
  }, [node]);
  return null;
}
_s(MetaDescription, "dG0Xu/UHLyKNC3cIz8t84yBdglk=");
_c7 = MetaDescription;
var _c7;
$RefreshReg$(_c7, "MetaDescription");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/src/components/Meta/Title.tsx
var import_react5 = __toESM(require_react(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/src/components/Meta/Title.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/src/components/Meta/Title.tsx"
  );
  import.meta.hot.lastModified = "1717458858932.923";
}
function MetaTitle({
  node
}) {
  _s2();
  (0, import_react5.useEffect)(() => {
    if (!node?.title)
      return;
    document.title = `${node.title} | where u going`;
  }, [node]);
  return null;
}
_s2(MetaTitle, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c8 = MetaTitle;
var _c8;
$RefreshReg$(_c8, "MetaTitle");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/src/pages/Main.tsx
var import_jsx_dev_runtime7 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/src/pages/Main.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s3 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/src/pages/Main.tsx"
  );
  import.meta.hot.lastModified = "1717543043800.2705";
}
function App() {
  _s3();
  useResetScrollPosition_default();
  const {
    loadingActiveId,
    activeId,
    setActiveId,
    isFreshSession
  } = useActiveWikivoyagePage_default();
  const [hoverId, setHoverId] = (0, import_react6.useState)(-1);
  const [mapBounds, setMapBounds] = (0, import_react6.useState)(INITIAL_MAP_BOUNDS);
  const {
    loadingNodes,
    nodes
  } = useWorldNodes_default(activeId);
  const geolocation = useGeolocation_default();
  const mapRef = (0, import_react6.useRef)(null);
  const isMapZoomedIn = mapRef.current && mapRef.current.getZoom() > 5;
  const featureGroupRef = (0, import_react6.useRef)(null);
  const activeNode = nodes[activeId];
  const hoverNode = nodes[hoverId];
  const [sw_lng, sw_lat, ne_lng, ne_lat] = mapBounds.split(",").map(Number.parseFloat);
  const visibleFocusNodeIds = activeNode ? /* @__PURE__ */ new Set([activeId, ...activeNode.edges]) : /* @__PURE__ */ new Set();
  const otherNodesToShow = isMapZoomedIn || !!activeId ? [...capitals_default2, ...Object.keys(nodes)] : [...capitals_default2];
  const otherVisibleNodeIds = otherNodesToShow.filter((title) => !visibleFocusNodeIds.has(title)).filter((title) => {
    if (!nodes[title]) {
      return false;
    }
    const {
      lat,
      lng
    } = nodes[title];
    return sw_lng < lng && ne_lng > lng && sw_lat < lat && ne_lat > lat;
  });
  const allVisibleNodeIds = new Set([...visibleFocusNodeIds, ...otherVisibleNodeIds].slice(0, MAX_VISIBLE_NODES));
  const visibleNodes = [...allVisibleNodeIds].map((title) => nodes[title]).filter(Boolean);
  const updateVisibleNodes = (0, import_react6.useCallback)((map) => {
    if (!map)
      return;
    setMapBounds(map.getBounds().toBBoxString());
  }, [setMapBounds]);
  const activeEdges = (activeNode?.edges || []).filter((otherId) => nodes[otherId]).map((otherId) => ({
    origin: activeNode,
    destination: nodes[otherId]
  }));
  const inactiveEdges = (Object.values(visibleNodes) || []).filter(({
    title
  }) => title !== activeId).map(({
    title
  }) => {
    const node = nodes[title];
    return node.edges.filter((otherId) => nodes[otherId]).map((otherId) => {
      const otherNode = nodes[otherId];
      return {
        origin: node,
        destination: otherNode
      };
    });
  }).flat().filter(({
    origin,
    destination
  }) => {
    return allVisibleNodeIds.has(origin.title) && allVisibleNodeIds.has(destination.title);
  });
  (0, import_react6.useEffect)(() => {
    const map = mapRef.current;
    if (!map)
      return;
    window.scrollTo({
      top: 0
    });
    const bounds = featureGroupRef.current?.getBounds();
    if (bounds?.isValid()) {
      map.fitBounds(bounds, {
        padding: [50, 50],
        animate: true
      });
    } else {
      if (!activeNode)
        return;
      map.setView(activeNode, MAX_ZOOM, {
        animate: true
      });
    }
  }, [mapRef.current, activeNode]);
  const centerMapOnGeolocation = () => {
    const map = mapRef.current;
    if (!map)
      return;
    if (!geolocation)
      return;
    const {
      latitude,
      longitude
    } = geolocation;
    map.setView([latitude, longitude], MAX_ZOOM, {
      animate: true
    });
    let closestNode = null;
    let closestDistance = NaN;
    for (const title in nodes) {
      const node = nodes[title];
      const distance = map.distance(node, {
        lat: latitude,
        lng: longitude
      });
      if (!(closestDistance < distance)) {
        closestNode = node;
        closestDistance = distance;
      }
    }
    const newActiveNodeId = closestNode ? closestNode.title : "";
    setActiveId(newActiveNodeId);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_jsx_dev_runtime7.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(MetaTitle, { node: activeNode }, void 0, false, {
      fileName: "app/src/pages/Main.tsx",
      lineNumber: 164,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(MetaDescription, { node: activeNode }, void 0, false, {
      fileName: "app/src/pages/Main.tsx",
      lineNumber: 165,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "App", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { style: {
        height: "100%",
        maxHeight: "75svh",
        display: "flex",
        flexDirection: "column"
      }, children: [
        !loadingNodes && /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(Header_default, { nodeTitle: activeId, node: activeNode, verbose: isFreshSession }, void 0, false, {
          fileName: "app/src/pages/Main.tsx",
          lineNumber: 173,
          columnNumber: 27
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(ClientOnly, { fallback: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { children: "fallback" }, void 0, false, {
          fileName: "app/src/pages/Main.tsx",
          lineNumber: 174,
          columnNumber: 31
        }, this), children: () => /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { children: "client" }, void 0, false, {
          fileName: "app/src/pages/Main.tsx",
          lineNumber: 175,
          columnNumber: 18
        }, this) }, void 0, false, {
          fileName: "app/src/pages/Main.tsx",
          lineNumber: 174,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "app/src/pages/Main.tsx",
        lineNumber: 167,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(Connections_default, { verbose: isFreshSession, activeNode, activeEdges, hoverNode, onClick: setActiveId, onMouseEnter: setHoverId, onMouseLeave: () => setHoverId(-1) }, void 0, false, {
        fileName: "app/src/pages/Main.tsx",
        lineNumber: 192,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("footer", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "links", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(Link, { to: "settings", children: "Settings" }, void 0, false, {
            fileName: "app/src/pages/Main.tsx",
            lineNumber: 195,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(Link, { to: "about", children: "About" }, void 0, false, {
            fileName: "app/src/pages/Main.tsx",
            lineNumber: 198,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "app/src/pages/Main.tsx",
          lineNumber: 194,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(BuyMeACoffee_default, {}, void 0, false, {
          fileName: "app/src/pages/Main.tsx",
          lineNumber: 202,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "app/src/pages/Main.tsx",
        lineNumber: 193,
        columnNumber: 7
      }, this)
    ] }, void 0, true, {
      fileName: "app/src/pages/Main.tsx",
      lineNumber: 166,
      columnNumber: 5
    }, this)
  ] }, void 0, true, {
    fileName: "app/src/pages/Main.tsx",
    lineNumber: 163,
    columnNumber: 10
  }, this);
}
_s3(App, "IkOxpgHffB/ux/xZjbW6ipsbWmA=", false, function() {
  return [useResetScrollPosition_default, useActiveWikivoyagePage_default, useWorldNodes_default, useGeolocation_default];
});
_c9 = App;
var Main_default = App;
var _c9;
$RefreshReg$(_c9, "App");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  Main_default
};
//# sourceMappingURL=/build/_shared/chunk-LLERIEMI.js.map
