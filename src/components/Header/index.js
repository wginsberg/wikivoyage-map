function Header(props) {
    const { node } = props

    const title = node?.title
    const href = `https://en.wikivoyage.org/wiki/${title}`

    const content = node
        ? (<a href={href} target="_blank" rel="noreferrer">{title}</a>)
        : "Where can I go?"

    return (
        <header id="header">
            {content}
        </header>
    )

}

export default Header
