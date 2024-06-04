var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsxDEV } from "react/jsx-dev-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 44,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          let body = new PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(
              createReadableStreamFromReadable(body),
              {
                headers: responseHeaders,
                status: responseStatusCode
              }
            )
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 89,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          let body = new PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(
              createReadableStreamFromReadable(body),
              {
                headers: responseHeaders,
                status: responseStatusCode
              }
            )
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          console.error(error), responseStatusCode = 500;
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => Root
});
import { Outlet } from "@remix-run/react";
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
function Root() {
  return /* @__PURE__ */ jsxDEV2("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 7,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2("link", { rel: "icon", href: "/favicon.ico" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 8,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(
        "meta",
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1"
        },
        void 0,
        !1,
        {
          fileName: "app/root.tsx",
          lineNumber: 9,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV2("meta", { name: "theme-color", content: "#000000" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 13,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(
        "meta",
        {
          name: "description",
          content: "My beautiful React app"
        },
        void 0,
        !1,
        {
          fileName: "app/root.tsx",
          lineNumber: 14,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV2("link", { rel: "apple-touch-icon", href: "/logo192.png" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 18,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2("link", { rel: "manifest", href: "/manifest.json" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 19,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2("title", { children: "My React App" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 20,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2("link", { rel: "stylesheet", href: "/index.css" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 21,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 6,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { children: /* @__PURE__ */ jsxDEV2("div", { id: "root", children: /* @__PURE__ */ jsxDEV2(Outlet, {}, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 25,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 24,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 23,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/routes/settings.tsx
var settings_exports = {};
__export(settings_exports, {
  default: () => Settings_default
});

// app/src/pages/Settings.jsx
import { Link } from "react-router-dom";

// app/src/hooks/usePersistentState.ts
import { useEffect, useState, useCallback } from "react";
function usePersistentState(key, defaultValue) {
  let [reactState, setReactState] = useState(defaultValue);
  useEffect(() => {
    let persistentValue = window.localStorage.getItem(key);
    persistentValue !== null && setReactState(JSON.parse(persistentValue));
  }, [key]);
  let setState = useCallback((value) => {
    setReactState(value), window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, setReactState]);
  return [reactState, setState];
}

// app/src/hooks/useResetScrollPosition.js
import { useEffect as useEffect2 } from "react";
import { useLocation } from "react-router-dom";
function useResetScrollPosition() {
  let { pathname } = useLocation();
  useEffect2(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}
var useResetScrollPosition_default = useResetScrollPosition;

// app/src/constants.ts
var INITIAL_MAP_BOUNDS = "-275.62500000000006,-86.69798221404793,243.98437500000003,87.38445679076668";
var GEOLOCATION_OPTION = "options.location";

// app/src/components/Support/BuyMeACoffee.tsx
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
function BuyMeACoffee() {
  return /* @__PURE__ */ jsxDEV3(
    "a",
    {
      id: "buy-me-a-coffee",
      href: "https://www.buymeacoffee.com/wginsberg",
      target: "_blank",
      rel: "noreferrer noopener",
      children: /* @__PURE__ */ jsxDEV3(
        "img",
        {
          src: "https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png",
          alt: "Buy Me A Coffee",
          width: 171,
          height: 48
        },
        void 0,
        !1,
        {
          fileName: "app/src/components/Support/BuyMeACoffee.tsx",
          lineNumber: 11,
          columnNumber: 13
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "app/src/components/Support/BuyMeACoffee.tsx",
      lineNumber: 5,
      columnNumber: 9
    },
    this
  );
}
var BuyMeACoffee_default = BuyMeACoffee;

// app/src/pages/Settings.jsx
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
function Settings() {
  useResetScrollPosition_default();
  let [location, setLocation] = usePersistentState(GEOLOCATION_OPTION, !1);
  return /* @__PURE__ */ jsxDEV4("div", { className: "settings page", children: [
    /* @__PURE__ */ jsxDEV4("div", { children: [
      /* @__PURE__ */ jsxDEV4("header", { children: /* @__PURE__ */ jsxDEV4("nav", { children: /* @__PURE__ */ jsxDEV4(Link, { to: "/", children: "Home" }, void 0, !1, {
        fileName: "app/src/pages/Settings.jsx",
        lineNumber: 17,
        columnNumber: 25
      }, this) }, void 0, !1, {
        fileName: "app/src/pages/Settings.jsx",
        lineNumber: 16,
        columnNumber: 21
      }, this) }, void 0, !1, {
        fileName: "app/src/pages/Settings.jsx",
        lineNumber: 15,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV4("h1", { children: "Settings" }, void 0, !1, {
        fileName: "app/src/pages/Settings.jsx",
        lineNumber: 20,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV4("form", { children: /* @__PURE__ */ jsxDEV4("label", { children: [
        /* @__PURE__ */ jsxDEV4("span", { children: "Show my location on the map" }, void 0, !1, {
          fileName: "app/src/pages/Settings.jsx",
          lineNumber: 23,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV4("input", { type: "checkbox", checked: !!location, onChange: () => setLocation(!location) }, void 0, !1, {
          fileName: "app/src/pages/Settings.jsx",
          lineNumber: 24,
          columnNumber: 25
        }, this)
      ] }, void 0, !0, {
        fileName: "app/src/pages/Settings.jsx",
        lineNumber: 22,
        columnNumber: 21
      }, this) }, void 0, !1, {
        fileName: "app/src/pages/Settings.jsx",
        lineNumber: 21,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "app/src/pages/Settings.jsx",
      lineNumber: 14,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV4(BuyMeACoffee_default, {}, void 0, !1, {
      fileName: "app/src/pages/Settings.jsx",
      lineNumber: 28,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "app/src/pages/Settings.jsx",
    lineNumber: 13,
    columnNumber: 9
  }, this);
}
var Settings_default = Settings;

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Main_default
});

// app/src/pages/Main.tsx
import { useRef, useState as useState7, useEffect as useEffect8, useCallback as useCallback2 } from "react";
import { Link as Link2 } from "react-router-dom";

// app/src/components/Header/ExternalLinkIcon.tsx
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
var ExternalLinkIcon = () => /* @__PURE__ */ jsxDEV5(
  "svg",
  {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ jsxDEV5(
        "path",
        {
          d: "M15.6396 7.02527H12.0181V5.02527H19.0181V12.0253H17.0181V8.47528L12.1042 13.3892L10.6899 11.975L15.6396 7.02527Z",
          fill: "blue"
        },
        void 0,
        !1,
        {
          fileName: "app/src/components/Header/ExternalLinkIcon.tsx",
          lineNumber: 10,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV5(
        "path",
        {
          d: "M10.9819 6.97473H4.98193V18.9747H16.9819V12.9747H14.9819V16.9747H6.98193V8.97473H10.9819V6.97473Z",
          fill: "blue"
        },
        void 0,
        !1,
        {
          fileName: "app/src/components/Header/ExternalLinkIcon.tsx",
          lineNumber: 14,
          columnNumber: 13
        },
        this
      )
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/src/components/Header/ExternalLinkIcon.tsx",
    lineNumber: 3,
    columnNumber: 9
  },
  this
), ExternalLinkIcon_default = ExternalLinkIcon;

// app/src/components/Header/HeaderContent.tsx
import { Fragment, jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
function Header(props) {
  let { node } = props, { title, byline } = node, href = `https://en.wikivoyage.org/wiki/${title}`, trimmedByline = byline?.startsWith(title) ? byline.slice(title.length).trimStart() : byline;
  return /* @__PURE__ */ jsxDEV6(Fragment, { children: [
    /* @__PURE__ */ jsxDEV6("a", { href, target: "_blank", rel: "noreferrer", children: [
      title,
      /* @__PURE__ */ jsxDEV6(ExternalLinkIcon_default, {}, void 0, !1, {
        fileName: "app/src/components/Header/HeaderContent.tsx",
        lineNumber: 22,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "app/src/components/Header/HeaderContent.tsx",
      lineNumber: 20,
      columnNumber: 13
    }, this),
    trimmedByline
  ] }, void 0, !0, {
    fileName: "app/src/components/Header/HeaderContent.tsx",
    lineNumber: 19,
    columnNumber: 9
  }, this);
}
var HeaderContent_default = Header;

// app/src/components/Header/EmptyHeaderContent.tsx
import { jsxDEV as jsxDEV7 } from "react/jsx-dev-runtime";
function EmptyHeaderContent() {
  return /* @__PURE__ */ jsxDEV7("h1", { children: "Click a location to see where you could go next" }, void 0, !1, {
    fileName: "app/src/components/Header/EmptyHeaderContent.tsx",
    lineNumber: 3,
    columnNumber: 9
  }, this);
}

// app/src/components/Header/VerboseHeader.tsx
import { jsxDEV as jsxDEV8 } from "react/jsx-dev-runtime";
function VerboseHeader(props) {
  return /* @__PURE__ */ jsxDEV8("h1", { children: [
    "Where to go after ",
    props.nodeTitle
  ] }, void 0, !0, {
    fileName: "app/src/components/Header/VerboseHeader.tsx",
    lineNumber: 10,
    columnNumber: 9
  }, this);
}

// app/src/components/Header/index.tsx
import { jsxDEV as jsxDEV9 } from "react/jsx-dev-runtime";
function Header2(props) {
  let { verbose, nodeTitle, node } = props;
  return node ? /* @__PURE__ */ jsxDEV9("header", { children: [
    verbose && nodeTitle && /* @__PURE__ */ jsxDEV9(VerboseHeader, { nodeTitle }, void 0, !1, {
      fileName: "app/src/components/Header/index.tsx",
      lineNumber: 26,
      columnNumber: 38
    }, this),
    /* @__PURE__ */ jsxDEV9(HeaderContent_default, { node }, void 0, !1, {
      fileName: "app/src/components/Header/index.tsx",
      lineNumber: 27,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "app/src/components/Header/index.tsx",
    lineNumber: 25,
    columnNumber: 9
  }, this) : /* @__PURE__ */ jsxDEV9("header", { children: /* @__PURE__ */ jsxDEV9(EmptyHeaderContent, {}, void 0, !1, {
    fileName: "app/src/components/Header/index.tsx",
    lineNumber: 19,
    columnNumber: 17
  }, this) }, void 0, !1, {
    fileName: "app/src/components/Header/index.tsx",
    lineNumber: 18,
    columnNumber: 13
  }, this);
}
var Header_default = Header2;

// app/src/components/Connections/index.tsx
import { jsxDEV as jsxDEV10 } from "react/jsx-dev-runtime";
function Connections(props) {
  let { verbose, activeNode, activeEdges, hoverNode, onClick, onMouseEnter, onMouseLeave } = props, activeTitle = activeNode?.title, hoverTitle = hoverNode?.title, titles = activeEdges?.map((edge) => [edge.origin.title, edge.destination.title]).flat().filter((title) => title !== activeTitle), sortedTitles = [...new Set(titles)].sort();
  return /* @__PURE__ */ jsxDEV10("div", { className: "connections", children: [
    verbose && activeNode?.title && /* @__PURE__ */ jsxDEV10("p", { style: { textAlign: "center" }, children: [
      "After visiting ",
      activeNode.title,
      " you could go next to"
    ] }, void 0, !0, {
      fileName: "app/src/components/Connections/index.tsx",
      lineNumber: 31,
      columnNumber: 17
    }, this),
    /* @__PURE__ */ jsxDEV10("ul", { children: titles?.map((title) => /* @__PURE__ */ jsxDEV10("li", { children: /* @__PURE__ */ jsxDEV10(
      "button",
      {
        className: title === hoverTitle ? "active" : "",
        onClick: () => onClick(title),
        onMouseEnter: () => onMouseEnter(title),
        onMouseLeave,
        children: title
      },
      void 0,
      !1,
      {
        fileName: "app/src/components/Connections/index.tsx",
        lineNumber: 38,
        columnNumber: 25
      },
      this
    ) }, title, !1, {
      fileName: "app/src/components/Connections/index.tsx",
      lineNumber: 37,
      columnNumber: 21
    }, this)) }, void 0, !1, {
      fileName: "app/src/components/Connections/index.tsx",
      lineNumber: 35,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "app/src/components/Connections/index.tsx",
    lineNumber: 28,
    columnNumber: 9
  }, this);
}
var Connections_default = Connections;

// app/src/hooks/useGeolocation.ts
import { useEffect as useEffect3, useState as useState2 } from "react";
function useGeolocation() {
  let [enabled] = usePersistentState(GEOLOCATION_OPTION, !1), [position, setPosition] = useState2();
  return useEffect3(() => {
    if (!enabled)
      return;
    let onSuccess = ({ coords }) => {
      let { latitude, longitude } = coords;
      setPosition({ latitude, longitude });
    }, watcherId = navigator.geolocation.watchPosition(onSuccess);
    return () => navigator.geolocation.clearWatch(watcherId);
  }, [enabled]), position;
}
var useGeolocation_default = useGeolocation;

// app/src/hooks/useWorldNodes.ts
import { useState as useState3, useEffect as useEffect4 } from "react";
var useWorldNodes = (nodeId) => {
  let [loading, setLoading] = useState3(!0), [nodes, setNodes] = useState3({});
  return useEffect4(() => {
    fetch("world_edges.json", { credentials: "include", mode: "no-cors" }).then((response) => response.json()).then((json) => {
      setNodes((prev) => ({
        ...json,
        ...prev
      })), setLoading(!1);
    });
  }, []), useEffect4(() => {
    if (!nodeId || nodes[nodeId])
      return;
    setLoading(!0);
    let firstThreeChars = nodeId.slice(0, 3);
    fetch(`nodes/${firstThreeChars}.json`).then((response) => response.json()).then((loadedNodes) => (setNodes((prev) => ({
      ...loadedNodes,
      ...prev
    })), setLoading(!1), loadedNodes[nodeId].edges)).then((relatedNodeIds) => {
      relatedNodeIds.forEach((relatedNodeId) => {
        if (nodes[relatedNodeId])
          return;
        let firstThreeChars2 = relatedNodeId.slice(0, 3);
        fetch(`nodes/${firstThreeChars2}.json`).then((response) => response.json()).then((loadedNodes) => {
          setNodes((prev) => ({
            ...loadedNodes,
            ...prev
          }));
        });
      });
    });
  }, [nodeId]), {
    loadingNodes: loading,
    nodes
  };
}, useWorldNodes_default = useWorldNodes;

// app/src/hooks/useActiveWikivoyagePage.ts
import { useEffect as useEffect5, useState as useState4 } from "react";

// app/src/utils.ts
function getFormattedName(title) {
  return title.replace(/ /g, "_").replace(/&/g, "%26");
}
function parseFormattedName(title) {
  return title.replace(/_/g, " ").replace(/%26/g, "&");
}

// app/src/hooks/useActiveWikivoyagePage.ts
function useActiveWikivoyagePage() {
  let [loadingActiveId, setLoadingActiveId] = useState4(!0), [activeId, _setActiveId] = usePersistentState("activeId", ""), [isFreshSession, setIsFreshSession] = useState4(!1);
  return useEffect5(() => {
    let slug = window.location.hash.slice(1) || window.location.pathname.slice(1);
    if (setLoadingActiveId(!1), !slug)
      return;
    let id = parseFormattedName(decodeURIComponent(slug));
    _setActiveId(id), setIsFreshSession(!0);
  }, [_setActiveId]), {
    loadingActiveId,
    activeId,
    setActiveId: (id) => {
      let cleanId = getFormattedName(id), newUrl = window.location.origin + "#" + cleanId;
      window.history.replaceState(null, "", newUrl), _setActiveId(id), setIsFreshSession(!1);
    },
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
var capitals = new Set(capitals_default.capitals), capitals_default2 = capitals;

// app/src/components/Meta/Description.tsx
import { useEffect as useEffect6, useState as useState5 } from "react";
function MetaDescription({ node }) {
  let [done, setDone] = useState5(!1);
  return useEffect6(() => {
    if (done || !node?.title)
      return;
    let description = node.edges.length > 1 ? `Want to know where to go after visiting ${node.title}? Discover ${node.edges.length} different places to go after ${node.title}.` : `Find out where to go after visiting ${node.title}`, metaTag = document.createElement("meta");
    metaTag.setAttribute("name", "description"), metaTag.setAttribute("content", description), document.head.append(metaTag), setDone(!0);
  }, [node]), null;
}

// app/src/components/Meta/Title.tsx
import { useEffect as useEffect7 } from "react";
function MetaTitle({ node }) {
  return useEffect7(() => {
    node?.title && (document.title = `${node.title} | where u going`);
  }, [node]), null;
}

// app/src/pages/Main.tsx
import { ClientOnly } from "remix-utils/client-only";
import { Fragment as Fragment2, jsxDEV as jsxDEV11 } from "react/jsx-dev-runtime";
function App() {
  useResetScrollPosition_default();
  let { loadingActiveId, activeId, setActiveId, isFreshSession } = useActiveWikivoyagePage_default(), [hoverId, setHoverId] = useState7(-1), [mapBounds, setMapBounds] = useState7(INITIAL_MAP_BOUNDS), { loadingNodes, nodes } = useWorldNodes_default(activeId), geolocation = useGeolocation_default(), mapRef = useRef(null), isMapZoomedIn = mapRef.current && mapRef.current.getZoom() > 5, featureGroupRef = useRef(null), activeNode = nodes[activeId], hoverNode = nodes[hoverId], [sw_lng, sw_lat, ne_lng, ne_lat] = mapBounds.split(",").map(Number.parseFloat), visibleFocusNodeIds = activeNode ? /* @__PURE__ */ new Set([activeId, ...activeNode.edges]) : /* @__PURE__ */ new Set(), otherVisibleNodeIds = (isMapZoomedIn || activeId ? [...capitals_default2, ...Object.keys(nodes)] : [...capitals_default2]).filter((title) => !visibleFocusNodeIds.has(title)).filter((title) => {
    if (!nodes[title])
      return !1;
    let { lat, lng } = nodes[title];
    return sw_lng < lng && ne_lng > lng && sw_lat < lat && ne_lat > lat;
  }), allVisibleNodeIds = new Set(
    [...visibleFocusNodeIds, ...otherVisibleNodeIds].slice(0, 199)
  ), visibleNodes = [...allVisibleNodeIds].map((title) => nodes[title]).filter(Boolean), updateVisibleNodes = useCallback2((map) => {
    map && setMapBounds(map.getBounds().toBBoxString());
  }, [setMapBounds]), activeEdges = (activeNode?.edges || []).filter((otherId) => nodes[otherId]).map((otherId) => ({
    origin: activeNode,
    destination: nodes[otherId]
  })), inactiveEdges = (Object.values(visibleNodes) || []).filter(({ title }) => title !== activeId).map(({ title }) => {
    let node = nodes[title];
    return node.edges.filter((otherId) => nodes[otherId]).map((otherId) => {
      let otherNode = nodes[otherId];
      return {
        origin: node,
        destination: otherNode
      };
    });
  }).flat().filter(({ origin, destination }) => allVisibleNodeIds.has(origin.title) && allVisibleNodeIds.has(destination.title));
  useEffect8(() => {
    let map = mapRef.current;
    if (!map)
      return;
    window.scrollTo({ top: 0 });
    let bounds = featureGroupRef.current?.getBounds();
    if (bounds?.isValid())
      map.fitBounds(bounds, { padding: [50, 50], animate: !0 });
    else {
      if (!activeNode)
        return;
      map.setView(activeNode, 12, { animate: !0 });
    }
  }, [mapRef.current, activeNode]);
  let centerMapOnGeolocation = () => {
    let map = mapRef.current;
    if (!map || !geolocation)
      return;
    let { latitude, longitude } = geolocation;
    map.setView([latitude, longitude], 12, { animate: !0 });
    let closestNode = null, closestDistance = NaN;
    for (let title in nodes) {
      let node = nodes[title], distance = map.distance(node, { lat: latitude, lng: longitude });
      closestDistance < distance || (closestNode = node, closestDistance = distance);
    }
    let newActiveNodeId = closestNode ? closestNode.title : "";
    setActiveId(newActiveNodeId);
  };
  return /* @__PURE__ */ jsxDEV11(Fragment2, { children: [
    /* @__PURE__ */ jsxDEV11(MetaTitle, { node: activeNode }, void 0, !1, {
      fileName: "app/src/pages/Main.tsx",
      lineNumber: 147,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV11(MetaDescription, { node: activeNode }, void 0, !1, {
      fileName: "app/src/pages/Main.tsx",
      lineNumber: 148,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV11("div", { className: "App", children: [
      /* @__PURE__ */ jsxDEV11("div", { style: { height: "100%", maxHeight: "75svh", display: "flex", flexDirection: "column" }, children: [
        !loadingNodes && /* @__PURE__ */ jsxDEV11(
          Header_default,
          {
            nodeTitle: activeId,
            node: activeNode,
            verbose: isFreshSession
          },
          void 0,
          !1,
          {
            fileName: "app/src/pages/Main.tsx",
            lineNumber: 153,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV11(ClientOnly, { fallback: /* @__PURE__ */ jsxDEV11("p", { children: "fallback" }, void 0, !1, {
          fileName: "app/src/pages/Main.tsx",
          lineNumber: 159,
          columnNumber: 31
        }, this), children: () => /* @__PURE__ */ jsxDEV11("p", { children: "client" }, void 0, !1, {
          fileName: "app/src/pages/Main.tsx",
          lineNumber: 161,
          columnNumber: 19
        }, this) }, void 0, !1, {
          fileName: "app/src/pages/Main.tsx",
          lineNumber: 159,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "app/src/pages/Main.tsx",
        lineNumber: 150,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV11(
        Connections_default,
        {
          verbose: isFreshSession,
          activeNode,
          activeEdges,
          hoverNode,
          onClick: setActiveId,
          onMouseEnter: setHoverId,
          onMouseLeave: () => setHoverId(-1)
        },
        void 0,
        !1,
        {
          fileName: "app/src/pages/Main.tsx",
          lineNumber: 179,
          columnNumber: 7
        },
        this
      ),
      /* @__PURE__ */ jsxDEV11("footer", { children: [
        /* @__PURE__ */ jsxDEV11("div", { className: "links", children: [
          /* @__PURE__ */ jsxDEV11(Link2, { to: "settings", children: "Settings" }, void 0, !1, {
            fileName: "app/src/pages/Main.tsx",
            lineNumber: 190,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV11(Link2, { to: "about", children: "About" }, void 0, !1, {
            fileName: "app/src/pages/Main.tsx",
            lineNumber: 193,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/src/pages/Main.tsx",
          lineNumber: 189,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV11(BuyMeACoffee_default, {}, void 0, !1, {
          fileName: "app/src/pages/Main.tsx",
          lineNumber: 197,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "app/src/pages/Main.tsx",
        lineNumber: 188,
        columnNumber: 7
      }, this)
    ] }, void 0, !0, {
      fileName: "app/src/pages/Main.tsx",
      lineNumber: 149,
      columnNumber: 5
    }, this)
  ] }, void 0, !0, {
    fileName: "app/src/pages/Main.tsx",
    lineNumber: 146,
    columnNumber: 5
  }, this);
}
var Main_default = App;

// app/routes/about.tsx
var about_exports = {};
__export(about_exports, {
  default: () => About_default
});

// app/src/pages/About.tsx
import { Link as Link3 } from "react-router-dom";
import { jsxDEV as jsxDEV12 } from "react/jsx-dev-runtime";
var About = () => /* @__PURE__ */ jsxDEV12("div", { className: "page", children: [
  /* @__PURE__ */ jsxDEV12("div", { children: [
    /* @__PURE__ */ jsxDEV12("header", { children: /* @__PURE__ */ jsxDEV12("nav", { children: /* @__PURE__ */ jsxDEV12(Link3, { to: "/", children: "Home" }, void 0, !1, {
      fileName: "app/src/pages/About.tsx",
      lineNumber: 10,
      columnNumber: 25
    }, this) }, void 0, !1, {
      fileName: "app/src/pages/About.tsx",
      lineNumber: 9,
      columnNumber: 21
    }, this) }, void 0, !1, {
      fileName: "app/src/pages/About.tsx",
      lineNumber: 8,
      columnNumber: 17
    }, this),
    /* @__PURE__ */ jsxDEV12("main", { children: [
      /* @__PURE__ */ jsxDEV12("h1", { children: "About" }, void 0, !1, {
        fileName: "app/src/pages/About.tsx",
        lineNumber: 14,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV12("p", { children: [
        "This website is a simple map that I made for myself. Each point on the map is a page from ",
        /* @__PURE__ */ jsxDEV12("a", { href: "https://www.wikivoyage.org/", rel: "noopener noreferrer", target: "_blank", children: "https://www.wikivoyage.org/" }, void 0, !1, {
          fileName: "app/src/pages/About.tsx",
          lineNumber: 17,
          columnNumber: 115
        }, this),
        ', and all of the suggestions for where to go next come from the "Go next" section of that page.'
      ] }, void 0, !0, {
        fileName: "app/src/pages/About.tsx",
        lineNumber: 16,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV12("p", { children: [
        "The source code for this website is available ",
        /* @__PURE__ */ jsxDEV12("a", { href: `https://github.com/wginsberg/wikivoyage-app
`, rel: "noopener noreferrer", target: "_blank", children: "here on Github" }, void 0, !1, {
          fileName: "app/src/pages/About.tsx",
          lineNumber: 20,
          columnNumber: 71
        }, this),
        ". The travel information on this website is re-distributable under the ",
        /* @__PURE__ */ jsxDEV12("a", { href: "https://creativecommons.org/licenses/by-sa/3.0/", rel: "noopener noreferrer", target: "_blank", children: "Creative Commons Attribution-ShareAlike 3.0 licence" }, void 0, !1, {
          fileName: "app/src/pages/About.tsx",
          lineNumber: 21,
          columnNumber: 134
        }, this),
        " and attribution should be given back directly to Wikivoyage."
      ] }, void 0, !0, {
        fileName: "app/src/pages/About.tsx",
        lineNumber: 19,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV12("p", { children: [
        "If you have questions or feedback you can reach me ",
        /* @__PURE__ */ jsxDEV12("a", { href: "mailto:will.j.ginsberg@gmail.com?subject=whereugo.ing", children: "here" }, void 0, !1, {
          fileName: "app/src/pages/About.tsx",
          lineNumber: 26,
          columnNumber: 76
        }, this),
        "."
      ] }, void 0, !0, {
        fileName: "app/src/pages/About.tsx",
        lineNumber: 25,
        columnNumber: 21
      }, this)
    ] }, void 0, !0, {
      fileName: "app/src/pages/About.tsx",
      lineNumber: 13,
      columnNumber: 17
    }, this)
  ] }, void 0, !0, {
    fileName: "app/src/pages/About.tsx",
    lineNumber: 7,
    columnNumber: 13
  }, this),
  /* @__PURE__ */ jsxDEV12(BuyMeACoffee_default, {}, void 0, !1, {
    fileName: "app/src/pages/About.tsx",
    lineNumber: 30,
    columnNumber: 13
  }, this)
] }, void 0, !0, {
  fileName: "app/src/pages/About.tsx",
  lineNumber: 6,
  columnNumber: 5
}, this), About_default = About;

// app/routes/404.tsx
var __exports = {};
__export(__exports, {
  default: () => __default
});
import { ClientOnly as ClientOnly2 } from "remix-utils/client-only";
import { jsxDEV as jsxDEV13 } from "react/jsx-dev-runtime";
function __default() {
  return /* @__PURE__ */ jsxDEV13("div", { children: [
    /* @__PURE__ */ jsxDEV13("p", { children: "404" }, void 0, !1, {
      fileName: "app/routes/404.tsx",
      lineNumber: 6,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV13(ClientOnly2, { fallback: /* @__PURE__ */ jsxDEV13("p", { children: "Fallback" }, void 0, !1, {
      fileName: "app/routes/404.tsx",
      lineNumber: 7,
      columnNumber: 35
    }, this), children: () => /* @__PURE__ */ jsxDEV13("p", { children: "Client code" }, void 0, !1, {
      fileName: "app/routes/404.tsx",
      lineNumber: 9,
      columnNumber: 23
    }, this) }, void 0, !1, {
      fileName: "app/routes/404.tsx",
      lineNumber: 7,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/404.tsx",
    lineNumber: 5,
    columnNumber: 9
  }, this);
}

// app/routes/$.tsx
var __exports2 = {};
__export(__exports2, {
  default: () => Main_default
});

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-FXY5YI2Z.js", imports: ["/build/_shared/chunk-2FQXHUTK.js", "/build/_shared/chunk-B7ZTPHPC.js", "/build/_shared/chunk-UI5Z6CPU.js", "/build/_shared/chunk-LTW3UDJL.js", "/build/_shared/chunk-HBWSAMQU.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-XGOTYLZ5.js", "/build/_shared/chunk-7M6SC7J5.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-JHXF5FVQ.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/$": { id: "routes/$", parentId: "root", path: "*", index: void 0, caseSensitive: void 0, module: "/build/routes/$-LB6SLJVW.js", imports: ["/build/_shared/chunk-LLERIEMI.js", "/build/_shared/chunk-IBWQ2DCL.js", "/build/_shared/chunk-GTEQ2YK4.js", "/build/_shared/chunk-HUMSMAX5.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/404": { id: "routes/404", parentId: "root", path: "404", index: void 0, caseSensitive: void 0, module: "/build/routes/404-BS6XFZBC.js", imports: ["/build/_shared/chunk-HUMSMAX5.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-4E5KYC5K.js", imports: ["/build/_shared/chunk-LLERIEMI.js", "/build/_shared/chunk-IBWQ2DCL.js", "/build/_shared/chunk-GTEQ2YK4.js", "/build/_shared/chunk-HUMSMAX5.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/about": { id: "routes/about", parentId: "root", path: "about", index: void 0, caseSensitive: void 0, module: "/build/routes/about-RAKYIJ4J.js", imports: ["/build/_shared/chunk-GTEQ2YK4.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/settings": { id: "routes/settings", parentId: "root", path: "settings", index: void 0, caseSensitive: void 0, module: "/build/routes/settings-AAKDHZ3O.js", imports: ["/build/_shared/chunk-IBWQ2DCL.js", "/build/_shared/chunk-GTEQ2YK4.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "c9c92079", hmr: { runtime: "/build/_shared/chunk-HBWSAMQU.js", timestamp: 1717543600094 }, url: "/build/manifest-C9C92079.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1, unstable_singleFetch: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/settings": {
    id: "routes/settings",
    parentId: "root",
    path: "settings",
    index: void 0,
    caseSensitive: void 0,
    module: settings_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: about_exports
  },
  "routes/404": {
    id: "routes/404",
    parentId: "root",
    path: "404",
    index: void 0,
    caseSensitive: void 0,
    module: __exports
  },
  "routes/$": {
    id: "routes/$",
    parentId: "root",
    path: "*",
    index: void 0,
    caseSensitive: void 0,
    module: __exports2
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
