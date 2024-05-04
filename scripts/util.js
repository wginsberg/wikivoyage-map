const Database = require('better-sqlite3')

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

function sanitizeArticleText(text, maxLength) {
    const pageBannerRe = /(({{.+?}}\s*)|(\[\[.+?\]\]\s*))*/
    const bylineStartIndex = text.match(pageBannerRe)[0].length
    const byline = text.slice(bylineStartIndex, bylineStartIndex + maxLength)

    const cleanByline = byline
        // Convert to a single line to make subsequent regex easier
        .replaceAll(/\n/g, "")
        // Remove any additional sections after the byline
        .replace(/==.*/, "")
        // Use alternate text for links with alternate text
        .replaceAll(/\[\[.+?\|(.+?)\]\]/g, (match, group) => group)
        // Otherwise strip the links
        .replaceAll(/(\[\[)|(\]\])|(''')|('')/g, "")
        .replaceAll(/\[.+?\s(.+?)\]/g, (match, group) => group)
        .trim()
        // Ensure it ends in "." or "..."
        .replace(/(?<!\.)$/, "...")
    
    return cleanByline
}

module.exports = {
    getNodes,
    getEdges,
    isSubPage,
    sanitizeTitle,
    sanitizeArticleText
}
