import { CLOUDFLARE_R2_URL } from "~constants"
import { type NodeMap } from "~types"

const URL = `${CLOUDFLARE_R2_URL.NODES}/world_edges.json`

let nodePromise: Promise<NodeMap>

export async function getNodes(): Promise<NodeMap> {
    nodePromise = nodePromise || fetch(URL).then(response => response.json())
    return nodePromise
}
