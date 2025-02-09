import { invariantResponse } from "@epic-web/invariant"
import { type LoaderFunctionArgs } from "@remix-run/node";
import { defer, json, useLoaderData } from "@remix-run/react";
import { getForecast } from "app/utils/climate";
import { getTimezone } from "app/utils/timezone";
import { useState, useEffect }from "react"
import { getNodes } from "~nodes"
import MainPage from "~pages/Main";

import { type NodeMap } from "~types";

import { parseFormattedName } from "~utils"

export async function loader({ params, request }: LoaderFunctionArgs) {
    const nodes = await getNodes()

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

    const activeNode = criticalNodes[nodeId]
    const forecast = getForecast(activeNode.lat, activeNode.lng)
    const timezone = getTimezone(activeNode)

    return defer({
        nodeId,
        nodes: criticalNodes as NodeMap,
        isExternalReferrer,
        forecast,
        timezone
    })
}

export default function() {
    const { nodeId, nodes: minimalNodes, isExternalReferrer, forecast, timezone } = useLoaderData<typeof loader>()
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
            forecast={forecast}
            timezone={timezone}
        />
    )
}