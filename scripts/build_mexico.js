import path from 'path'
import { fileURLToPath } from 'url'
import { readFile, writeFile } from 'fs/promises'
// import { getNodesInBox, getEdgesForBox } from "./util.js";
import { getNodes, getEdges } from "./util.js";
import pointInPolygon from 'point-in-polygon'

const TARGET = 'public/data/mexico.json'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const geojson = await readFile(path.resolve(dirname, './countries.geojson'))
    .then(JSON.parse)

const [polygons] = geojson
    .features
    .filter(({ properties: { ISO_A3 }}) => ISO_A3 === "MEX")
    .map(({ geometry: { coordinates} }) => coordinates)

// const nodes = getNodes()
//     .filter(({ lat, lng }) => polygons.some(([polygon]) => pointInPolygon([lng, lat], polygon)))

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

await writeFile(TARGET, resultString)
