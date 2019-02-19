import { successRes, failRes } from '../../basicRes'

interface item extends successRes {
    result: number
}

export type itemRes = item | failRes
