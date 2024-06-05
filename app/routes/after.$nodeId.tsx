import { invariantResponse } from "@epic-web/invariant"
import { type LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { useState, useEffect }from "react"
import nodes from "~nodes"
import MainPage from "~pages/Main";

import { type NodeMap } from "~types";

import { parseFormattedName } from "~utils"

export async function loader({ params, request }: LoaderFunctionArgs) {
    const referrer = request.headers.get("referer")
    const host = request.headers.get("host")

    const isExternalReferrer = (referrer && new URL(referrer).host === host)
        ? false
        : true

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
        nodes: criticalNodes as NodeMap,
        isExternalReferrer
    })
}

export default function() {
    const { nodeId, nodes: minimalNodes, isExternalReferrer } = useLoaderData<typeof loader>()
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
            activeId={nodeId}
            isFreshSession={isExternalReferrer}
        />
    )
}