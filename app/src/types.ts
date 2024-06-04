export interface Node {
    title: string;
    lat: number;
    lng: number;
    edges: string[];
    byline?: string;
}

export interface Edge {
    origin: Node,
    destination: Node
}
