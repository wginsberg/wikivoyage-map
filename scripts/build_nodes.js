import fs from 'fs'
import flow from 'xml-flow'
import Database from 'better-sqlite3';

// Init the database connection
const db = new Database('data.db');

// Init loading XML file
const inFile = fs.createReadStream('enwikivoyage-20220901-pages-articles-multistream.xml')
const xmlStream = flow(inFile)

// Stream XML and insert into database

const insertNode = db.prepare('INSERT INTO node (title) VALUES (?);')
const insertRedirect = db.prepare('INSERT INTO redirect (title, canonical) VALUES (?, ?);')

xmlStream.on('tag:page', page => {
    // Handle redirect entries
    if (page.redirect) {
        const title = page.title
        const canonical = page.redirect
        console.log(`${title} -> ${canonical}`)
        try {
            insertRedirect.run(title, canonical)
        } catch (err) {
            if (err.code !== 'SQLITE_CONSTRAINT_PRIMARYKEY') throw err
        }
    }
    // Handle pages
    else {
        console.log(page.title)
        try {
            insertNode.run(page.title)
        }
        catch (err) {
            if (err.code !== 'SQLITE_CONSTRAINT_PRIMARYKEY') throw err
        }
    }
})
