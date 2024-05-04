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
        // @ts-ignore: TS233
        // This is a super sneaky optimization where we load the json super early
        const worldFetchPromise = window.worldFetchPromise as Promise<Response>

        worldFetchPromise
            .then(response => response.json())
            .then(json => setNodes(json))
    }, [])

    return nodes
}

export default useWorldNodes
