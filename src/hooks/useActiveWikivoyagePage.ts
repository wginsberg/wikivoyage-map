import { useEffect } from "react"
import usePersistentState from "./usePersistentState.ts"
import nodes from "../nodes.ts"

function useActiveWikivoyagePage() {
    const [activeId, _setActiveId] = usePersistentState("activeId", "")

    useEffect(() => {
        const hash = window.location.hash.slice(1)
        if (!hash) return

        const id = decodeURIComponent(hash)
        if (!nodes[id]) {
            return
        }

        _setActiveId(id)
    }, [_setActiveId])

    const setActiveId = id => {
        const newUrl = window.location.href.split("#")[0] + "#" + id
        window.history.replaceState(null, "", newUrl)
        _setActiveId(id)
    }

    return [activeId, setActiveId] as [string, (_: string) => void]
}

export default useActiveWikivoyagePage
