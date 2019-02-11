import { successRes, failRes } from '../basicRes'

export interface CourseItem {
    courseID: string
    active: number[]
    position: {
        dayOfWeek: number
        indexOfDay: number[]
    }
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
