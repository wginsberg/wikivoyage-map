import { CircleMarker } from 'react-leaflet'

function MarkerSet(props) {
    const { nodes = [] } = props

    const pathOptions = {
        stroke: false,
        fillOpacity: 0.5
    }

    return nodes.map(({ title, lat, lng }) => (
        <CircleMarker
            center={{lat, lng}}
            pathOptions={pathOptions}
            key={title}
        />
    ))
}

export default MarkerSet
