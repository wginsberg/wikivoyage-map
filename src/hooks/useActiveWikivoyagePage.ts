import { useEffect, useState } from "react"
import usePersistentState from "./usePersistentState"
import { parseFormattedName, getFormattedName } from "~utils"

function useActiveWikivoyagePage() {
    const [loadingActiveId, setLoadingActiveId] = useState(true)
    const [activeId, _setActiveId] = usePersistentState("activeId", "")
    const [isFreshSession, setIsFreshSession] = useState(false)

    useEffect(() => {
        const slug = window.location.hash.slice(1) || window.location.pathname.slice(1)
        setLoadingActiveId(false)
        if (!slug) return

        const id = parseFormattedName(decodeURIComponent(slug))

        _setActiveId(id)
        setIsFreshSession(true)
    }, [_setActiveId])

    const setActiveId = (id: string) => {
        const cleanId = getFormattedName(id)
        const newUrl = window.location.href.split("#")[0] + "#" + cleanId
        window.history.replaceState(null, "", newUrl)
        _setActiveId(id)
        setIsFreshSession(false)
    }

    return {
        loadingActiveId,
        activeId,
        setActiveId,
        isFreshSession
    }
}

export default useActiveWikivoyagePage
