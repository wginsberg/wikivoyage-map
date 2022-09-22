function Footer(props) {
    const { activeNode = {}, activeEdges = [] } = props
    const activeTitle = activeNode.title

    const titles = activeEdges
        .map((edge) => [edge.origin.title, edge.destination.title])
        .flat()
        .filter(title => title !== activeTitle)
        |> [...new Set(#)]
        .sort()

    return (
        <ul>
            {titles.map(title => (
                <li key={title}>
                    <a
                        href={`https://en.wikivoyage.org/wiki/${title}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {title}
                    </a>
                </li>
            ))}
        </ul>
    )
}

export default Footer
