import { writeFileSync } from "fs"
import { Node } from './types'
import { getNodes, getEdges, sanitizeTitle, isSubPage } from "./util"

type NodePlusEdgeSet = Node & {
    edges: Set<any>
}

type NodePlusEdgeArray = Node & {
    edges: any[]
}

type NodeWithEdgesOutput = Omit<NodePlusEdgeArray, "byline">
type NodeWithOnlyBylineOutput = Pick<Node, "byline">

const TARGET_EDGES = 'public/world_edges.json'
const TARGET_BYLINES = 'public/world_bylines.json'

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
const finalNodesWithEdges: { [key: string]: NodeWithEdgesOutput } = {}
for (const title in nodes) {
    const node = nodes[title]
    finalNodesWithEdges[title] = {
        title: node.title,
        lat: node.lat,
        lng: node.lng,
        edges: [...node.edges]
    }
}

{
    const resultString = JSON.stringify(finalNodesWithEdges, null, 4)
    writeFileSync(TARGET_EDGES, resultString)
}

const finalBylines: { [key: string]: NodeWithOnlyBylineOutput } = {}
for (const title in nodes) {
    const node = nodes[title]
    finalBylines[title] = {
        byline: node.byline
    }
}

{
    const resultString = JSON.stringify(finalBylines, null, 4)
    writeFileSync(TARGET_BYLINES, resultString)
}

// stupid hack to make this faster despite having tens of thousands of records
for (const title in finalBylines) {
    const { byline } = finalBylines[title]
    const path = `public/bylines/${title}.txt`
    writeFileSync(path, byline)
}
