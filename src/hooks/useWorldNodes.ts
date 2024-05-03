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
        fetch("world.json")
            .then(response => response.json())
            .then(json => setNodes(json))
    }, [])

    return nodes
}

export default useWorldNodes
