import { type LoaderFunctionArgs } from '@remix-run/node'
import { json } from "@remix-run/react";
import nodes from "~nodes"
import { type NodeMap } from '~types';

// For now we'll just return all data. In the future we can probably do something more slick
export async function loader({ request }: LoaderFunctionArgs) {
    return json(nodes as NodeMap)
}
