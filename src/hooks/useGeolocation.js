import { useEffect, useState } from "react";
import usePersistentState from "./usePersistentState";
import { GEOLOCATION_OPTION } from "../constants.js"

const DEFAULT_HEADING = 15

function useGeolocation() {
    const [enabled] = usePersistentState(GEOLOCATION_OPTION)
    const [position, setPosition] = useState()
    useEffect(() => {
        if (!enabled) return

        const onSuccess = ({ coords }) => {
            const { latitude, longitude } = coords
            const heading = coords.heading ?? DEFAULT_HEADING
            setPosition({ latitude, longitude, heading })
        }
        const watcherId = navigator.geolocation.watchPosition(onSuccess);
        return () => navigator.geolocation.clearWatch(watcherId)
    }, [enabled])

    return position
}

export default useGeolocation
