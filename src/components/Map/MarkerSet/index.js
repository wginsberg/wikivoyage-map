import { CircleMarker } from 'react-leaflet'

const DEFAULT_PATH_OPTIONS = {
    radius: 10,
    stroke: false,
    fill: true,
    color: 'blue',
    fillOpacity: 0.2,
}

const ACTIVE_PATH_OPTIONS = {
    color: 'green',
    fillOpacity: 0.8
}

const HOVER_PATH_OPTIONS = {
    radius: 15,
    fillOpacity: 0.5,
    weight: 16,
    color: 'orange'
}

function getPathOptions(title, activeId, hoverId) {
    const active = title === activeId
    const hover = title === hoverId

    return {
        ...DEFAULT_PATH_OPTIONS,
        ...(active ? ACTIVE_PATH_OPTIONS : hover ? HOVER_PATH_OPTIONS : {}),
    }
}

function MarkerSet(props) {
    const { nodes, activeId, hoverId, onClick, onMouseOver, onMouseOut } = props

    const getEventHandlers = title => onClick
        ? {
            click: () => onClick(title),
            mouseover: () => onMouseOver(title),
            mouseout: () => onMouseOut(title) }
        : {}

    const nodeList = nodes ? [...nodes] : []

    return nodeList.map(({ title, lat, lng }) => (
        <CircleMarker
            center={{lat, lng}}
            pathOptions={getPathOptions(title, activeId, hoverId)}
            eventHandlers={getEventHandlers(title)}
            key={title}
        />
    ))
}

export default MarkerSet
