const fs = require('fs')
const flow = require('xml-flow')
const Database = require('better-sqlite3')
const { sanitizeArticleText } = require('./util')

MAX_BYLINE_LENGTH = 150

// Setup logging
const CLEAR_OUTPUT = "\x1b[2J\x1b[;H"
let lastPrintTime = 0

// Init the database connection
const db = new Database('data.db');

// Init loading XML file
const inFile = fs.createReadStream('enwikivoyage-latest-pages-articles-multistream.xml')
const xmlStream = flow(inFile)

// Stream XML and insert into database
const geoRe = /{{geo\|([0-9-\.]+)\|([0-9-\.]+).*?}}/i
const pageBannerRe = /(({{.+?}}\s*)|(\[\[.+?\]\]\s*))*/

const insertNode = db.prepare('INSERT INTO node (title, lat, lng, byline) VALUES (?, ?, ?, ?);')

let count = 0

xmlStream.on('tag:page', page => {
    // Only process article pages
    if (page.redirect) return

    const text = page.revision.text?.["$text"]
    if (!text) return

    // Only process pages with geo locations
    const geoMatch = text.match(geoRe)
    if (!geoMatch) return
    const [lat, lng] = geoMatch.slice(1, 3)

    const cleanByline = sanitizeArticleText(text, MAX_BYLINE_LENGTH)

    // Logging
    const now = new Date().getTime()
    if (now - lastPrintTime > 1000) {
        console.log(CLEAR_OUTPUT)
        console.log(`Adding page ${page.title} (${lat}, ${lng}) ...`)
        lastPrintTime = now
    }

    // Add node to database
    insertNode.run(page.title, lat, lng, cleanByline)
})
