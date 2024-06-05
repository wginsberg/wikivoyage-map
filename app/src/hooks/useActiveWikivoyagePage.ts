import { useNavigate } from "@remix-run/react"
import { useEffect, useState } from "react"
import { parseFormattedName, getFormattedName } from "~utils"
import usePersistentState from "./usePersistentState"

function useActiveWikivoyagePage(initialNodeId: string = "") {
    // const [loadingActiveId, setLoadingActiveId] = useState(true)
    // const [activeId, _setActiveId] = usePersistentState("activeId", initialNodeId)
    const [isFreshSession, setIsFreshSession] = useState(false)

    // useEffect(() => {
    //     const slug = window.location.pathname.slice(1)
    //     setLoadingActiveId(false)
    //     if (!slug) return

    //     const id = parseFormattedName(decodeURIComponent(slug))

    //     _setActiveId(id)
        // setIsFreshSession(true)
    // }, [_setActiveId])

    // const setActiveId = (id: string) => {
    //     const cleanId = getFormattedName(id)
    //     // const newUrl = `${window.location.origin}/${cleanId}`
    //     // window.history.replaceState(null, "", newUrl)

    //     navigate(`/after/${cleanId}`)

    //     _setActiveId(id)
    //     setIsFreshSession(false)
    // }

    return {
        // loadingActiveId,
        // activeId,
        // setActiveId,
        isFreshSession
    }
}

export default useActiveWikivoyagePage
