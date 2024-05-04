const Database = require('better-sqlite3')
const wtf = require('wtf_wikipedia')

// Init the database connection
const db = new Database('data.db');

function getNodes() {
    const selectNodes = db.prepare(`
    SELECT *
    FROM node
`)
const nodes = selectNodes.all()
return nodes
}

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

function isSubPage(title) {
    return sanitizeTitle(title) !== title
}

function sanitizeTitle(title) {
    const [_, basePage, subPage] = title.match(/(.*?)\s*\/\s*(.*)/) || []
    if (subPage) return basePage
    return title
}

function getFirstSentence(text="") {
    const parsed = wtf(text)
    return parsed?.sentences()?.[0]?.text()
}

module.exports = {
    getNodes,
    getEdges,
    isSubPage,
    sanitizeTitle,
    getFirstSentence
}
