import { successRes, failRes } from '../basicRes'

export interface CheckInfo {
    hasChecked: boolean
    stage: number
}

interface checkIn extends successRes {
    result: CheckInfo
}

export type checkInRes = checkIn | failRes
