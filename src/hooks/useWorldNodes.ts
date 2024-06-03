import { useState, useEffect } from 'react'
import { type Node } from '../types';

interface NodeMap {
    [key: string]: Node;
}

const useWorldNodes = (nodeId: string) => {
    const [loading, setLoading] = useState(true)
    const [nodes, setNodes] = useState<NodeMap>({})

    useEffect(() => {
        // N.B. "credentials" and "mode" are required to make the prefetch of this resource work correctly (from the link tag in index.html)
        fetch("world_edges.json", { credentials: 'include', mode: 'no-cors' })
            .then(response => response.json())
            .then(json => {
                setNodes(json)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        if (!nodeId) return
        if (nodes[nodeId]) return

        setLoading(true)

        // disgusting optimization time
        const firstThreeChars = nodeId.slice(0, 3)

        fetch(`nodes/${firstThreeChars}.json`)
            .then(response => response.json())
            .then(loadedNodes => {
                setNodes(prev => ({
                    ...loadedNodes,
                    ...prev
                }))
                setLoading(false)
                return loadedNodes[nodeId].edges
            })
            .then((relatedNodeIds: string[]) => {
                // Also load all the related nodes for that node
                // with the same code copied and pasted. what?
                relatedNodeIds.forEach(relatedNodeId => {
                    if (nodes[relatedNodeId]) return
                    const firstThreeChars = relatedNodeId.slice(0, 3)
                    fetch(`nodes/${firstThreeChars}.json`)
                        .then(response => response.json())
                        .then(loadedNodes => {
                            setNodes(prev => ({
                                ...loadedNodes,
                                ...prev
                            }))
                        })
                })
            })
    }, [nodeId])

    return {
        loadingNodes: loading,
        nodes
    }
}

export default useWorldNodes
