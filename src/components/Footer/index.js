function Footer(props) {
    const { activeNode = {}, activeEdges = [] } = props
    const activeTitle = activeNode.title

    const titleSet = activeEdges.reduce((titles, edge) => {
        titles.add(edge.origin.title)
        titles.add(edge.destination.title)
        return titles
    }, new Set())
    titleSet.delete(activeTitle)

    const titles = [...titleSet].sort()

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
