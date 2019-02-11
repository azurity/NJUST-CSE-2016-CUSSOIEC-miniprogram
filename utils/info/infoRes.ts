import { successRes, failRes } from '../basicRes'

interface info extends successRes {
    result: {
        userType: string,
        college: string,
        personID: string,
        realName: string,
        nickName: string,
        gender: string,
        grade: string,
        academy: string,
        major: string,
        phone: string,
        email: string
    }
}

export type infoRes = info | failRes

interface infoPost extends successRes {
    result: null
}

export type infoPostRes = infoPost | failRes

