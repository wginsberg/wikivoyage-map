import jsonData from "./world.json"

interface Node {
    title: string;
    lat: number;
    lng: number;
    edges: string[];
    subs?: string[];
}

interface NodeMap {
    [key: string]: Node;
}

const nodes = jsonData as NodeMap

export default nodes
