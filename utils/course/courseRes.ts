import { successRes, failRes } from '../basicRes'

interface course extends successRes {
    result: [{
        courseID: string,
        active: number[],
        position: {
            dayOfWeek: number,
            indexOfDay: number[]
        },
        info: {
            name: string,
            teacher: string,
            location: string
        }
    }]
}

export type scheduleRes = course | failRes