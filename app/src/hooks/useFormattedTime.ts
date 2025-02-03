import { useCallback, useEffect, useState } from 'react'

function useFormattedTime(timezone?: string) {
	const [result, setResult] = useState<string>()

	const updateTime = useCallback(() => {
		const localTimeOptions = {
			timeZone: timezone,
			hour: 'numeric',
			minute: 'numeric',
		}

		// the fuck it gives a type error
		const localTime = timezone
			? new Intl.DateTimeFormat('en-US', localTimeOptions).format(new Date())
			: ''
		setResult(localTime)
	}, [timezone, setResult])

	useEffect(() => {
		updateTime()
		const interval = setInterval(updateTime, 1000)
		return () => clearInterval(interval)
	}, [timezone, setResult])

	return result
}

export default useFormattedTime
