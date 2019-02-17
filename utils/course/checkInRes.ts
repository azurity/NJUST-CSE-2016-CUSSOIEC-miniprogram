import { successRes, failRes } from '../basicRes'

export interface CheckInfo {
    hasChecked: boolean
    isOpen: boolean
}

interface checkIn extends successRes {
    result: CheckInfo
}

export type checkInRes = checkIn | failRes
