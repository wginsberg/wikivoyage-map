function Footer(props) {
    const { activeNode = {}, activeEdges = [], hoverNode = {}, onClick, onMouseEnter, onMouseLeave } = props
    const activeTitle = activeNode.title
    const hoverTitle = hoverNode.title

    const titles = activeEdges
        .map((edge) => [edge.origin.title, edge.destination.title])
        .flat()
        .filter(title => title !== activeTitle)
        |> [...new Set(#)]
        .sort()

    return (
        <footer>
            <ul>
                {titles.map(title => (
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
        </footer>
    )
}

export default Footer
