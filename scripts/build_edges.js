import fs, { link } from 'fs'
import flow from 'xml-flow'
import Database from 'better-sqlite3';

// Init the database connection
const db = new Database('data.db');

// Init loading XML file
const inFile = fs.createReadStream('enwikivoyage-20220901-pages-articles-multistream.xml')
const xmlStream = flow(inFile)

// Stream XML and insert into database
const linksRe = /\[\[(.+?)\]\]/g
const insertEdge = db.prepare('INSERT INTO edge (origin, destination) VALUES (?, ?);')
let count = 0
xmlStream.on('tag:page', page => {
    if (page.redirect) return

    const title = page.title
    const text = page.revision.text["$text"]
    const index = text.indexOf("==Go next==")
    const goNextText = text.slice(index)
    const linkMatches = goNextText.matchAll(linksRe) || []

    console.log(page.title)

    for (const match of linkMatches) {
        const link = match[1]
        console.log(` * ${link}`)
        try {
            insertEdge.run(title, link)
        }
        catch (err) {
            // if (err.code === 'SQLITE_CONSTRAINT_PRIMARYKEY') {
            //     console.log(`Ignoring edge (${title}, ${link})`)
            //     return
            // }
            if (err.code === 'SQLITE_CONSTRAINT_FOREIGNKEY') {
                console.log(`Ignoring edge (${title}, ${link}) - SQLITE_CONSTRAINT_FOREIGNKEY`)
                continue
            }
            throw err
        }
    }


    count += 1
    if (count === 100) process.exit(0)
})
