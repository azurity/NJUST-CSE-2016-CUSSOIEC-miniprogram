import { successRes, failRes } from '../basicRes'

interface homework extends successRes {
    result: null
}

export type homeworkRes = homework | failRes

interface answer extends successRes {
    result: null
}

export type answerRes = answer | failRes