import { add } from 'ramda';
import { useState } from 'react';
import { useToggle } from 'react-use';

/** millisecond */
const timeStep = 1000

export const useTimer = () => {
	const [time, setSnd] = useState(0)
	const [isTimerStopped, setIsTimerStopped] = useToggle(false)
	const stopTimer = () => setIsTimerStopped(true)
	const [id, setId] = useState<number>()

	/* -------------------------------------------------------------------------- */
	/*                                    WRITE                                   */
	/* -------------------------------------------------------------------------- */
	const go = () => {
		const fn = () => setSnd(add(1))
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
