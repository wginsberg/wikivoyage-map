import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { getMapTileHost } from "../../../utils.ts"
// import { leafletLayer } from 'protomaps-leaflet'

const INITIAL_CENTER = [19.476950206488414, -2.2851562500000004]
const INITIAL_ZOOM = 2

function Protomaps (props) {
    const { file, onBoundsChange } = props
    const map = useMap()

    // useEffect(() => {
    //     map.setView(INITIAL_CENTER, INITIAL_ZOOM, { animate: true })
    //     map.on("moveend", () => onBoundsChange(map))

    //     const mapTileHost = getMapTileHost()

    //     const url = `${getMapTileHost()}/${file}`
    //     var layer = leafletLayer({ url, theme: 'white' })
    //     layer.addTo(map)
    // }, [map, file, onBoundsChange])

    return null
}

export default Protomaps
