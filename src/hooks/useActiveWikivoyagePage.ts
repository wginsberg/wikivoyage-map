import { useEffect } from "react"
import usePersistentState from "./usePersistentState"

function useActiveWikivoyagePage() {
    const [activeId, _setActiveId] = usePersistentState("activeId", "")

    useEffect(() => {
        const hash = window.location.hash.slice(1)
        if (!hash) return

        const id = decodeURIComponent(hash)

        _setActiveId(id)
    }, [_setActiveId])

    const setActiveId = (id: string) => {
        const newUrl = window.location.href.split("#")[0] + "#" + id
        window.history.replaceState(null, "", newUrl)
        _setActiveId(id)
    }

    return [activeId, setActiveId] as [string, (_: string) => void]
}

export default useActiveWikivoyagePage
