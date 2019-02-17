import { successRes, failRes } from '../basicRes'

interface live extends successRes {
    result: {
        isLive: boolean
        url: string
    }
}

export type liveRes = live | failRes