import { writeFile } from 'fs/promises'
import { getNodesInBox, getEdgesForBox } from "../util/index.js";

const TARGET = 'data/mexico.json'

const mexicoBox = [ [13.659697, -123.424037], [33.790873, -85.455287]]

const nodes = getNodesInBox(...mexicoBox)
const edges = getEdgesForBox(...mexicoBox)

const formattedEdges = edges.map(edge => ({
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

const formattedResult = { nodes, edges: formattedEdges }
const resultString = JSON.stringify(formattedResult, null, 4)

writeFile(TARGET, resultString)
