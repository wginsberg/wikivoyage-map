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
