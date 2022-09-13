import { writeFile } from 'fs/promises'
import { getNodesInBox, getEdgesForBox } from "../util/index.js";

const TARGET = 'data/mexico.json'

const mexicoBox = [ [17.207499916286604, -102.2534757511977], [22.35779771239463, -93.07562564894218]]

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
