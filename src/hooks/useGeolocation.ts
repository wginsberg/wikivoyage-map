import { useEffect, useState } from "react";
import usePersistentState from "./usePersistentState";
import { GEOLOCATION_OPTION } from "../constants"

export type Position = {
    latitude: number;
    longitude: number;
}

function useGeolocation() {
    const [enabled] = usePersistentState(GEOLOCATION_OPTION, false)
    const [position, setPosition] = useState<Position>()
    useEffect(() => {
        if (!enabled) return

        const onSuccess: PositionCallback = ({ coords }) => {
            const { latitude, longitude } = coords
            setPosition({ latitude, longitude })
        }
        const watcherId = navigator.geolocation.watchPosition(onSuccess);
        return () => navigator.geolocation.clearWatch(watcherId)
    }, [enabled])

    return position
}

export default useGeolocation
