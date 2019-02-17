import { successRes, failRes } from '../basicRes'

interface PositionItem {
    dayOfWeek: number
    indexOfDay: number[]
}

export interface CourseItem {
    courseID: string
    active: number[]
    position: PositionItem[]
    info: {
        name: string
        teacher: string
        location: string
    }
}

interface course extends successRes {
    result: CourseItem[]
}

export type scheduleRes = course | failRes
