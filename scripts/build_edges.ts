const fs = require('fs')
const Database = require('better-sqlite3')
const flow = require('xml-flow')

// Setup logging
const CLEAR_OUTPUT = "\x1b[2J\x1b[;H"
let lastPrintTime = 0

// Init the database connection
const db = new Database('data.db');

// Init loading XML file
const inFile = fs.createReadStream('enwikivoyage-latest-pages-articles-multistream.xml')
const xmlStream = flow(inFile)

// Stream XML and insert into database
const goNextRegex = /==Go next==(.*?)({{routebox|$)/
const linksRegex = /\[\[(.+?)(\||\]\])/g
const insertEdge = db.prepare('INSERT INTO edge (origin, destination) VALUES (?, ?);')
const selectRedirect = db.prepare('SELECT canonical FROM redirect WHERE title = ?;')

function insert(origin, destination) {
    const nodes = [origin, destination].sort()
    insertEdge.run(...nodes)
}

xmlStream.on('tag:page', page => {
    if (page.redirect) return

    const title = page.title
    const text = page.revision.text["$text"] || ""
    const goNextMatch = text.match(goNextRegex) || []
    const goNextText = goNextMatch[1] || ""
    const linkMatches = goNextText.matchAll(linksRegex) || []

    for (const match of linkMatches) {
        const link = match[1]

        // Logging
        const now = new Date().getTime()
        if (now - lastPrintTime > 1000) {
            console.log(CLEAR_OUTPUT)
            console.log(`Adding edge (${title}, ${link}) ...`)
            lastPrintTime = now
        }

        try {
            insert(title, link)
        }
        catch (err) {
            // Handle links with redirects
            if (err.code === 'SQLITE_CONSTRAINT_FOREIGNKEY') {
                const canonicalLink = selectRedirect.get(link)?.canonical
                if (!canonicalLink) continue
                try {
                    insert(title, canonicalLink)
                } catch (err2) {
                    // Ignore broken redirects
                    if (err2.code === 'SQLITE_CONSTRAINT_FOREIGNKEY') continue
                    // Ignore redirects that result in duplicate entries
                    if (err2.code === 'SQLITE_CONSTRAINT_PRIMARYKEY') continue
                    throw err2
                }
            } else if (err.code === 'SQLITE_CONSTRAINT_PRIMARYKEY') {
                // Ignore duplicate entries
                continue
            } else {
                throw err
            }
        }
    }
})

xmlStream.on("end", () => process.exit(0))
