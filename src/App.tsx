import React, { useRef, useState, useEffect, useCallback } from 'react';
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
import useGeolocation from './hooks/useGeolocation.ts';
import BuyMeACoffee from './components/Support/BuyMeACoffee.tsx';

// TODO refactor out these imports
import L, { Map as LeafletMap, FeatureGroup as LeafletFeatureGroup, LatLngTuple } from 'leaflet';
import 'leaflet-doubletapdrag';
import 'leaflet-doubletapdragzoom';

import nodes from "./nodes.ts"
import useActiveWikivoyagePage from './hooks/useActiveWikivoyagePage.ts';

const MAX_VISIBLE_NODES = 150
const INITIAL_MAP_BOUNDS = "-275.62500000000006,-86.69798221404793,243.98437500000003,87.38445679076668"
const MAX_BOUNDS = [[-360, -360], [360, 360]] as LatLngTuple[]
const MIN_ZOOM = 1
const MAX_ZOOM = 12

function App() {
  useResetScrollPosition()
  const [activeId, setActiveId] = useActiveWikivoyagePage()
  const [hoverId, setHoverId] = useState(-1)
  const [mapBounds, setMapBounds] = useState(INITIAL_MAP_BOUNDS)
  const geolocation = useGeolocation()

  const mapRef = useRef<LeafletMap>(null)
  const featureGroupRef = useRef<LeafletFeatureGroup<any>>(null)

  const activeNode = nodes[activeId]
  const hoverNode = nodes[hoverId]

  const [sw_lng, sw_lat, ne_lng, ne_lat] = mapBounds
    .split(",")
    .map(Number.parseFloat)
  const visibleFocusNodeIds: Set<string> = activeNode
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
  const allVisibleNodeIds = new Set(
    [...visibleFocusNodeIds, ...otherVisibleNodeIds]
      .slice(0, MAX_VISIBLE_NODES)
  )
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
      if (bounds?.isValid()) {
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

      if (!geolocation) return
      const { latitude, longitude } = geolocation

      map.setView([latitude, longitude], MAX_ZOOM)
    }

    return (
    <div className="App">
      <Header node={activeNode} />
      {/* @ts-ignore: TS2322: Can't pass props doubleTapDragZoom, doubleTapDragZoomOptions, doubleClickZoom */}
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
            onMouseOut={() => setHoverId(-1)}
          />
        </Pane>
        <Pane name="geolocation">
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
        onMouseLeave={() => setHoverId(-1)}
      />
      <footer>
        <div className="links">
          <a className="github" href="https://github.com/wginsberg/wikivoyage-app" rel="noopener noreferrer" target="_blank">
            <img src="github-mark/github-mark.png" alt="github" width={48} height={48} />
          </a>
          <Link to="settings">
            ⚙️
          </Link>
        </div>
        <BuyMeACoffee />
      </footer>
    </div>
  );
}

export default App;
