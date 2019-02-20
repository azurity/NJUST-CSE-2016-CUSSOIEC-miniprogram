import { successRes, failRes } from '../../basicRes'

export interface HistoryItem {
    time: string
    count: number
}

interface history extends successRes {
    result: HistoryItem[]
}

export type historyRes = history | failRes