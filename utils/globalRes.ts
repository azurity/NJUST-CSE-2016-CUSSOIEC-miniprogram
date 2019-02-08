import { successRes, failRes } from './basicRes'

interface openid extends successRes {
    result: string
}

export type openidRes = openid | failRes

interface binding extends successRes {
    result: null
}

export type bindingRes = binding | failRes