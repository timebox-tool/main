import { useTimer } from 'hooks/use-timer'
import { pick } from 'ramda'
import { useMemo } from 'react'
import { useEffectOnce } from 'react-use'
import { second2Minute } from 'util/time'

export type UseTimeBoxItemHookProps = {
	/** limit should be considered with unit of second */
	limit: number
}
export const useTimeBoxItemHook = (p: UseTimeBoxItemHookProps) => {
	const timer = useTimer()
	const timerOps = pick(['isTimerStopped', 'stop'], timer)

	/* -------------------------------------------------------------------------- */
	/*                                    READ                                    */
	/* -------------------------------------------------------------------------- */
	/** in a min-second format */
	const costTime = useMemo(() => second2Minute(timer.time), [timer.time])

	/* -------------------------------------------------------------------------- */
	/*                                   UTILITY                                  */
	/* -------------------------------------------------------------------------- */
	const isTimeout = useMemo(() => p.limit < timer.time, [timer.time, p.limit])

	/* -------------------------------------------------------------------------- */
	/*                                   EFFECT                                   */
	/* -------------------------------------------------------------------------- */
	useEffectOnce(timer.go)

	return { isTimeout, costTime, timerOps }
}
