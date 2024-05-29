import { Node } from "~types"
import Header from "./index"

type HeaderProps = {
    node: Node
}

export default function VerboseHeader(props: HeaderProps) {
    return (
        <h1>Where to go after {props.node.title}</h1>
    )
}