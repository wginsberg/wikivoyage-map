import { useState } from 'react'
import { LatLngBounds, LatLngTuple, Map } from 'leaflet'
import { Polyline, useMapEvent } from 'react-leaflet'
import { Edge } from "~types"
import SimpleLine from './SimpleLine'
export type SimpleLine = [LatLngTuple, LatLngTuple]

type PolylineSetProps = {
    edges: Edge[],
    active?: boolean
}

function PolylineSet(props: PolylineSetProps) {
    const { edges = [], active = false } = props

    // Keep track of map bounds to force re-render of each line
    const [mapBounds, setMapBounds] = useState<LatLngBounds>()

    useMapEvent("move", (e) => {
        setMapBounds((e.target as Map).getBounds())
    })

    useMapEvent("moveend", (e) => {
        setMapBounds((e.target as Map).getBounds())
    })

    useMapEvent("movestart", (e) => {
        setMapBounds((e.target as Map).getBounds())
    })

    const lines: SimpleLine[] = Object.values(
        edges
            .map(({ origin, destination }) => [
                [origin.lat, origin.lng],
                [destination.lat, destination.lng]
            ] as SimpleLine)
            .reduce((acc, edge) => {
                // de-duplicate edges from A-> and B->A
                const key = `${edge.map((latLng: LatLngTuple) => `${latLng}`).sort()}`
                return {
                    ...acc,
                    [key]: edge
                }
            }, {})
        )

    const keys = edges
        .map(({ origin, destination }) => [origin.title, destination.title])
        .map(String)

    return (
        <>
            {lines.map((line, i) => (
                <SimpleLine
                    active={active}
                    positions={line}
                    mapBounds={mapBounds}
                    key={keys[i]}
                />
            ))}
        </>
    )
}

export default PolylineSet
