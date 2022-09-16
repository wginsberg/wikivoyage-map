import { useEffect, useState } from 'react'
import { MapContainer } from 'react-leaflet'
import Protomaps from './Protomaps/index.js'
import MarkerSet from './MarkerSet/index.js'
import PolylineSet from './PolylineSet/index.js'

function Map() {
  const [data, setData] = useState({})
  useEffect(() => {
    fetch("data/mexico.json")
      .then(res => res.json())
      .then(setData)
  }, [])

  const { nodes, edges } = data

  return (
    <MapContainer id="map">
      <Protomaps />
      <PolylineSet edges={edges} />
      <MarkerSet nodes={nodes} />
    </MapContainer>
  );
}

export default Map;
