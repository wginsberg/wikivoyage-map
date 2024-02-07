import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { getMapTileHost } from "../../../utils"

const INITIAL_CENTER = [19.476950206488414, -2.2851562500000004]
const INITIAL_ZOOM = 2

function Protomaps (props) {
    const { file, onBoundsChange } = props
    const map = useMap()

    useEffect(() => {
        const url = `${getMapTileHost()}/${file}`
        var layer = window.protomaps.leafletLayer({ url })
        layer.addTo(map)
        map.setView(INITIAL_CENTER, INITIAL_ZOOM)
        map.on("moveend", () => onBoundsChange(map))
    }, [map, file, onBoundsChange])

    return ""
}

export default Protomaps
