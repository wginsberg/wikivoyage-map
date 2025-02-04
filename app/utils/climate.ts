export type Forecast = {
	elevation: Number
	current: {
		temperature_2m: Number
		time: string
	}
	current_units: {
		temperature_2m: string
	}
}

export function getForecast(lat: number, lng: number): Promise<Forecast> {
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m`
	return fetch(url).then(response => response.json())
}
