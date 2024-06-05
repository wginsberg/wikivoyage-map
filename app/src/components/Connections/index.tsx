import { Link } from "@remix-run/react"
import { type Edge, type Node } from "~types"
import { getFormattedName } from "~utils"

type ConnectionsProps = {
    verbose: boolean
    activeNode?: Node
    activeEdges?: Edge[]
    hoverNode?: Node
    onMouseEnter: (title: string) => void
    onMouseLeave: () => void
}

function Connections(props: ConnectionsProps) {
    const { verbose, activeNode, activeEdges, hoverNode, onMouseEnter, onMouseLeave } = props
    const activeTitle = activeNode?.title
    const hoverTitle = hoverNode?.title

    const titles = activeEdges
        ?.map((edge) => [edge.origin.title, edge.destination.title])
        .flat()
        .filter(title => title !== activeTitle)

    return (
        <div className="connections">
            {
                verbose && activeNode?.title &&
                <p style={{ textAlign: "center" }}>
                    After visiting {activeNode.title} you could go next to
                </p>
            }
            <ul>
                {titles?.map(title => (
                    <li key={title}>
                        <Link
                            className={title === hoverTitle ? "active" : ""}
                            to={`/after/${getFormattedName(title)}`}
                            onMouseEnter={() => onMouseEnter(title)}
                            onMouseLeave={onMouseLeave}
                            replace
                        >
                            {title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Connections
