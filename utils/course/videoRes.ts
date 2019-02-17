import { successRes, failRes } from '../basicRes'

interface VideoInfo {
    videoID: string
    name: string
    isWatch: boolean
    url: string
}

export interface DayVideos {
    date: string
    videos: VideoInfo[]
}

interface videos extends successRes {
    result: DayVideos[]
}

export type videosRes = videos | failRes