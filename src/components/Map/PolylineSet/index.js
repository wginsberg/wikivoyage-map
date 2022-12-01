import { Polyline } from 'react-leaflet'

function PolylineSet(props) {
    const { edges = [], active = false } = props

    const pathOptions = {
        inactive: {
            color: 'grey',
            opacity: 0.1
        },
        active: {
            color: 'black',
            opacity: 0.5
        }
    }

    const lines = edges
        .map(({ origin, destination }) => [
            [origin.lat, origin.lng],
            [destination.lat, destination.lng]
        ])
        .reduce((acc, edge) => {
            // de-duplicate edges from A-> and B->A
            const key = `${edge.map((latLng) => `${latLng}`).sort()}`
            return {
                ...acc,
                [key]: edge
            }
        }, {})
        |> Object.values(#)

    const keys = edges.map(({ origin, destination }) => [origin.title, destination.title])

    return lines.map((line, i) => (
        <Polyline
            positions={line}
            pathOptions={active ? pathOptions.active : pathOptions.inactive}
            interactive={false}
            key={keys[i]}
        />
    ))
}

export default PolylineSet
