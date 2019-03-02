import { successRes, failRes } from '../basicRes'

export interface resourceItem {
    name: string
    url: string
    isDownLoad: boolean
}

interface resourceList extends successRes {
    result: resourceItem[]
}

export type resourceRes = resourceList | failRes
