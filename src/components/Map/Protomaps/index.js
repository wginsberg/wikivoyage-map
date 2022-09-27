import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

function Protomaps (props) {
    const map = useMap()

    const { url } = props

    useEffect(() => {
        const tiles = new window.protomaps.PMTiles(url)
        tiles.metadata()
            .then(metadata => {
                const [b1, b2, b3, b4]  = metadata.bounds.split(',').map(Number)
                const bounds = [[b2, b1], [b4, b3]]
                const layer = window.protomaps.leafletLayer({
                    url: tiles,
                    bounds
                })
                layer.addTo(map)
                map.fitBounds(bounds)
            })
    }, [map, url])
}

export default Protomaps
