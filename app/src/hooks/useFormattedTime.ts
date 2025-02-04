import { useCallback, useEffect, useState } from 'react'

function useFormattedTime(timezone?: string) {
	const [result, setResult] = useState<string>(formatTime(timezone))

	const updateTime = useCallback(() => {
		const localTime = formatTime(timezone)
		setResult(localTime)
	}, [timezone, setResult])

	useEffect(() => {
		updateTime()
		const interval = setInterval(updateTime, 1000)
		return () => clearInterval(interval)
	}, [timezone, setResult])

	return result
}

function formatTime(timezone?: string) {
	if (!timezone) return ''

	const formatter = new Intl.DateTimeFormat('en-US', {
		timeZone: timezone,
		hour: 'numeric',
		minute: 'numeric',
	})

	const localTime = formatter.format(new Date())

	return localTime
}

export default useFormattedTime
