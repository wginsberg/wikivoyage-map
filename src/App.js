import { useRef, useState, useEffect, useCallback } from 'react';
import { MapContainer, FeatureGroup, Pane } from 'react-leaflet'
import { Link } from "react-router-dom"
import Protomaps from './components/Map/Protomaps/index.js'
import MarkerSet from './components/Map/MarkerSet/index.js'
import PolylineSet from './components/Map/PolylineSet/index.js'
import DeviceGeolocation from "./components/Map/DeviceGeolocation/index.js"
import GeolocationButton from './components/Map/GeolocationButton/index.js';
import Header from './components/Header/index.js'
import Connections from './components/Connections/index.js'
import useResetScrollPosition from "./hooks/useResetScrollPosition.js"
import usePersistentState from './hooks/usePersistentState.js';
import useGeolocation from './hooks/useGeolocation.js';

import nodes from "./world.json"

import L from "leaflet"

function DoubleTapDragInitHook() {
  var timer = null;
  var fired = false;
  var lastTimestamp = null;
  var DOUBLE_CLICK_TIMEOUT = 500;
  var WAIT_FOR_DRAG_END_TIMEOUT = 100;

  this._container.addEventListener('touchstart', L.Util.bind(function (e) {
    if (e.touches.length !== 1) {
      return;
    }
    var now = Date.now();
    if (lastTimestamp) {
      if (now - lastTimestamp < DOUBLE_CLICK_TIMEOUT) {
        timer = setTimeout(L.Util.bind(function () {
          this.fire('doubletapdragstart', e);
          timer = null;
          fired = true;
        }, this), WAIT_FOR_DRAG_END_TIMEOUT);
      }
      lastTimestamp = null;
    } else {
      const isMapTouch = e.target.id === "map"
      if (!isMapTouch) return

      L.Util.cancelAnimFrame(this._animRequest);

      lastTimestamp = Date.now();
      setTimeout(L.Util.bind(function () {
        lastTimestamp = null;
      }, this), DOUBLE_CLICK_TIMEOUT);
    }
  }, this));

  this._container.addEventListener('touchend', L.Util.bind(function (e) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (fired) {
      this.fire('doubletapdragend', e);
      fired = null;
    }
  }, this));

  this._container.addEventListener('touchmove', L.Util.bind(function (e) {
    if (!fired) {
      return;
    }

    this.fire('doubletapdrag', e);
  }, this));
}

L.Map.addInitHook(DoubleTapDragInitHook);

L.Map.mergeOptions({
  doubleTapDragZoom: L.Browser.touch && !L.Browser.android23,
  doubleTapDragZoomOptions: {
    reverse: false,
  },
});

var DoubleTapDragZoom = L.Handler.extend({
  addHooks: function () {
    this._map.on('doubletapdragstart', this._onDoubleTapDragStart, this);
    this._map.on('doubletapdrag', this._onDoubleTapDrag, this);
    this._map.on('doubletapdragend', this._onDoubleTapDragEnd, this);
    L.DomEvent.on(this._map._container, 'touchmove', this._onDragging, this);
  },

  removeHooks: function () {
    this._map.off('doubletapdragstart', this._onDoubleTapDragStart, this);
    this._map.off('doubletapdrag', this._onDoubleTapDrag, this);
    this._map.off('doubletapdragend', this._onDoubleTapDragEnd, this);
  },

  _onDoubleTapDragStart: function (e) {
    var map = this._map;
    if (!e.touches || e.touches.length !== 1 || map._animatingZoom) { return; }

    var p = map.mouseEventToContainerPoint(e.touches[0]);
    this._startPointY = p.y;
    this._startPoint = p;

    this._centerPoint = map.getSize()._divideBy(2);

    if (map.options.doubleTapDragZoom === 'center') {
      this._startLatLng = map.containerPointToLatLng(this._centerPoint);
    } else {
      this._startLatLng = map.containerPointToLatLng(p);
    }

    this._startZoom = map.getZoom();

    map._stop();
    map._moveStart(true, false);
    this._doubleTapDragging = true;
  },

  _onDoubleTapDrag: function (e) {
    if (!e.touches || e.touches.length !== 1) { return; }

    var map = this._map;
    var reverse = this._map.options.doubleTapDragZoomOptions.reverse;
    var p = map.mouseEventToContainerPoint(e.touches[0]);

    if (p.y <= 0) {
      return;
    }

    var distance = reverse ? p.y - this._startPointY : this._startPointY - p.y;

    var scale = Math.pow(Math.E, distance / 200);

    if (scale === 1) { return; }

    this._zoom = map.getScaleZoom(scale, this._startZoom);

    if (map.options.doubleTapDragZoom === 'center') {
      this._center = this._startLatLng;
    } else {
      var delta =
        L.point(this._startPoint.x, p.y)
          ._add(this._startPoint)
          .divideBy(2)
          ._subtract(this._centerPoint);

      this._center = map.unproject(map.project(this._startLatLng, this._zoom).subtract(delta), this._zoom);
    }

    L.Util.cancelAnimFrame(this._animRequest);

    var moveFn = L.Util.bind(map._move, map, this._center, this._zoom, {pinch: true, round: false});
    this._animRequest = L.Util.requestAnimFrame(moveFn, this, true);
  },

  _onDoubleTapDragEnd: function (e) {
    this._doubleTapDragging = false;

    if (!this._center) { return; }
    L.Util.cancelAnimFrame(this._animRequest);

    // Pinch updates GridLayers' levels only when zoomSnap is off, so zoomSnap becomes noUpdate.
    if (this._map.options.zoomAnimation) {
      this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), true, this._map.options.zoomSnap);
    } else {
      this._map._resetView(this._center, this._map._limitZoom(this._zoom));
    }

    this._center = null;
  },

  _onDragging: function (e) {
    if (this._doubleTapDragging) {
      L.DomEvent.preventDefault(e);
      L.DomEvent.stopPropagation(e);
    }
  }
});

L.Map.addInitHook('addHandler', 'doubleTapDragZoom', DoubleTapDragZoom);



const MAX_VISIBLE_NODES = 150
const INITIAL_MAP_BOUNDS = "-275.62500000000006,-86.69798221404793,243.98437500000003,87.38445679076668"
const MAX_BOUNDS = [[-360, -360], [360, 360]]
const MIN_ZOOM = 1
const MAX_ZOOM = 12

function App() {
  useResetScrollPosition()
  const [activeId, setActiveId] = usePersistentState("activeId")
  const [hoverId, setHoverId] = useState(-1)
  const [mapBounds, setMapBounds] = useState(INITIAL_MAP_BOUNDS)
  const geolocation = useGeolocation()

  const mapRef = useRef()
  const featureGroupRef = useRef()

  const activeNode = nodes[activeId]
  const hoverNode = nodes[hoverId]

  const [sw_lng, sw_lat, ne_lng, ne_lat] = mapBounds.split(",")
  const visibleFocusNodeIds = activeNode
    ? new Set([activeId, ...activeNode.edges])
    : new Set()
  const otherVisibleNodeIds = Object.keys(nodes)
    .filter(title => !visibleFocusNodeIds.has(title))
    .filter(title => {
      // Avoid rendering nodes that are out of view
      const { lat, lng } = nodes[title]
      return sw_lng < lng && ne_lng > lng && sw_lat < lat && ne_lat > lat
    }).filter(title => {
      // Avoid rendering unconnected nodes at low zoom levels
      if (!mapRef.current) return true
      if (mapRef.current.getZoom() > 5) return true
      return nodes[title].edges.length > 1
    })
  const allVisibleNodeIds = [...visibleFocusNodeIds, ...otherVisibleNodeIds]
    .slice(0, MAX_VISIBLE_NODES)
    |> new Set(#)
  const visibleNodes = [...allVisibleNodeIds]
    .map(title => nodes[title])

  const updateVisibleNodes = useCallback(map => {
    if (!map) return
    setMapBounds(map.getBounds().toBBoxString())
  }, [setMapBounds])

  const activeEdges = (activeNode?.edges || [])
    .map(otherId => ({
      origin: activeNode,
      destination: nodes[otherId]
    }))
  const inactiveEdges = (Object.values(visibleNodes) || [])
      .filter(({ title }) => title !== activeId)
      .map(({ title }) => {
          const node = nodes[title]
          return node.edges
            .filter(otherId => nodes[otherId])
            .map(otherId => {
              const otherNode = nodes[otherId]
              return {
                origin: node,
                destination: otherNode
              }
            })
      })
      .flat()
      .filter(({ origin, destination }) => {
        // only include edges between two visible markers
        return allVisibleNodeIds.has(origin.title) && allVisibleNodeIds.has(destination.title)
      })

    // Zoom active node and edges into view
    useEffect(() => {
      const map = mapRef.current
      if (!map) return

      // scroll to top to make header link visible
      window.scrollTo({ top: 0 });

      const bounds = featureGroupRef.current?.getBounds()
      if (bounds.isValid()) {
        // zoom to fit connected nodes
        map.fitBounds(bounds, { padding: [50, 50]})
      } else {
        // zoom to fit singleton node
        map.setView(activeNode, MAX_ZOOM)
      }
    }, [mapRef, activeNode])

    // Handle clicks on the geolocation button
    const centerMapOnGeolocation = () => {
      const map = mapRef.current
      if (!map) return

      const { latitude, longitude } = geolocation
      if (!geolocation) return

      map.setView([latitude, longitude], MAX_ZOOM)
    }

    return (
    <div className="App">
      <Header node={activeNode} />
      <MapContainer id="map" ref={mapRef} minZoom={MIN_ZOOM} maxZoom={MAX_ZOOM} maxBounds={MAX_BOUNDS} maxBoundsViscosity={1} doubleTapDragZoom='center' doubleTapDragZoomOptions={{ reverse: true }} doubleClickZoom={false}>
        <span className="loading">loading...</span>
        <Protomaps file="protomaps_vector_planet_odbl_z10.pmtiles" onBoundsChange={updateVisibleNodes} />
        <Pane name="edges" style={{ zIndex: 600 }}>
          <PolylineSet edges={inactiveEdges} />
          <FeatureGroup ref={featureGroupRef}>
            <PolylineSet edges={activeEdges} active={true} />
          </FeatureGroup>
        </Pane>
        <Pane name="nodes" style={{ zIndex: 601 }}>
          <MarkerSet
            nodes={visibleNodes}
            activeId={activeId}
            hoverId={hoverId}
            onClick={setActiveId}
            onMouseOver={setHoverId}
            onMouseOut={() => setHoverId()}
          />
        </Pane>
        <Pane>
          <DeviceGeolocation geolocation={geolocation} />
        </Pane>
        {geolocation && <GeolocationButton onClick={centerMapOnGeolocation} />}
      </MapContainer>
      <Connections
        activeNode={activeNode}
        activeEdges={activeEdges}
        hoverNode={hoverNode}
        onClick={setActiveId}
        onMouseEnter={setHoverId}
        onMouseLeave={() => setHoverId()}
      />
      <footer>
        <a className="github" href="https://github.com/wginsberg/wikivoyage-app" rel="noopener noreferrer" target="_blank">
          <img src="github-mark/github-mark.png" alt="github" width={32} />
        </a>
        <Link to="settings">
          ⚙️
        </Link>
      </footer>
    </div>
  );
}

export default App;
