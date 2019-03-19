import { successRes, failRes } from '../basicRes'

export interface HomeworkItem {
    name: string
    homeworkID: string
    isFinished: boolean
}

interface homework extends successRes {
    result: HomeworkItem[]
}

export type homeworkRes = homework | failRes

interface answer extends successRes {
    result: undefined
}

export type answerRes = answer | failRes

export interface ChoseItem {
    choseIndex: string
    name: string
    checked?: 0 | 1 | 2
}

export interface QuestionItem {
    type: 0 | 1
    questionIndex: string
    question: string
    imageURLs: { url: string }[]
    choseList: ChoseItem[]
    correctAnswer: string[]
    userAnswer: string[]
}

interface question extends successRes {
    result: QuestionItem[]
}

export type questionRes = question | failRes

interface questionPost extends successRes {
    result: undefined
}

export type questionPostRes = questionPost | failRes
