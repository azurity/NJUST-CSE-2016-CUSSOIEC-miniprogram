import { IMyApp } from '../../app'
import { liveRes } from '../../utils/course/liveRes'
import { DayVideos, videosRes } from '../../utils/course/videoRes'
import { CheckInfo, checkInRes, checkInPostRes } from '../../utils/course/checkInRes'
import { CourseWeekInfo } from '../../utils/course/CourseWeekInfo'

interface CourseDetailInfo {
    courseID: string
    name: string
    teacher: string
    location: string
}

const app = getApp<IMyApp>()

Page({
    data: {
        iconList: [
            {
                icon: 'emojifill',
                color: 'red',
                badge: 120,
                name: '考勤'
            },
            {
                icon: 'writefill',
                color: 'mauve',
                badge: 1,
                name: '试题作业'
            },
            {
                icon: 'selectionfill',
                color: 'cyan',
                badge: 0,
                name: '评教'
            },
            {
                icon: 'circlefill',
                color: 'olive',
                badge: 22,
                name: '配套资源'
            }
        ],
        info: {},
        checkIn: <CheckInfo>{},
        isLive: false, //是否正在直播
        liveUrl: '',
        videoList: <DayVideos[]>[]
    },

    tapCourse(event: any) {
        let id: string = event.currentTarget.dataset.id
        let name: string = event.currentTarget.dataset.name
        let url: string = event.currentTarget.dataset.url
        wx.setStorageSync('id', id)
        wx.setStorageSync('name', name)
        wx.setStorageSync('url', url)
        wx.navigateTo({ url: '/pages/video/video' })
    },

    tapIcon(e: wx.TapEvent) {
        switch (e.currentTarget.id) {
            case '考勤':
                if (this.data.checkIn.hasChecked) {
                    // TODO: 已经签到
                } else if (this.data.checkIn.isOpen) {
                    this.checkIn()
                        .then(() => {})
                        .catch((reason) => {
                            console.log(reason)
                        })
                } else {
                    // TODO: 不能亲到
                }
                break
            case '试题作业':
                break
            case '评教':
                break
            case '配套资源':
                break
        }
    },

    /**
     * 生命周期函数--监听页面加载，在此处做需要同步的初始化
     */
    onLoad() {
        let detail: CourseDetailInfo | null = null
        try {
            detail = wx.getStorageSync('CourseDetail')
        } catch (e) {
            // TODO: 无参数处理
        }
        /*let obj = {
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
        }*/
        /*let videos = [
            {
                date: '2019-1-12',
                videos: [
                    {
                        videoID: 'v001',
                        name: '1.函数及其特性',
                        isWatch: false,
                        url: ''
                    }
                ]
            },
            {
                date: '2019-1-13',
                videos: [
                    {
                        videoID: 'v002',
                        name: '2.极限的概念、性质和运算法则',
                        isWatch: true,
                        url: ''
                    }
                ]
            },
            {
                date: '2019-1-14',
                videos: [
                    {
                        videoID: 'v003',
                        name: '3.两个重要极限',
                        isWatch: true,
                        url: ''
                    },
                    {
                        videoID: 'v004',
                        name: '4.极限存在准则',
                        isWatch: false,
                        url: ''
                    }
                ]
            },
            {
                date: '2019-1-15',
                videos: [
                    {
                        videoID: 'v005',
                        name: '5.无穷小量和无穷大量',
                        isWatch: false,
                        url: ''
                    }
                ]
            }
        ]
        this.setData({
            info: detail,
            videoList: videos
        })
        */
        this.setData({
            info: detail!
        })
        Promise.all([
            this.initCheckIn(detail!.courseID),
            this.initLive(detail!.courseID),
            this.initVideos(detail!.courseID)
        ])
            .then(() => {
                // TODO: 完成初始化后
            })
            .catch(() => {
                // TODO: 初始化出错处理
            })
    },

    async initCheckIn(courseID: string) {
        let checkIn = await new Promise<checkInRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/course/check_in',
                method: 'GET',
                data: {
                    college: app.globalData.college,
                    personID: app.globalData.personID,
                    courseID: courseID
                },
                success: ({ data }) => {
                    resolve(<checkInRes>data)
                },
                fail: reject
            })
        })
        if (checkIn.success) {
            this.setData({
                checkIn: checkIn.result
            })
        } else {
            // TODO: 错误处理
        }
    },

    async initLive(courseID: string) {
        let live = await new Promise<liveRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/course/live_info',
                method: 'GET',
                data: { courseID: courseID },
                success: ({ data }) => {
                    resolve(<liveRes>data)
                },
                fail: reject
            })
        })
        if (live.success) {
            this.setData({
                isLive: live.result.isLive,
                liveUrl: live.result.url
            })
        } else {
            // TODO: 失败处理
        }
    },

    async initVideos(courseID: string) {
        let result = await new Promise<videosRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/course/videos',
                method: 'GET',
                data: { openid: app.globalData.openid, courseID: courseID },
                success: ({ data }) => {
                    resolve(<videosRes>data)
                },
                fail: reject
            })
        })
        if (result.success) {
            this.setData({
                videoList: result.result
            })
        } else {
            // TODO: 失败处理
        }
    },

    async checkIn() {
        let courseWeekInfo: CourseWeekInfo | null = null
        try {
            courseWeekInfo = wx.getStorageSync('CourseWeekInfo')
        } catch (e) {
            // TODO:
        }
        let result = await new Promise<checkInPostRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/course/check_in',
                method: 'POST',
                data: {
                    college: app.globalData.college,
                    personID: app.globalData.personID,
                    courseID: this.data.info.courseID,
                    numOfWeek: courseWeekInfo!.numOfWeek,
                    dayOfWeek: courseWeekInfo!.dayOfWeek,
                    indexOfDay: courseWeekInfo!.indexOfDay
                },
                success: ({ data }) => {
                    resolve(<checkInPostRes>data)
                },
                fail: reject
            })
        })
        if (result.success) {
            // TODO:
        } else {
            // TODO:
        }
    }
})
