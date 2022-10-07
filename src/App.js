import { useRef, useState, useEffect } from 'react';
import { MapContainer, FeatureGroup } from 'react-leaflet'
import Protomaps from './components/Map/Protomaps/index.js'
import MarkerSet from './components/Map/MarkerSet/index.js'
import PolylineSet from './components/Map/PolylineSet/index.js'
import Header from './components/Header/index.js'
import Footer from './components/Footer/index.js'

function App() {
  const [{ nodes, edges }, setData] = useState({ nodes: [], edges: [] })
  const [activeIndex, setActiveIndex] = useState(-1)
  const [hoverIndex, setHoverIndex] = useState(-1)

  useEffect(() => {
    fetch("data/mexico.json")
      .then(res => res.json())
      .then(setData)
  }, [])

  const mapRef = useRef()
  const featureGroupRef = useRef()

  const activeNode = nodes[activeIndex]
  const hoverNode = nodes[hoverIndex]

  const activeEdges = activeNode
    ? edges.filter(({ origin, destination }) => 
        origin.title === activeNode.title || destination.title === activeNode.title
      )
    : []
  const inactiveEdges = activeNode
    ? edges.filter(({ origin, destination }) => 
        origin.title !== activeNode.title && destination.title !== activeNode.title
      )
    : edges

    // Zoom active node and edges into view
    useEffect(() => {
      const map = mapRef.current
      const bounds = featureGroupRef.current?.getBounds()
      if (!map) return
      if (activeNode) map.setView(activeNode)
      if (bounds.isValid()) map.fitBounds(bounds, { padding: [50, 50]})
    }, [activeNode])

    // event handlers

    const handleNodeClick = ({ latlng: {lat, lng} }) => {
      const nodeIndex = nodes.findIndex(node => node.lat === lat && node.lng === lng)
      setActiveIndex(nodeIndex)
    }

    const handleFooterClick = (title) => {
      const nodeIndex = nodes.findIndex(node => node.title === title)
      setActiveIndex(nodeIndex)
    }
  
    const handleFooterHover = (title) => {
      const index = nodes.findIndex(node => node.title === title)
      setHoverIndex(index)
    }
  
    const handleMarkerHover = (e) => {
      const { lat, lng } = e?.latlng || {}
      const nodeIndex = nodes.findIndex(node => node.lat === lat && node.lng === lng)
      const node = nodes[nodeIndex]
      const isConnected = node && activeEdges.find(({ origin, destination }) => 
        (origin.lat === node.lat && origin.lng === node.lng) ||
        (destination.lat === node.lat && destination.lng === node.lng)
      )
      if (isConnected) {
        setHoverIndex(nodeIndex)
      } else {
        setHoverIndex(-1)
      }
    }

  return (
    <div className="App">
      <Header node={activeNode} />
      <MapContainer id="map" ref={mapRef} maxZoom={12}>
        <Protomaps url="mexico.pmtiles"/>
        <PolylineSet edges={inactiveEdges} />
        <FeatureGroup ref={featureGroupRef}>
          <PolylineSet edges={activeEdges} active={true} />
        </FeatureGroup>
        <MarkerSet
          nodes={nodes}
          activeIndex={activeIndex}
          hoverIndex={hoverIndex}
          onClick={handleNodeClick}
          onMouseOver={handleMarkerHover}
          onMouseOut={() => handleMarkerHover({})}
        />
      </MapContainer>
      <Footer
        activeNode={activeNode}
        activeEdges={activeEdges}
        hoverNode={hoverNode}
        onClick={handleFooterClick}
        onMouseEnter={handleFooterHover}
        onMouseLeave={handleFooterHover}
      />
    </div>
  );
}

export default App;
