export const second2Minute = (s: number) => {
    return {
        minutes: Math.floor(s / 60),
        reservedSeconds: s % 60,
    }
}

export const minute2Second = (m: number) => {
    return m * 60
}
