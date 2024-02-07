const { writeFileSync } = require('fs')
const { getNodes, getEdges, sanitizeTitle, isSubPage } = require("./util.js")

const BLOCKLIST = new Set([
    "Wikivoyage:Cruising Expedition/Structure for cruising articles/Puerto Vallarta",
])

const TARGET = 'src/world.json'

const dbNodes = getNodes()
const nodes = {}
for (const node of dbNodes) {
    if (BLOCKLIST.has(node.title)) continue
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
for (const title in nodes) {
    const node = nodes[title]
    nodes[title] = {
        ...node,
        edges: [...node.edges]
    }
}

const resultString = JSON.stringify(nodes, null, 4)

writeFileSync(TARGET, resultString)
