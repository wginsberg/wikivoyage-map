import { useEffect, useState, useCallback } from "react"

export default function usePersistentState<T>(key: string, defaultValue: T) {
    const [reactState, setReactState] = useState(defaultValue)

    useEffect(() => {
        const persistentValue = window.localStorage.getItem(key)
        if (persistentValue !== null) {
            setReactState(JSON.parse(persistentValue))
        }
    }, [key])

    const setState = useCallback((value: T) => {
        setReactState(value)
        window.localStorage.setItem(key, JSON.stringify(value))
    }, [key, setReactState])

    return [reactState, setState] as [T, (t: T) => void]
}