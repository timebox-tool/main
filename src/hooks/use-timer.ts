import { useState } from 'react'
import { useToggle } from 'react-use'

/** millisecond */
const timeStep = 1000

export const useTimer = () => {
	const [time, setTime] = useState(0)
	const [startTime, setStartTime] = useState<Date>(new Date())
	const [isTimerStopped, setIsTimerStopped] = useToggle(false)
	const stopTimer = () => setIsTimerStopped(true)
	const [id, setId] = useState<number>()

	/* -------------------------------------------------------------------------- */
	/*                                    WRITE                                   */
	/* -------------------------------------------------------------------------- */
	const go = () => {
		setStartTime(new Date())
		const fn = () => {
			const seconds = Math.floor((Date.now() - startTime.getTime()) / 1000)
			setTime(seconds)
		}
		const id = window.setInterval(fn, timeStep)
		setId(id)
	}

	const stop = () => {
		clearInterval(id)
		stopTimer()
	}

	return {
		time,
		isTimerStopped,
		stop,
		go
	}
}
