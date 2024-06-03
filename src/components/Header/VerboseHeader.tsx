import { Node } from "~types"
import Header from "./index"

type HeaderProps = {
    nodeTitle: string
}

export default function VerboseHeader(props: HeaderProps) {
    return (
        <h1>Where to go after {props.nodeTitle}</h1>
    )
}