import { IMyApp } from '../../app'
import { weekInfoRes } from '../../utils/globalRes'
import { CourseItem, scheduleRes } from '../../utils/course/courseRes'
import { CourseDetailInfo } from '../../utils/course/CourseInfo'
import dayjs = require('dayjs')

const app = getApp<IMyApp>()

Page({
    data: {
        loading: true,
        TabCur: (dayjs().day() + 6) % 7,
        scrollLeft: 0,
        obj: <CourseItem[]>[],
        scheduleDay: <CourseItem[]>[],
        numOfWeek: 0,
        weekNum: ['一', '二', '三', '四', '五', '六', '日'],
        toggleDelay: false
    },
    tabSelect(e: wx.TapEvent) {
        console.log(this.createSelectorQuery().select(`#${e.currentTarget.id}`))
        wx.createSelectorQuery()
            .select(`#${e.currentTarget.id}`)
            .boundingClientRect((rect) => {
                this.setData({
                    TabCur: e.currentTarget.dataset.id,
                    scrollLeft: (e.currentTarget.dataset.id - 1) * (<wx.NodesRefRect>rect).width
                })
                this.showCourses()
            })
            .exec()
    },
    toggleDelay() {
        const that = this
        this.setData({
            toggleDelay: true
        })
        setTimeout(function() {
            that.setData({
                toggleDelay: false
            })
        }, 1000)
    },
    showCourse(e: wx.TapEvent) {
        let it = <CourseItem>this.data.obj[parseInt(e.currentTarget.id)]
        wx.setStorageSync('CourseDetail', <CourseDetailInfo>{
            courseID: it.courseID,
            name: it.info.name,
            teacher: it.info.teacher,
            location: it.info.location
        })
        wx.navigateTo({ url: '/pages/courseDetail/courseDetail' })
    },
    onLoad() {
        /*let sch = []
        sch.push(
            {
                courseID: 'qw123',
                active: [2, 3, 4],
                position: [
                    {
                        dayOfWeek: 0,
                        indexOfDay: [0, 1, 2]
                    }
                ],
                info: {
                    name: '高等数学',
                    teacher: '祖冲之',
                    location: 'III-105'
                }
            },
            {
                courseID: 'qw124',
                active: [2, 3, 4],
                position: [
                    {
                        dayOfWeek: 0,
                        indexOfDay: [3, 4]
                    }
                ],
                info: {
                    name: '毛泽东思想与中国特色社会主义理论体系概论',
                    teacher: '冯友兰·茅以升',
                    location: 'IV-C108'
                }
            },
            {
                courseID: 'qw125',
                active: [2, 3, 4],
                position: [
                    {
                        dayOfWeek: 1,
                        indexOfDay: [0, 1, 2]
                    }
                ],
                info: {
                    name: '计算机组成原理',
                    teacher: '侯捷',
                    location: 'I-205'
                }
            }
        )
        let week = 2
        this.setData({
            scheduleDay: sch,
            numOfWeek: week,
            loading: false
        })
        this.showCourses()
        this.toggleDelay()
        */
        Promise.all([this.courseSchedule(), this.weekInfo()])
            .then(() => {
                this.showCourses()
                this.toggleDelay()
                // TODO数据绑定到this
            })
            .catch((reason) => {
                console.log(reason)
            })
    },
    showCourses() {
        this.setData({
            obj: this.data.scheduleDay
                .reduce((arr: CourseItem[], item: CourseItem) => {
                    for (let pos of item.position) {
                        if (pos.dayOfWeek == this.data.TabCur) {
                            let result: CourseItem = JSON.parse(JSON.stringify(item))
                            result.position = [pos]
                            arr.push(result)
                        }
                    }
                    return arr
                }, [])
                .filter((item: CourseItem) => {
                    for (let pos of item.position) {
                        if (pos.dayOfWeek == this.data.TabCur) {
                            return item.active.indexOf(this.data.numOfWeek) != -1
                        }
                    }
                    return false
                })
        })
    },
    async weekInfo() {
        let info = await new Promise<weekInfoRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/global/week_info',
                method: 'GET',
                data: {
                    college: app.globalData.personInfo!.college,
                    personID: app.globalData.personInfo!.personID,
                    date: dayjs().format('YYYY-MM-DD')
                },
                success: ({ data }) => {
                    resolve(<weekInfoRes>data)
                },
                fail: reject
            })
        })
        if (info.success) {
            this.setData({
                numOfWeek: info.result.numOfWeek
            })
        } else {
            // TODO: 失败处理
        }
    },
    async courseSchedule() {
        let res = await new Promise<scheduleRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/course/courses',
                method: 'GET',
                data: {
                    college: app.globalData.personInfo!.college,
                    personID: app.globalData.personInfo!.personID
                },
                success: ({ data }) => {
                    resolve(<scheduleRes>data)
                },
                fail: reject
            })
        })
        if (res.success) {
            this.setData({
                scheduleDay: res.result,
                loading: false
            })
        } else {
            this.setData({
                loading: false
            })
            // TODO: 失败处理
        }
        //return res.success
    }
})
