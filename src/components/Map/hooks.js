import { useRef, useState, useEffect } from 'react';

const PROTOMAPS_ATTRIBUTION = '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'

function useMap(elementId, tilePath) {
    const leafletRef = useRef()
    const tilesRef = useRef()

    console.log("before", JSON.stringify({leafletRef, tilesRef} ))

    if (leafletRef.current) return
    if (tilesRef.current) return

    console.log("here")
    leafletRef.current = window.L.map(elementId)
    tilesRef.current = new window.protomaps.PMTiles(tilePath)

    const leafletMap = leafletRef.current
    const pmTiles = tilesRef.current

    console.log("-----", {leafletRef, tilesRef})

    pmTiles
        .metadata()
        .then(metadata => {
            const bounds = metadata.bounds.split(',').map(Number)
            const attributionLayer = window.protomaps.leafletLayer({
                attribution: PROTOMAPS_ATTRIBUTION,
                url: pmTiles,
                bounds: [[bounds[1], bounds[0]], [bounds[3], bounds[2]]]
            })
            attributionLayer.addTo(leafletMap)
            leafletMap.fitBounds(bounds)
        })
}

// function useLeaflet(elementId) {
//     const leafletRef = useRef()
//     // console.log('useLeaflet', { leaflet })
//     useEffect(() => {
//         if (!leafletRef.current) {
//             leafletRef.current = window.L.map(elementId)
//         }
//     }, [elementId])
//     return leaflet
// }

// function useProtomaps(tilePath) {
//     const [protomaps, setProtomaps] = useState()
//     console.log('useProtomaps', { protomaps })

//     useEffect(() => {
//         if (!protomaps) {
//             setProtomaps(new window.protomaps.PMTiles(tilePath))
//         }
//     }, [protomaps, tilePath])
//     return protomaps
// }

// function useRenderMap(leafletMap, protomapsTiles) {
//     console.log(protomapsTiles)
//     useEffect(() => {
//         if (!leafletMap) return
//         if (!protomapsTiles) return

//         protomapsTiles
//             .metadata()
//             .then(metadata => {
//                 const bounds = metadata.bounds.split(',').map(Number)
//                 const attributionLayer = window.protomaps.leafletLayer({
//                     attribution: PROTOMAPS_ATTRIBUTION,
//                     url: protomapsTiles,
//                     bounds: [[bounds[1], bounds[0]], [bounds[3], bounds[2]]]
//                 })
//                 attributionLayer.addTo(leafletMap)
//                 leafletMap.fitBounds(bounds)
//             })
//     }, [leafletMap, protomapsTiles])
// }

export {
    useMap,
    // useLeaflet,
    // useProtomaps,
    // useRenderMap
}
