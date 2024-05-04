import { useState, useEffect } from 'react'

interface Node {
    title: string;
    lat: number;
    lng: number;
    edges: string[];
    subs?: string[];
}

interface NodeMap {
    [key: string]: Node;
}

const useWorldNodes = () => {
    const [nodes, setNodes] = useState<NodeMap>({})

    useEffect(() => {
        // N.B. "credentials" and "mode" are required to make the prefetch of this resource work correctly (from the link tag in index.html)
        fetch("world.json", { credentials: 'include', mode: 'no-cors' })
            .then(response => response.json())
            .then(json => setNodes(json))
    }, [])

    return nodes
}

export default useWorldNodes
