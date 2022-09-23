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
