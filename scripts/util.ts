import Database from 'better-sqlite3'
// There's something weird going on with this package, only works like this ...
import wtf from 'wtf_wikipedia'
import { type Node, type Edge } from  './types'

// Init the database connection
const db = new Database('data.db');

function getNodes(): Node[] {
    const selectNodes = db.prepare(`
    SELECT *
    FROM node
`)
const nodes = selectNodes.all()
return nodes as Node[]
}

function getEdges(): Edge[] {
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
    return edges as Edge[]
}

function isSubPage(title: string) {
    return sanitizeTitle(title) !== title
}

function sanitizeTitle(title: string) {
    
    const [_, basePage, subPage] = title.match(/(.*?)\s*\/\s*(.*)/) || []
    if (subPage) return basePage
    return title
}

function getFirstSentence(text="") {
    const parsed = wtf(text)
    const sentenceText = parsed?.sentences()?.[0]?.text()
    if (!sentenceText) return ""
    // This is catches a few hundred articles that don't get parsed correctly
    const sentenceTextWithoutTrailingSections =  sentenceText.split("==")[0]
    return sentenceTextWithoutTrailingSections.trim()
}


const CITIES_HEADER = "==Cities=="
function hasCities(text=""): boolean {
    const citiesIndex = text.indexOf(CITIES_HEADER)
    if (citiesIndex === -1) return false

    const nextSectionIndex = text.slice(citiesIndex + CITIES_HEADER.length)
        .trimStart()
        .indexOf("==")

    if (nextSectionIndex > 0) return true

    return false
}

export {
    getNodes,
    getEdges,
    isSubPage,
    sanitizeTitle,
    getFirstSentence,
    hasCities
}
