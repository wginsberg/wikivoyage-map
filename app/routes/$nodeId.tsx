import { type LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect, useLoaderData } from "@remix-run/react";

import nodes from "~nodes"
import MainPage from "~pages/Main";

import { type NodeMap } from "~types";

export async function loader({ params, request }: LoaderFunctionArgs) {

    const { nodeId } = params

    if (!nodeId || !nodes[nodeId]) return redirect("/404")

    const relatedNodeIds = nodes[nodeId].edges

    const criticalNodes: NodeMap = {
        [nodeId]: nodes[nodeId]
    }

    for (const relatedNodeId of relatedNodeIds) {
        criticalNodes[relatedNodeId] = nodes[relatedNodeId]
    }

    return json({
        nodes: criticalNodes as NodeMap
    })
}

export default function() {
    const { nodes } = useLoaderData<typeof loader>()
    return (
        <MainPage 
            nodes={nodes}
            loadingNodes={false}
        />
    )
}