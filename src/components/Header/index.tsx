import ExternalLinkIcon from "./ExternalLinkIcon"
import { type Node } from "../../types";
import HeaderContent from "./HeaderContent"
import EmptyHeaderContent from "./EmptyHeaderContent";
import VerboseHeader from "./VerboseHeader";

type HeaderProps = {
    verbose: boolean,
    node?: Node
}

function Header(props: HeaderProps) {
    const { verbose, node } = props

    if (!node) {
        return (
            <header>
                <EmptyHeaderContent />
            </header>
        )
    }

    return (
        <header>
            {verbose && <VerboseHeader node={node} /> }
            <HeaderContent node={node} />
        </header>
    )

}

export default Header
