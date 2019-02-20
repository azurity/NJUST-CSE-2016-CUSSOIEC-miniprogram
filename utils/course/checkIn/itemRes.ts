import { successRes, failRes } from '../../basicRes'

interface item extends successRes {
    result: string
}

export type itemRes = item | failRes
