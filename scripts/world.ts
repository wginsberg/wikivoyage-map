import { writeFileSync } from "fs"
import { Node } from './types'
import { getNodes, getEdges, sanitizeTitle, isSubPage } from "./util"

type NodePlusEdgeSet = Node & {
    edges: Set<any>
}

type NodePlusEdgeArray = Node & {
    edges: any[]
}

type NodeWithOnlyBylineOutput = Pick<Node, "byline">

const TARGET_EDGES = 'public/world_edges.json'

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
const finalNodesWithEdges: { [key: string]: NodePlusEdgeArray } = {}
for (const title in nodes) {
    const node = nodes[title]
    finalNodesWithEdges[title] = {
        title: node.title,
        lat: node.lat,
        lng: node.lng,
        byline: node.byline,
        edges: [...node.edges]
    }
}

{
    const resultString = JSON.stringify(finalNodesWithEdges, null, 4)
    writeFileSync(TARGET_EDGES, resultString)
}

// stupid hacks to make this faster despite having tens of thousands of records
const firstThreeCharNodeLookup: {
    [key: string]: {
        [key: string]: NodePlusEdgeArray
    }
} = {}
for (const title in finalNodesWithEdges) {
    const firstTwoChars = title.slice(0, 3)

    const finalNode = {
        ...finalNodesWithEdges[title],
        byline: nodes[title].byline
    }

    // Don't bother optimizing for unconnected nodes
    if (finalNode.edges.length === 0) continue

    if (!firstThreeCharNodeLookup[firstTwoChars]) {
        firstThreeCharNodeLookup[firstTwoChars] = {}
    }
    firstThreeCharNodeLookup[firstTwoChars][title] = finalNode
}

for (const prefix in firstThreeCharNodeLookup) {
    const chunk = firstThreeCharNodeLookup[prefix]

    const path = `public/nodes/${prefix}.json`
    writeFileSync(path, JSON.stringify(chunk))
}
