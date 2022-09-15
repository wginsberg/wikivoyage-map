import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

function Protomaps () {
    const map = useMap()

    useEffect(() => {
        const tiles = new window.protomaps.PMTiles("tiles.pmtiles")
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
    }, [map])
}

export default Protomaps
