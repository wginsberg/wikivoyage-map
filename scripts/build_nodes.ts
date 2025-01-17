import fs from 'fs'
import Database from 'better-sqlite3'
import flow from 'xml-flow'
import { hasCities, getFirstSentence } from './util'

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

const insertNode = db.prepare('INSERT INTO node (title, lat, lng, byline, is_region) VALUES (?, ?, ?, ?, ?);')

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

    const isRegion = hasCities(text)

    const cleanByline = getFirstSentence(text)

    // Logging
    const now = new Date().getTime()
    if (now - lastPrintTime > 1000) {
        console.log(CLEAR_OUTPUT)
        console.log(`Adding page ${page.title} (${lat}, ${lng}) ...`)
        lastPrintTime = now
    }

    // Add node to database
    insertNode.run(page.title, lat, lng, cleanByline, Number(isRegion))
})

xmlStream.on("end", () => process.exit(0))
