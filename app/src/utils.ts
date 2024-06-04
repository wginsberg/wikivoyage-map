const PROXY_URL = "/proxy"
const CLOUDFLARE_BUCKET_URL = "https://pub-5ba95de8cc2f4dada22bfe563b284734.r2.dev"

export function getMapTileHost() {
    // in development we proxy requests to cloudflare to avoid CORS
    // in production we make requests directly to cloudflare
    const host = process.env.NODE_ENV === "production"
        ? CLOUDFLARE_BUCKET_URL
        : PROXY_URL
    return host
}

export function getFormattedName(title: string): string {
    return title
        .replace(/ /g, "_")
        .replace(/&/g, '%26')
}

export function parseFormattedName(title: string): string {
    return title
        .replace(/_/g, " ")
        .replace(/%26/g, '&')
}
