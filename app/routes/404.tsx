import { ClientOnly } from "remix-utils/client-only"

export default function() {
    return (
        <div>
            <p>404</p>
            <ClientOnly fallback={<p>Fallback</p>}>
            {
                () => <p>Client code</p>
            }
            </ClientOnly>
        </div>
    )
}
