import { useEffect, useState } from "react"

export default function usePersistentState<T>(key: string, defaultValue: T) {
    const [reactState, setReactState] = useState(defaultValue)

    useEffect(() => {
        const persistentValue = window.localStorage.getItem(key)
        if (persistentValue !== null) {
            setReactState(JSON.parse(persistentValue))
        }
    }, [key])

    function setState(value) {
        setReactState(value)
        window.localStorage.setItem(key, JSON.stringify(value))
    }

    return [reactState, setState] as [T, (t: T) => void]
}