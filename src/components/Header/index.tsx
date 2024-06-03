import ExternalLinkIcon from "./ExternalLinkIcon"
import { type Node } from "../../types";
import HeaderContent from "./HeaderContent"
import EmptyHeaderContent from "./EmptyHeaderContent";
import VerboseHeader from "./VerboseHeader";

type HeaderProps = {
    verbose: boolean,
    nodeTitle?: string,
    node?: Node
}

function Header(props: HeaderProps) {
    const { verbose, nodeTitle, node } = props

    if (!node) {
        return (
            <header>
                <EmptyHeaderContent />
            </header>
        )
    }

    return (
        <header>
            {verbose && nodeTitle && <VerboseHeader nodeTitle={nodeTitle} /> }
            <HeaderContent node={node} />
        </header>
    )

}

export default Header
