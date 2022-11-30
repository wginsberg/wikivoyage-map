import { useRef, useState, useEffect, useCallback } from 'react';
import { MapContainer, FeatureGroup } from 'react-leaflet'
import Protomaps from './components/Map/Protomaps/index.js'
import MarkerSet from './components/Map/MarkerSet/index.js'
import PolylineSet from './components/Map/PolylineSet/index.js'
import Header from './components/Header/index.js'
import Footer from './components/Footer/index.js'

const MAX_VISIBLE_NODES = 100

function App() {
  const [nodes, setNodes] = useState({})
  const [activeId, setActiveId] = useState()
  const [hoverId, setHoverId] = useState(-1)
  const [mapBounds, setMapBounds] = useState("0,0,0,0")

  const activeNode = nodes[activeId]
  const hoverNode = nodes[hoverId]

  const [sw_lng, sw_lat, ne_lng, ne_lat] = mapBounds.split(",")
  const visibleNodes = Object.values(nodes)
    .filter(({ lat, lng }) => {
      return sw_lng < lng && ne_lng > lng && sw_lat < lat && ne_lat > lat
    })
    .slice(0, MAX_VISIBLE_NODES)

  useEffect(() => {
    fetch("data/world.json")
      .then(res => res.json())
      .then(setNodes)
  }, [])

  const mapRef = useRef()
  const featureGroupRef = useRef()

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
        <PolylineSet edges={inactiveEdges} />
        <FeatureGroup ref={featureGroupRef}>
          <PolylineSet edges={activeEdges} active={true} />
        </FeatureGroup>
        <MarkerSet
          nodes={visibleNodes}
          activeId={activeId}
          hoverId={hoverId}
          onClick={setActiveId}
          onMouseOver={setHoverId}
          onMouseOut={() => setHoverId()}
        />
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
