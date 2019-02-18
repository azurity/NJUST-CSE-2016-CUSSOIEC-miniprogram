import { successRes, failRes } from '../basicRes'

export interface PersonInfo {
    userType: string
    college: string
    personID: string
    realName: string
    nickName: string
    gender: string
    grade: string
    academy: string
    major: string
    phone: string
    email: string
}

interface info extends successRes {
    result: PersonInfo
}

export type infoRes = info | failRes

interface infoPost extends successRes {
    result: undefined
}

export type infoPostRes = infoPost | failRes
