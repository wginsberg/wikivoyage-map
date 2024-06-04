import { Edge, type Node } from "~types"

type ConnectionsProps = {
    verbose: boolean
    activeNode?: Node
    activeEdges?: Edge[]
    hoverNode?: Node
    onClick: (title: string) => void
    onMouseEnter: (title: string) => void
    onMouseLeave: () => void
}

function Connections(props: ConnectionsProps) {
    const { verbose, activeNode, activeEdges, hoverNode, onClick, onMouseEnter, onMouseLeave } = props
    const activeTitle = activeNode?.title
    const hoverTitle = hoverNode?.title

    const titles = activeEdges
        ?.map((edge) => [edge.origin.title, edge.destination.title])
        .flat()
        .filter(title => title !== activeTitle)

    const uniqueTitles = [...new Set(titles)]

    const sortedTitles = uniqueTitles.sort()

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
                        <button
                            className={title === hoverTitle ? "active" : ""}
                            onClick={() => onClick(title)}
                            onMouseEnter={() => onMouseEnter(title)}
                            onMouseLeave={onMouseLeave}
                        >
                            {title}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Connections
