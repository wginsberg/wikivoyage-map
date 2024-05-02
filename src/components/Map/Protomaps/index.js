import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { getMapTileHost, isAllowedToAccessMapTileHost } from "../../../utils.ts"

const INITIAL_CENTER = [19.476950206488414, -2.2851562500000004]
const INITIAL_ZOOM = 2

function Protomaps (props) {
    const { file, onBoundsChange } = props
    const map = useMap()

    useEffect(() => {
        map.setView(INITIAL_CENTER, INITIAL_ZOOM)
        map.on("moveend", () => onBoundsChange(map))

        const mapTileHost = getMapTileHost()
        if (!isAllowedToAccessMapTileHost(mapTileHost)) return

        const url = `${getMapTileHost()}/${file}`
        var layer = window.protomaps.leafletLayer({ url })
        layer.addTo(map)
    }, [map, file, onBoundsChange])

    return ""
}

export default Protomaps
