import { invariantResponse } from "@epic-web/invariant"
import { type LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { useState, useEffect }from "react"
import nodes from "~nodes"
import MainPage from "~pages/Main";

import { type NodeMap } from "~types";

import { parseFormattedName } from "~utils"

export async function loader({ params, request }: LoaderFunctionArgs) {
    const nodeId =  parseFormattedName(params.nodeId || "")
    invariantResponse(nodeId && nodes[nodeId], `Invalid nodeId "${nodeId}"`)

    const relatedNodeIds = nodes[nodeId].edges

    const criticalNodes: NodeMap = {
        [nodeId]: nodes[nodeId]
    }

    for (const relatedNodeId of relatedNodeIds) {
        criticalNodes[relatedNodeId] = nodes[relatedNodeId]
    }

    return json({
        nodeId,
        nodes: criticalNodes as NodeMap
    })
}

export default function() {
    const { nodeId, nodes: minimalNodes } = useLoaderData<typeof loader>()
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
            loadingNodes={false}
            activeId={nodeId}
        />
    )
}