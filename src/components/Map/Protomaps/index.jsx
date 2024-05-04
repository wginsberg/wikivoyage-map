import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { getMapTileHost, isAllowedToAccessMapTileHost } from "../../../utils.ts"
import { leafletLayer } from 'protomaps-leaflet'
import useScript from '../../../hooks/useScript'

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
        var layer = leafletLayer({ url, theme: 'white' })
        layer.addTo(map)
    }, [map, file, onBoundsChange])

    // This is kind of ugly. These libraries are nice but they depend on an old version of leaflet.
    // They could be forked, or even installed with --legacy-peer-deps, or some other workaround.
    // But here it is: this is the workaround that is used now :)
    useScript("https://unpkg.com/leaflet-doubletapdrag")
    useScript("https://unpkg.com/leaflet-doubletapdragzoom")

    return null
}

export default Protomaps
