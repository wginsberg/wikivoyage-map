import { useEffect, useState } from "react"
import { Node } from "~types"

type MetaTitleProps = {
    node: Node
}

export default function MetaTitle({ node }: MetaTitleProps) {
    useEffect(() => {
        if (!node?.title) return
        document.title = `${node.title} | where u going`
    }, [node])

    return null
}
