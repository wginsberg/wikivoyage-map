import { useEffect } from "react"
import { DivIcon } from "leaflet"
import { Marker } from "react-leaflet"

// TODO - handle hardcoding better
function getIconTransform (degrees = 15) {
    return `scale(0.8) translate(-14px, -14px) rotate(${degrees}deg)`
}

const icon = new DivIcon({
    className: "arrowhead",
    html: `
        <svg
            id="device-marker"
            xmlns="http://www.w3.org/2000/svg"
            style="transform: ${getIconTransform()}"
            height="40"
            width="40"
            viewBox="0 0 20 40"
        >
            <polygon points="10,0 20,40 10,30 0,40" fill="#4285f4" stroke="#ffffff" stroke-width="2"/>
        </svg>
    `
})

function DeviceGeolocation({ geolocation }) {
    useEffect(() => {
        if (!geolocation) return

        // This is hacky because: how else to rotate the marker in the map? ...
        const svg = document.getElementById("device-marker")

        svg.style.transform = getIconTransform(geolocation.heading)
    }, [geolocation])

    if (!geolocation) return null

    const position = {
        lat: geolocation.latitude,
        lng: geolocation.longitude
    }

    return (
        <Marker icon={icon} position={position} />
    )
}

export default DeviceGeolocation
