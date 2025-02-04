import { type Node } from '~types'

export type TimezoneResponse = {
	zoneName: string
}

export function getTimezone(node: Node): Promise<TimezoneResponse> {
	const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=1L0OV6R8PU7S&format=json&by=position&lat=${node.lat}&lng=${node.lng}`
	return fetch(url).then(response => response.json())
}
