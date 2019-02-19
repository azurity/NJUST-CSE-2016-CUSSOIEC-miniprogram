export interface CourseDetailInfo {
    courseID: string
    name: string
    teacher: string
    location: string
}

export interface CourseWeekInfo {
    numOfWeek: number
    dayOfWeek: number
    indexOfDay: number[]
}
