const path = require('path')
const { readFileSync, writeFileSync } = require('fs')
const { getEdges } = require("./util.js")
const pointInPolygon = require('point-in-polygon')

const TARGET = 'public/data/mexico.json'

const dirname = __dirname
const fileName = path.resolve(dirname, './countries.geojson')
const buffer = readFileSync(fileName)
const geojson = JSON.parse(buffer)

const [polygons] = geojson
    .features
    .filter(({ properties: { ISO_A3 }}) => ISO_A3 === "MEX")
    .map(({ geometry: { coordinates} }) => coordinates)

const edges = getEdges()
    .filter((edge) => {
        const { originLng, originLat, destinationLng, destinationLat} = edge
        const originInPoly = polygons.some(([polygon]) => pointInPolygon([originLng, originLat], polygon))
        const destInPoly = polygons.some(([polygon]) => pointInPolygon([destinationLng, destinationLat], polygon))
        return originInPoly || destInPoly
    })
    .map(edge => ({
        origin: {
            title: edge.origin,
            lat: edge.originLat,
            lng: edge.originLng
        },
        destination: {
            title: edge.destination,
            lat: edge.destinationLat,
            lng: edge.destinationLng
        }
    }))

const nodes = {}
for (const edge of edges) {
    for (const node of [edge.origin, edge.destination]) {
        if (nodes[node.title]) continue
        nodes[node.title] = node
    }
}

const formattedResult = {
    nodes: Object.values(nodes),
    edges: edges
}
const resultString = JSON.stringify(formattedResult, null, 4)

writeFileSync(TARGET, resultString)
