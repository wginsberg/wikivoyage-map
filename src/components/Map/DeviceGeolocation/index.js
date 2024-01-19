import { DivIcon } from "leaflet"
import { Marker } from "react-leaflet"

const icon = new DivIcon({
    className: "arrowhead",
    html: `
        <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 0 20 40">
            <polygon points="10,0 20,40 10,30 0,40" fill="#4285f4" stroke="#ffffff" stroke-width="2"/>
        </svg>
    `
})

function DeviceGeolocation({ geolocation }) {
    if (!geolocation) return

    const position = {
        lat: geolocation.latitude,
        lng: geolocation.longitude
    }

    return (
        <Marker icon={icon} position={position} />
    )
}

export default DeviceGeolocation
