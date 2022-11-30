import { useMap } from 'react-leaflet'
import { getMapTileHost } from "../../../utils"

function Protomaps (props) {
    const map = useMap()
    const { file } = props
    const url = `${getMapTileHost()}/${file}`

    var layer = window.protomaps.leafletLayer({ url })
    layer.addTo(map)
    layer.addInspector(map)
    map.setView([30.058506, -115.725157], 5)
}

export default Protomaps
