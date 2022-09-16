import { CircleMarker } from 'react-leaflet'

function MarkerSet(props) {
    const { nodes = [], active = false, onClick } = props

    const pathOptions = {
        inactive: {
            stroke: false,
            color: 'blue',
            fillOpacity: 0.2
        },
        active: {
            stroke: false,
            color: 'green',
            fillOpacity: 0.8
        }
    }

    const eventHandlers = onClick
    ? { click: onClick }
    : {}

    return nodes.map(({ title, lat, lng }, i) => (
        <CircleMarker
            center={{lat, lng}}
            pathOptions={active ? pathOptions.active: pathOptions.inactive}
            eventHandlers={eventHandlers}
            key={title}
        />
    ))
}

export default MarkerSet
