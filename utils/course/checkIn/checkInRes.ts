import { successRes, failRes } from '../../basicRes'

export interface CheckInfo {
    hasChecked: boolean
    isOpen: boolean
    time: string
}

interface checkIn extends successRes {
    result: CheckInfo
}

export type checkInRes = checkIn | failRes

interface checkInPost extends successRes {
    result: undefined
}

export type checkInPostRes = checkInPost | failRes
