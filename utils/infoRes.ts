import { successRes, failRes } from './basicRes'

type InfoType = 'activity' | 'notice' | 'exam' | 'score' | 'community'

interface BaseInfoItem<T extends InfoType> {
    type: T
}

interface ActivityInfoItem extends BaseInfoItem<'activity'> {
    image: string
    tag: string
    description: string
}

interface NoticeInfoItem extends BaseInfoItem<'notice'> {
    source: string
    image: string
    title: string
    description: string
    tag: string[]
}

interface ExamInfoItem extends BaseInfoItem<'exam'> {
    name: string
    time: string
    location: string
    seatNumber: string
}

interface ScoreInfoItem extends BaseInfoItem<'score'> {
    name: string
    score: string
    GPA: string
}

interface CommunityInfoItem extends BaseInfoItem<'community'> {
    subtype: string
    sender: string
    time: string
    description: string
}

export type InfoItem =
    | ActivityInfoItem
    | NoticeInfoItem
    | ExamInfoItem
    | ScoreInfoItem
    | CommunityInfoItem

interface info extends successRes {
    result: InfoItem[]
}

export type infoRes = info | failRes
