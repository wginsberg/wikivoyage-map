import { useRef, useState, useEffect, useCallback } from 'react';
import { MapContainer, FeatureGroup, Pane } from 'react-leaflet'
import Protomaps from './components/Map/Protomaps/index.js'
import MarkerSet from './components/Map/MarkerSet/index.js'
import PolylineSet from './components/Map/PolylineSet/index.js'
import Header from './components/Header/index.js'
import Footer from './components/Footer/index.js'

const MAX_VISIBLE_NODES = 200
const INITIAL_MAP_BOUNDS = "-275.62500000000006,-86.69798221404793,243.98437500000003,87.38445679076668"

function App() {
  const [nodes, setNodes] = useState({})
  const [activeId, setActiveId] = useState()
  const [hoverId, setHoverId] = useState(-1)
  const [mapBounds, setMapBounds] = useState(INITIAL_MAP_BOUNDS)

  const mapRef = useRef()
  const featureGroupRef = useRef()

  useEffect(() => {
    fetch("data/world.json")
      .then(res => res.json())
      .then(setNodes)
  }, [])

  const activeNode = nodes[activeId]
  const hoverNode = nodes[hoverId]

  const [sw_lng, sw_lat, ne_lng, ne_lat] = mapBounds.split(",")
  const visibleFocusNodeIds = activeId
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

      // center map on selected node
      if (activeNode) map.setView(activeNode)

      // zoom to fit connected nodes
      const bounds = featureGroupRef.current?.getBounds()
      if (bounds.isValid()) map.fitBounds(bounds, { padding: [50, 50]})
    }, [activeNode])

  return (
    <div className="App">
      <Header node={activeNode} />
      <MapContainer id="map" ref={mapRef} maxZoom={12}>
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
      </MapContainer>
      <Footer
        activeNode={activeNode}
        activeEdges={activeEdges}
        hoverNode={hoverNode}
        onClick={setActiveId}
        onMouseEnter={setHoverId}
        onMouseLeave={() => setHoverId()}
      />
    </div>
  );
}

export default App;
