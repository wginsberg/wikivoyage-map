import { useState, useEffect } from 'react'
import { type Node } from '../types';

interface NodeMap {
    [key: string]: Pick<Node, "byline">;
}

const useWorldBylines = (nodeId: string) => {
    const [loading, setLoading] = useState(true)
    const [nodes, setNodes] = useState<NodeMap>({})

    useEffect(() => {
        // TODO - useless at this point?
        // N.B. "credentials" and "mode" are required to make the prefetch of this resource work correctly (from the link tag in index.html)
        fetch("world_bylines.json", { credentials: 'include', mode: 'no-cors' })
            .then(response => response.json())
            .then(json => {
                setNodes(json)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        if (nodes[nodeId]) return
        fetch(`bylines/${nodeId}.txt`)
            .then(response => response.text())
            .then(byline => {
                setNodes(prev => ({
                    [nodeId]: { byline },
                    ...prev
                }))
                setLoading(false)
            })
    }, [nodeId])

    return {
        loadingNodesWithByline: loading,
        nodesWithByline: nodes
    }
}

export default useWorldBylines
