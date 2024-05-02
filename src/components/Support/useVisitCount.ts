import { useState, useEffect } from "react"

const ONE_DAY = 24 * 60 * 60 * 1000

const useVisitCount = () => {
    const [firstVisitTimestamp, setFirstVisitTimestamp] = useState<Number>()

    useEffect(() => {
        const recordedTimestamp = Number(localStorage.getItem("firstVisit"))
       
        if (recordedTimestamp) {
            setFirstVisitTimestamp(recordedTimestamp)
        } else {
            localStorage.setItem("firstVisit", Date.now().toString())
        }
    }, [])

    const secondsSinceFirstVisit = Date.now() - Number(firstVisitTimestamp)

    const isReturningVisitor = secondsSinceFirstVisit > ONE_DAY

    return { isReturningVisitor }
}

export default useVisitCount
