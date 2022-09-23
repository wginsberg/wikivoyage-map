import { CircleMarker } from 'react-leaflet'

const DEFAULT_PATH_OPTIONS = {
    stroke: false,
    color: 'blue',
    fillOpacity: 0.2
}

const ACTIVE_PATH_OPTIONS = {
    stroke: false,
    color: 'green',
    fillOpacity: 0.8
}

const HOVER_PATH_OPTIONS = {
    stroke: true
}

function getPathOptions(index, activeIndex, hoverIndex) {
    const active = index === activeIndex
    const hover = index === hoverIndex

    return {
        ...DEFAULT_PATH_OPTIONS,
        ...(active ? ACTIVE_PATH_OPTIONS : {}),
        ...(hover ? HOVER_PATH_OPTIONS : {})
    }
}

function MarkerSet(props) {
    const { nodes = [], activeIndex = -1, hoverIndex = -1, onClick, onMouseOver, onMouseOut } = props

    const eventHandlers = onClick
        ? { click: onClick, mouseover: onMouseOver, mouseout: onMouseOut }
        : {}

    return nodes.map(({ title, lat, lng }, i) => (
        <CircleMarker
            center={{lat, lng}}
            pathOptions={getPathOptions(i, activeIndex, hoverIndex)}
            eventHandlers={eventHandlers}
            key={title}
        />
    ))
}

export default MarkerSet
