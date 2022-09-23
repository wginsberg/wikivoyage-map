import { useRef, useState, useEffect } from 'react';
import { MapContainer, FeatureGroup } from 'react-leaflet'
import Protomaps from './components/Map/Protomaps/index.js'
import MarkerSet from './components/Map/MarkerSet/index.js'
import PolylineSet from './components/Map/PolylineSet/index.js'
import Header from './components/Header/index.js'
import Footer from './components/Footer/index.js'

function App() {
  const [{ nodes, edges }, setData] = useState({ nodes: [], edges: [] })
  const [selectedIndex, setSelectedIndex] = useState(-1)

  useEffect(() => {
    fetch("data/mexico.json")
      .then(res => res.json())
      .then(setData)
  }, [])

  const mapRef = useRef()
  const featureGroupRef = useRef()

  const handleClick = ({ latlng: {lat, lng} }) => {
    const nodeIndex = nodes.findIndex(node => node.lat === lat && node.lng === lng)
    setSelectedIndex(nodeIndex)
  }

  const activeNode = nodes[selectedIndex]
  const activeNodes = activeNode ? [activeNode] : []
  const inactiveNodes = selectedIndex === -1
    ? nodes
    : [...nodes.slice(0, selectedIndex), ...nodes.slice(selectedIndex + 1)]

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

  return (
    <div className="App">
      <Header node={activeNode} />
      <MapContainer id="map" ref={mapRef}>
        <Protomaps />
        <PolylineSet edges={inactiveEdges} />
        <FeatureGroup ref={featureGroupRef}>
          <PolylineSet edges={activeEdges} active={true} />
        </FeatureGroup>
        <MarkerSet
          nodes={inactiveNodes}
          onClick={handleClick}
        />
        <MarkerSet
          nodes={activeNodes}
          active={true}
        />
      </MapContainer>
      <Footer activeNode={activeNode} activeEdges={activeEdges} />
    </div>
  );
}

export default App;
