import { useEffect, useState } from "react";
import usePersistentState from "./usePersistentState";
import { GEOLOCATION_OPTION } from "../constants.js"

function useGeolocation() {
    const [enabled] = usePersistentState(GEOLOCATION_OPTION)
    const [position, setPosition] = useState()
    useEffect(() => {
        if (!enabled) return

        const onSuccess = ({ coords }) => setPosition(coords)
        navigator.geolocation.getCurrentPosition(onSuccess);
    }, [enabled])

    return position
}

export default useGeolocation
