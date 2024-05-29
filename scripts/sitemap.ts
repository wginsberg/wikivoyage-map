import { writeFileSync, appendFileSync } from "fs"
import nodes from "../public/world.json"

const host = process.argv.slice(-1)[0]
let url
try {
    url = new URL(host)
} catch(e) {
    console.error("Usage: sitemap <host>")
    process.exit(1)
}

const TARGET = "public/sitemap.xml"

interface Node {
    title: string,
    edges: any[]
}

interface NodeMap {
    [key: string]: Node;
}

const HEAD = `
<?xml version="1.0" encoding="UTF-8"?>
  <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
  >
`.trimStart()

const TAIL = `
</urlset>
`

writeFileSync(TARGET, HEAD)

for (const key in nodes) {
    const node = nodes[key] as Node
    const cleanKey = key
        .replace(/ /g, "_")
        .replace(/&/g, '%26')

    const cardinality = node.edges.length
    const priority = cardinality < 3
        ? 0.25
        : cardinality < 10
            ? 0.5
            : 1.0

    const xmlNode = getXMLNode(cleanKey, priority)

    appendFileSync(TARGET, xmlNode)
}

appendFileSync(TARGET, TAIL)

function getXMLNode(key: string, priority: number) {
    return `<url><loc>${host}/${key}</loc><priority>${priority}</priority></url>`
}
