import ExternalLinkIcon from "./ExternalLinkIcon"
import { type Node } from "../../types";

type HeaderProps = {
    node?: Node
}

function Header(props: HeaderProps) {
    const { node } = props

    if (!node) {
        return <header>Click a location to see where you could go next</header>
    }

    const { title, byline } = node
    const href = `https://en.wikivoyage.org/wiki/${title}`

    const trimmedByline = byline?.startsWith(title)
        ? byline.slice(title.length).trimStart()
        : byline

    return (
        <header>
            <a href={href} target="_blank" rel="noreferrer">
                {title}
                <ExternalLinkIcon />
            </a>
            {trimmedByline}
        </header>
    )

}

export default Header
