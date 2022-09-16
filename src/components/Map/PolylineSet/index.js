import { Polyline } from 'react-leaflet'

function PolylineSet(props) {
    const { edges = [] } = props

    const pathOptions = {
        color: 'black',
        opacity: 0.1
    }

    const lines = edges
        .map(({ origin, destination }) => [
            [origin.lat, origin.lng],
            [destination.lat, destination.lng]
        ])

    // const uniqueLines = lines.reduce((lineSet, line) => {
    //     lineSet.add(line)
    //     return lineSet
    // }, new Set())

    const keys = edges.map(({ origin, destination }) => [origin.title, destination.title])

    return lines.map((line, i) => (
        <Polyline
            positions={line}
            pathOptions={pathOptions}
            key={keys[i]}
        />
    ))
}

export default PolylineSet
