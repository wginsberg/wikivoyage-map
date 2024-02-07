import { useEffect, useState } from "react";
import usePersistentState from "./usePersistentState.ts";
import { GEOLOCATION_OPTION } from "../constants.js"

const DEFAULT_HEADING = 15

type Position = {
    latitude: number;
    longitude: number;
    // TODO remove heading
    heading: number;
}

function useGeolocation() {
    const [enabled] = usePersistentState(GEOLOCATION_OPTION, false)
    const [position, setPosition] = useState<Position>()
    useEffect(() => {
        if (!enabled) return

        const onSuccess: PositionCallback = ({ coords }) => {
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
