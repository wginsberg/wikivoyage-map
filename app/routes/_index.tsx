import { json, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

import capitals from "~capitals";
import { getNodes } from "~nodes"
import MainPage from "~pages/Main";

import { type NodeMap } from "~types";

export async function loader() {
    const nodes = await getNodes()
    const minimalNodeData: NodeMap = {}

    for (const nodeId of capitals) {
        const node = nodes[nodeId]
        if (!node) continue

        minimalNodeData[nodeId] = {
            title: node.title,
            lat: node.lat,
            lng: node.lng,
            edges: []
        }
    }

    return json({
        nodes: minimalNodeData as NodeMap
    })
}

export default function() {
    const { nodes: minimalNodes } = useLoaderData<typeof loader>()
    const [allNodes, setAllNodes] = useState<NodeMap>({})

    useEffect(() => {
        const splitRequests = [
            fetch('/nodes?limit=5000'),
            fetch('/nodes?offset=5000&limit=10000'),
            fetch('/nodes?offset=10000&limit=15000'),
            fetch('/nodes?offset=15000&limit=20000'),
            fetch('/nodes?offset=20000'),
        ]
        Promise.all(splitRequests.map((promise) => 
            promise
                .then(response => response.json())
                .then(nodes => setAllNodes(prev => ({ ...nodes, ...prev })))
        ))
    }, [])

    const nodes = {
        ...minimalNodes,
        ...allNodes
    }

    return (
        <MainPage 
            nodes={nodes}
            activeId=""
            isFreshSession={true}
        />
    )
}