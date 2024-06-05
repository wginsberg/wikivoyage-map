import { type LatLngBounds, type LatLngTuple} from "leaflet";
import { useEffect, useRef } from "react"
import { Polyline } from "react-leaflet"

type SimpleLineProps = {
    active: boolean
    positions: [LatLngTuple, LatLngTuple]
    mapBounds: LatLngBounds | undefined
}

const PATH_OPTIONS = {
    inactive: {
        color: 'grey',
        opacity: 0.05
    },
    active: {
        color: 'black',
        opacity: 0.2
    }
}

// TODO - don't hardcode here
const NODE_RADIUS =  10

const SimpleLine = (props: SimpleLineProps) => {
    const { active, positions, mapBounds } = props
    const ref = useRef<Polyline>(null)

    // This is a little hack to make lines render nicely without intersecting the circle
    useEffect(() => {
        const svg = ref.current?.getElement() as SVGGeometryElement
        const lineLength = svg?.getTotalLength()
        ref.current?.setStyle({
            dashArray: `${lineLength - (NODE_RADIUS * 2)}`,
            dashOffset: `-${NODE_RADIUS}`
        })

    }, [mapBounds])

    return (
        <Polyline
            positions={positions}
            pathOptions={active ? PATH_OPTIONS.active : PATH_OPTIONS.inactive}
            interactive={false}
            ref={ref}
        />
    )
}

export default SimpleLine
