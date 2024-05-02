const CLOUDFLARE_BUCKET_URL = "https://pub-5ba95de8cc2f4dada22bfe563b284734.r2.dev"

function isAllowedToAccessMapTileHost(host: string): boolean {
    const isProxiedMapTileHost = host === ""
    if (isProxiedMapTileHost) return true

    const isLocalhostEnvironment = window.location.host.split(":")[0] === 'localhost'
    if (!isLocalhostEnvironment) return true

    return false
}

function getMapTileHost() {
    // in development we proxy requests to cloudflare to avoid CORS
    // in production we make requests directly to cloudflare
    const host = process.env.NODE_ENV === "production"
        ? CLOUDFLARE_BUCKET_URL
        : ""
    return host
}

export {
    isAllowedToAccessMapTileHost,
    getMapTileHost
}
