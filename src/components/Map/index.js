// import { useMap, useLeaflet, useProtomaps, useRenderMap } from './hooks.js'
import { MapContainer } from 'react-leaflet'
import Protomaps from './Protomaps/index.js'

function Map() {
  return (
    <MapContainer id="map">
      <Protomaps />
    </MapContainer>
  );
}

export default Map;
