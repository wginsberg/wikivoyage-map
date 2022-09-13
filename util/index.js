import Database from 'better-sqlite3';

// Init the database connection
const db = new Database('data.db');

export function getNodesInBox ([latA, lngA], [latB, lngB]) {
    const selectNodes = db.prepare('SELECT title, lat, lng FROM node WHERE lat > ? and lat < ? and lng > ? and lng < ?;')
    const nodes = selectNodes.all(latA, latB, lngA, lngB)
    return nodes
}

export function getEdgesForBox([latA, lngA], [latB, lngB]) {
    const selectEdges = db.prepare(`
        SELECT  origin,
                node1.lat AS originLat,
                node1.lng AS originLng,
                destination,
                node2.lat AS destinationLat,
                node2.lng AS destinationLng
        FROM node AS node1
            JOIN edge ON node1.title = edge.origin
            JOIN node as node2 ON edge.destination = node2.title
        WHERE   (node1.lat > ? AND node1.lat < ? AND node1.lng > ? AND node1.lng < ?)
            OR  (node2.lat > ? AND node2.lat < ? AND node2.lng > ? AND node2.lng < ?);
    `)
    const edges = selectEdges.all(latA, latB, lngA, lngB, latA, latB, lngA, lngB)
    return edges
}
