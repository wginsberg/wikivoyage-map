function Footer(props) {
    const { activeNode = {}, activeEdges = [], hoverNode = {}, onMouseEnter, onMouseLeave } = props
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
                        <a
                            href={`https://en.wikivoyage.org/wiki/${title}`}
                            target="_blank"
                            rel="noreferrer"
                            className={title === hoverTitle ? "active" : ""}
                            onMouseEnter={() => onMouseEnter(title)}
                            onMouseLeave={onMouseLeave}
                        >
                            {title}
                        </a>
                    </li>
                ))}
            </ul>
        </footer>
    )
}

export default Footer
