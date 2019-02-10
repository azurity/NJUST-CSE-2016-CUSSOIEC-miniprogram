import { successRes, failRes } from './basicRes'

interface openid extends successRes {
    result: string
}

export type openidRes = openid | failRes

interface personID extends successRes {
    result: {
        college: string
        personID: string
    }
}

export type personIDRes = personID | failRes

interface binding extends successRes {
    result: undefined
}

export type bindingRes = binding | failRes