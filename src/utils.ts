const CLOUDFLARE_BUCKET_URL = "https://pub-5ba95de8cc2f4dada22bfe563b284734.r2.dev"

function getMapTileHost() {
    // in development we proxy requests to cloudflare to avoid CORS
    // in production we make requests directly to cloudflare
    const host = process.env.NODE_ENV === "production"
        ? CLOUDFLARE_BUCKET_URL
        : `http://${window.location.host}/proxy`
    return host
}

export {
    getMapTileHost
}
