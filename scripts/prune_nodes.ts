// Removes any nodes which are both
// 1. A region containing distinct cities
// 2. Not connected to any other node

import Database from 'better-sqlite3'
import { type Node } from './types';

// Setup logging
const CLEAR_OUTPUT = "\x1b[2J\x1b[;H"
let lastPrintTime = 0

// Initiate db connection
const db = new Database('data.db');

const selectNodes = db.prepare(`
    SELECT title, count(*)
    FROM node
        LEFT JOIN edge
            ON node.title = edge.origin
                OR node.title = edge.destination
    WHERE is_region = true
    GROUP BY node.title
    HAVING count(*) = 1
`)

const deleteNode = db.prepare(`
    DELETE
    FROM node
    WHERE title = ?
`)

// Find nodes that we want to remove
const nodes = selectNodes.all() as Node[]

console.log(`Found ${nodes.length} nodes to delete`)

// Remove nodes one by one
for (const node of nodes) {
    const { title } = node
    // Logging
    const now = new Date().getTime()
    if (now - lastPrintTime > 250) {
        console.log(CLEAR_OUTPUT)
        console.log(`Deleting node (${title}) ...`)
        lastPrintTime = now
    }
    
    deleteNode.run(title)
}

console.log(`Removed ${nodes.length} nodes`)