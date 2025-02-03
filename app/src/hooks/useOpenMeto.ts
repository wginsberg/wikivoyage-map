import { useEffect, useState } from 'react'
import { Node } from '~types'

export type Forecast = {
	elevation: Number
	current: {
		temperature_2m: Number
		time: Date
	}
	current_units: {
		temperature_2m: string
	}
}

function useOpenMeto(node: Node) {
	const [result, setResult] = useState<Forecast>()

	useEffect(() => {
		setResult(undefined)
		if (!node) return

		const url = `https://api.open-meteo.com/v1/forecast?latitude=${node.lat}&longitude=${node.lng}&current=temperature_2m`
		fetch(url)
			.then(response => response.json())
			.then(result => {
				setResult(result as Forecast)
				console.log(result)
			})
	}, [node?.lat, node?.lng])

	return result
}

export default useOpenMeto
