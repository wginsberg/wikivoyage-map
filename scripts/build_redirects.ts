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
const insertRedirect = db.prepare('INSERT INTO redirect (title, canonical) VALUES (?, ?);')

xmlStream.on('tag:page', page => {
    // Only process redirect pages
    if (!page.redirect) return

    const title = page.title
    const canonical = page.redirect

    // Logging
    const now = new Date().getTime()
    if (now - lastPrintTime > 1000) {
        console.log(CLEAR_OUTPUT)
        console.log(`Adding redirect ${title} -> ${canonical} ...`)
        lastPrintTime = now
    }

    // Add redirect to database
    try {
        insertRedirect.run(title, canonical)
    } catch (err) {
        return
    }
})

xmlStream.on("end", () => process.exit(0))
