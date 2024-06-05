import { json, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

import capitals from "~capitals";
import nodes from "~nodes"
import MainPage from "~pages/Main";

import { type NodeMap } from "~types";

export async function loader() {
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
        fetch('/nodes')
            .then(response => response.json())
            .then(nodes => setAllNodes(nodes))
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