import { writeFileSync } from "fs"
import { Node } from './types'
import { getNodes, getEdges, sanitizeTitle, isSubPage } from "./util"

type Edge = any

type NodePlusEdgeSet = Node & {
    edges: Set<any>
}

type NodePlusEdgeArray = Node & {
    edges: any[]
}

const TARGET = 'public/world.json'

const dbNodes = getNodes()
const nodes: { [key: string]: NodePlusEdgeSet } = {}
for (const node of dbNodes) {
    if (node.title.startsWith("Wikivoyage:")) continue
    if (isSubPage(node.title)) continue
    nodes[node.title] = {
        ...node,
        edges: new Set()
    }
}

const dbEdges = getEdges()
for (const edge of dbEdges) {
    const origin = sanitizeTitle(edge.origin)
    const destination = sanitizeTitle(edge.destination)

    for (const [first, second] of [[origin, destination], [destination, origin]]) {
        if (!nodes[first] || !nodes[second]) continue
        nodes[first].edges.add(second)
    }
}

// Convert edges from Set to Array
const finalNodes: { [key: string]: NodePlusEdgeArray } = {}
for (const title in nodes) {
    const node = nodes[title]
    finalNodes[title] = {
        ...node,
        edges: [...node.edges]
    }
}

const resultString = JSON.stringify(finalNodes, null, 4)

writeFileSync(TARGET, resultString)
