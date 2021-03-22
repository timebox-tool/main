import { is } from 'ramda'

export const event2Value = (e: { target: { value: any } }) => e.target.value

export const isArray = <T>(v: any): v is ArrayLike<T> => {
    return is(Array)(v)
}