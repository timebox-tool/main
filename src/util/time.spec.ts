import { second2Minute } from "./time"

describe("seconds to minutes", () => {
    it("no remainder seconds", () => {
        const res = second2Minute(300)
        expect(res.minutes).toEqual(5)
        expect(res.reservedSeconds).toEqual(0)
    })
    it("has remainder seconds", () => {
        const res = second2Minute(303)
        expect(res.minutes).toEqual(5)
        expect(res.reservedSeconds).toEqual(3)
    })
})
