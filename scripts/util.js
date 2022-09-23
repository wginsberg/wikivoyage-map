const Database = require('better-sqlite3')

// Init the database connection
const db = new Database('data.db');

function getEdges() {
    const selectEdges = db.prepare(`
        SELECT  origin,
                node1.lat AS originLat,
                node1.lng AS originLng,
                destination,
                node2.lat AS destinationLat,
                node2.lng AS destinationLng
        FROM node AS node1
            JOIN edge ON node1.title = edge.origin
            JOIN node as node2 ON edge.destination = node2.title;
    `)
    const edges = selectEdges.all()
    return edges
}

module.exports = {
    getEdges
}
