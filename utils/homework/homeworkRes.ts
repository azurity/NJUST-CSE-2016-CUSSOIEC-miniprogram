import { successRes, failRes } from '../basicRes'

interface homework extends successRes {
    result: {
        homeworkList: []
    }
}

export type homeworkRes = homework | failRes

interface answer extends successRes {
    result: null
}

export type answerRes = answer | failRes

interface question extends successRes {
    result: null
}

export type questionRes = question | failRes

interface questionPost extends successRes {
    result: null
}

export type questionPostRes = questionPost | failRes