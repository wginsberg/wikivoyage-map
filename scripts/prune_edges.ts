// Removes any edges that span a distance greater than 500kmconst Database = require('better-sqlite3')

const Database = require('better-sqlite3')

// Setup logging
const CLEAR_OUTPUT = "\x1b[2J\x1b[;H"
let lastPrintTime = 0

// Initiate db connection
const db = new Database('data.db');

const selectEdges = db.prepare(`
    SELECT origin, destination
    FROM edge
        JOIN node AS node_1 ON edge.origin = node_1.title
        JOIN node AS node_2 ON edge.destination = node_2.title
    WHERE
        NOT (
            ABS(node_1.lat - node_2.lat) < 5
            AND
            ABS(node_1.lng - node_2.lng) < 5
        )
`)

const deleteEdge = db.prepare(`
    DELETE
    FROM edge
    WHERE
        origin = ?
        AND destination = ?;
`)

// Find edges that are excessively far apart
const edges = selectEdges.all()

// Remove edges one by one
for (const edge of edges) {
    const { origin, destination } = edge
    // Logging
    const now = new Date().getTime()
    if (now - lastPrintTime > 250) {
        console.log(CLEAR_OUTPUT)
        console.log(`Deleting edge (${origin}, ${destination}) ...`)
        lastPrintTime = now
    }

    deleteEdge.run(origin, destination)
}

console.log(`Removed ${edges.length} edges`)
process.exit(0)
