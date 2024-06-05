import { useEffect, useState } from "react"
import { type Node } from "~types"

type MetaDescriptionProps = {
    node: Node
}

export default function MetaDescription({ node }: MetaDescriptionProps) {
    const [done, setDone] = useState(false)
    useEffect(() => {
        if (done) return
        if (!node?.title) return

        const description = node.edges.length > 1
            ? `Want to know where to go after visiting ${node.title}? Discover ${node.edges.length} different places to go after ${node.title}.`
            : `Find out where to go after visiting ${node.title}`

        const metaTag = document.createElement("meta")
        metaTag.setAttribute("name", "description")
        metaTag.setAttribute("content", description)
        document.head.append(metaTag)
        setDone(true)
    }, [node])

    return null
}
