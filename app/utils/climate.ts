export type Forecast = {
	elevation: number
	current: {
		temperature_2m: number
		time: string
		weather_code: WeatherCode
	}
	current_units: {
		temperature_2m: '°C' | '°F'
	}
}

export type WeatherCode =
	| 0
	| 1
	| 2
	| 3
	| 45
	| 48
	| 51
	| 53
	| 55
	| 56
	| 57
	| 61
	| 63
	| 65
	| 66
	| 67
	| 71
	| 73
	| 75
	| 77
	| 80
	| 81
	| 82
	| 85
	| 86
	| 95
	| 96
	| 99

type WeatherDescription = {
	[code in WeatherCode]: string
}

export const weatherDescriptions: WeatherDescription = {
	0: 'Clear sky',
	1: 'Mainly clear, partly cloudy, and overcast',
	2: 'Mainly clear, partly cloudy, and overcast',
	3: 'Mainly clear, partly cloudy, and overcast',
	45: 'Fog and depositing rime fog',
	48: 'Fog and depositing rime fog',
	51: 'Drizzle: Light, moderate, and dense intensity',
	53: 'Drizzle: Light, moderate, and dense intensity',
	55: 'Drizzle: Light, moderate, and dense intensity',
	56: 'Freezing Drizzle: Light and dense intensity',
	57: 'Freezing Drizzle: Light and dense intensity',
	61: 'Rain: Slight, moderate and heavy intensity',
	63: 'Rain: Slight, moderate and heavy intensity',
	65: 'Rain: Slight, moderate and heavy intensity',
	66: 'Freezing Rain: Light and heavy intensity',
	67: 'Freezing Rain: Light and heavy intensity',
	71: 'Snow fall: Slight, moderate, and heavy intensity',
	73: 'Snow fall: Slight, moderate, and heavy intensity',
	75: 'Snow fall: Slight, moderate, and heavy intensity',
	77: 'Snow grains',
	80: 'Rain showers: Slight, moderate, and violent',
	81: 'Rain showers: Slight, moderate, and violent',
	82: 'Rain showers: Slight, moderate, and violent',
	85: 'Snow showers slight and heavy',
	86: 'Snow showers slight and heavy',
	95: 'Thunderstorm: Slight or moderate',
	96: 'Thunderstorm with slight and heavy hail',
	99: 'Thunderstorm with slight and heavy hail',
}

export const weatherEmoji: WeatherDescription = {
	0: '☀️',
	1: '🌤️',
	2: '🌤️',
	3: '🌤️',
	45: '☁️',
	48: '☁️',
	51: '🌧️',
	53: '🌧️',
	55: '🌧️',
	56: '🌧️',
	57: '🌧️',
	61: '🌧️',
	63: '🌧️',
	65: '🌧️',
	66: '🌧️',
	67: '🌧️',
	71: '🌨️',
	73: '🌨️',
	75: '🌨️',
	77: '🌨️',
	80: '🌨️',
	81: '🌨️',
	82: '🌨️',
	85: '🌨️',
	86: '🌨️',
	95: '⛈️',
	96: '⛈',
	99: '⛈',
}

export type TemperatureUnits = '°C' | '°F'

export async function getForecast(lat: number, lng: number): Promise<Forecast> {
	console.log('getForecast', lat, lng)
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code`
	const forecast: Forecast = await fetch(url).then(response => response.json())
	console.log('forecast', forecast)
	return forecast
}
