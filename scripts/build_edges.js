import fs, { link } from 'fs'
import flow from 'xml-flow'
import Database from 'better-sqlite3';

// Init the database connection
const db = new Database('data.db');

// Init loading XML file
const inFile = fs.createReadStream('enwikivoyage-20220901-pages-articles-multistream.xml')
const xmlStream = flow(inFile)

// Stream XML and insert into database
const linksRe = /\[\[(.+?)(\||\]\])/g
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
    const index = text.indexOf("==Go next==")
    const goNextText = text.slice(index)
    const linkMatches = goNextText.matchAll(linksRe) || []

    for (const match of linkMatches) {
        const link = match[1]

        try {
            console.log(`${[title, link]}`)
            insert(title, link)
        }
        catch (err) {
            // Handle links with redirects
            if (err.code === 'SQLITE_CONSTRAINT_FOREIGNKEY') {
                const canonicalLink = selectRedirect.get(link)?.canonical
                if (!canonicalLink) {
                    console.log(`   -> broken link: ${link}`)
                    continue
                }
                try {
                    console.log(`   -> ${[title, canonicalLink]}`)
                    insert(title, canonicalLink)
                } catch (err2) {
                    if (err2.code === 'SQLITE_CONSTRAINT_FOREIGNKEY') {
                        console.log(`   -> broken redirect: ${canonicalLink}`)
                    } else {
                        throw err2
                    }
                }
            } else {
                throw err
            }
        }
    }
})
