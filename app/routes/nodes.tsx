import { type LoaderFunctionArgs } from '@remix-run/node'
import { json } from "@remix-run/react";
import { getNodes } from "~nodes"
import { type NodeMap } from '~types';

export async function loader({ request, params }: LoaderFunctionArgs) {
    const nodes = await getNodes()

    const nodeList = Object.entries(nodes)

    const url = new URL(request.url)
    const limit = Number(url.searchParams.get("limit")) || nodeList.length
    const offset = Number(url.searchParams.get("offset")) || 0

    const responseNodes: NodeMap = {}
    for (let i = Number(offset); i < Number(limit); i ++) {
        const [nodeId, node] = nodeList[i]
        responseNodes[nodeId] = node
    }

    return json(responseNodes as NodeMap)
}
