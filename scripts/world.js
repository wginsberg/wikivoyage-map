const { writeFileSync } = require('fs')
const { getNodes, getEdges } = require("./util.js")

// TODO - find a better way to store this data
const BLOCKLIST = new Set([
    "Wikivoyage:Cruising Expedition/Structure for cruising articles/Puerto Vallarta",
])

const TARGET = 'public/data/world.json'

const dbNodes = getNodes()
const nodes = {}
for (const node of dbNodes) {
    if (BLOCKLIST.has(node.title)) continue
    nodes[node.title] = {
        ...node,
        edges: []
    }
}

const dbEdges = getEdges()
for (const edge of dbEdges) {
    const { origin, destination } = edge
    for (const [first, second] of [[origin, destination], [destination, origin]]) {
        if (!nodes[first]) continue
        nodes[first].edges = [...nodes[first].edges, second]
    }
}

const resultString = JSON.stringify(nodes, null, 4)

writeFileSync(TARGET, resultString)
