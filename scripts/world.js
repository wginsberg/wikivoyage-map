const { writeFileSync } = require('fs')
const { getNodes, getEdges } = require("./util.js")

const BLOCKLIST = new Set([
    "Wikivoyage:Cruising Expedition/Structure for cruising articles/Puerto Vallarta",
])

const TARGET = 'src/world.json'

const dbNodes = getNodes()
const nodes = {}
for (const node of dbNodes) {
    if (BLOCKLIST.has(node.title)) continue
    nodes[node.title] = {
        ...node,
        edges: []
    }
}

// Consolidate subpages
// E.g. Toronto/Downtown into Toronto
for (const node of dbNodes) {
    const { title } = node
    const [_, basePage] = title.match(/(.*?)\s*\/\s*(.*)/) || []

    const basePageExists = !!nodes[basePage]
    if (basePageExists) {
        delete nodes[title]
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
