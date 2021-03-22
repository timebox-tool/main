import { add } from "ramda"
import { useState } from "react"

/** millisecond */
const timeStep = 1000

export const useTimer = () => {
    const [time, setSnd] = useState(0)
    const [id, setId] = useState<number>()
    const go = () => {
        const fn = () => setSnd(add(1))
        const id = window.setInterval(fn, timeStep)
        setId(id)
    }
    const stop = () => {
        clearInterval(id)
    }
    return {
        time,
        stop,
        go,
    }
}
