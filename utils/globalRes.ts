import { successRes, failRes } from './basicRes'

interface openid extends successRes {
    result: string
}

export type openidRes = openid | failRes

interface studentID extends successRes {
    result: string
}

export type studentIDRes = studentID | failRes

interface binding extends successRes {
    result: string
}

export type bindingRes = binding | failRes