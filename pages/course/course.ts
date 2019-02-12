import { IMyApp } from '../../app'
import { CourseItem, scheduleRes } from '../../utils/course/courseRes'

const app = getApp<IMyApp>()

Page({
    data: {
        TabCur: 0,
        scrollLeft: 0,
        obj: <CourseItem[]>[],
        scheduleDay: <CourseItem[]>[],
        numOfWeek: 0,
        weekNum: ['一', '二', '三', '四', '五', '六', '日'],
        toggleDelay: false
    },
    tabSelect(e: wx.TapEvent) {
        console.log(e)
        console.log(this.data.scheduleDay)
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        })
        this.setData({
            obj: this.data.scheduleDay.filter(
                (item: CourseItem) =>
                    item.position.dayOfWeek == this.data.TabCur &&
                    item.active.indexOf(this.data.numOfWeek) != -1
            )
        })
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
    onLoad() {
        let sch = []
        sch.push(
            {
                courseID: 'qw123',
                active: [2, 3, 4],
                position: {
                    dayOfWeek: 0,
                    indexOfDay: [0, 1, 2]
                },
                info: {
                    name: '高等数学',
                    teacher: '祖冲之',
                    location: 'III-105'
                }
            },
            {
                courseID: 'qw124',
                active: [2, 3, 4],
                position: {
                    dayOfWeek: 0,
                    indexOfDay: [3, 4]
                },
                info: {
                    name: '毛泽东思想与中国特色社会主义理论体系概论',
                    teacher: '冯友兰·茅以升',
                    location: 'IV-C108'
                }
            },
            {
                courseID: 'qw125',
                active: [2, 3, 4],
                position: {
                    dayOfWeek: 1,
                    indexOfDay: [0, 1, 2]
                },
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
            numOfWeek: week
        })
        this.setData({
            obj: this.data.scheduleDay.filter(
                (item: CourseItem) =>
                    item.position.dayOfWeek == 0 && item.active.indexOf(this.data.numOfWeek) != -1
            )
        })
        this.toggleDelay()
        /*
        Promise.all([this.courseSchedule()])
            .then(() => {
                // TODO数据绑定到this
            })
            .catch((reason) => {
                console.log(reason)
            })
            */
    }
    /*
    async courseSchedule() {
        let res = await new Promise<scheduleRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/courses/course',
                method: 'POST',
                data: {
                    college: app.globalData.college,
                    personID: app.globalData.personID
                },
                success: ({ data }) => {
                    resolve(<scheduleRes>data)
                },
                fail: reject
            })
        })
        if (res.success) {
            this.setData({
                scheduleDay: res.result
            })
        } else {
        }
    return res.success
    }
    */
})
