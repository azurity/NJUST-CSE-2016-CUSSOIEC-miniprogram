import { successRes, failRes } from '../../basicRes'
import { CourseWeekInfo } from '../CourseInfo'

export interface HistoryItem {
    weekInfo: CourseWeekInfo
    recordID: number
    count: number
}

interface history extends successRes {
    result: HistoryItem[]
}

export type historyRes = history | failRes
