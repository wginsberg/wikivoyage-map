import { type Node } from "../../types";
import ExternalLinkIcon from "./ExternalLinkIcon"

type HeaderProps = {
    node: Node
}

function Header(props: HeaderProps) {
    const { node } = props

    const { title, byline } = node
    const href = `https://en.wikivoyage.org/wiki/${title}`

    const trimmedByline = byline?.startsWith(title)
        ? byline.slice(title.length).trimStart()
        : byline

    return (
        <>
            <a href={href} target="_blank" rel="noreferrer">
                {title}
                <ExternalLinkIcon />
            </a>
            {trimmedByline}
        </>
    )

}

export default Header
