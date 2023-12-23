import { useEffect, useState } from "react"

export default function usePersistentState(key, defaultValue = "") {
    const [reactState, setReactState] = useState(defaultValue)

    useEffect(() => {
        const persistentValue = window.localStorage.getItem(key)
        setReactState(JSON.parse(persistentValue))
    }, [key])

    function setState(value) {
        setReactState(value)
        window.localStorage.setItem(key, JSON.stringify(value))
    }

    return [reactState, setState]
}
