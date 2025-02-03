//api.timezonedb.com/v2.1/get-time-zone?key=YOUR_API_KEY&format=xml&by=position&lat=40.689247&lng=-74.044502

import { useEffect, useState } from 'react'
import { Node } from '~types'

export type TimezoneResponse = {
	zoneName: string
}

function useTimezone(node: Node) {
	const [result, setResult] = useState<TimezoneResponse>()

	useEffect(() => {
		setResult(undefined)
		if (!node) return

		const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=1L0OV6R8PU7S&format=json&by=position&lat=${node.lat}&lng=${node.lng}`
		fetch(url)
			.then(response => response.json())
			.then(result => {
				setResult(result as TimezoneResponse)
				console.log(result)
			})
	}, [node?.lat, node?.lng])

	return result
}

export default useTimezone
