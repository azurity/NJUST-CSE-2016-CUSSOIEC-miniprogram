// pages/checkInControl/checkInControl.ts
import { IMyApp } from '../../app'
import { CourseDetailInfo } from '../../utils/course/CourseInfo'
import { historyRes, HistoryItem } from '../../utils/course/checkIn/historyRes'
import { itemRes } from '../../utils/course/checkIn/itemRes'
import dayjs = require('dayjs')

const app = getApp<IMyApp>()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        courseID: '',
        list: <HistoryItem[]>[],
        isOpen: false,
        loading: false,
        listLoading: true,
        currentTime: '',
        weekNum: ['一', '二', '三', '四', '五', '六', '日']
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.init()
            .then(() => {
                this.setData({
                    listLoading: false
                })
            })
            .catch((reason) => {
                console.log(reason)
            })
    },

    toggleState(_: wx.TapEvent) {
        if (this.data.isOpen) {
            this.close()
                .then(() => {})
                .catch((reason) => {
                    console.log(reason)
                })
        } else {
            this.open()
                .then(() => {})
                .catch((reason) => {
                    console.log(reason)
                })
        }
    },

    deleteItem(e: wx.TapEvent) {
        this.delete(e.currentTarget.dataset.time)
            .then(() => {})
            .catch((reason) => {
                console.log(reason)
            })
    },

    async init() {
        let courseInfo: CourseDetailInfo | null = null
        try {
            courseInfo = wx.getStorageSync('CourseDetail')
        } catch (e) {
            // TODO:
        }
        let result = await new Promise<historyRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/course/check_in/history',
                method: 'GET',
                data: { courseID: courseInfo!.courseID },
                success: ({ data }) => {
                    resolve(<historyRes>data)
                },
                fail: reject
            })
        })
        if (result.success) {
            this.setData({
                courseID: courseInfo!.courseID,
                list: result.result
            })
        } else {
            //TODO:
        }
    },

    async open() {
        let result = await new Promise<itemRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/course/check_in/item',
                method: 'POST',
                data: {
                    courseID: this.data.courseID,
                    time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    data: {
                        isOpen: true
                    }
                },
                success: ({ data }) => {
                    resolve(<itemRes>data)
                },
                fail: reject
            })
        })
        if (result.success) {
            this.setData({
                isOpen: true,
                currentTime: result.result
            })
            // TODO: 反馈
        } else {
            // TODO:
        }
    },

    async close() {
        let result = await new Promise<itemRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/course/check_in/item',
                method: 'POST',
                data: {
                    courseID: this.data.courseID,
                    time: this.data.currentTime,
                    data: {
                        isOpen: false
                    }
                },
                success: ({ data }) => {
                    resolve(<itemRes>data)
                },
                fail: reject
            })
        })
        if (result.success) {
            this.setData({
                isOpen: false
            })
            await this.init()
        } else {
            // TODO:
        }
    },

    async delete(time: string) {
        let result = await new Promise<itemRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/course/check_in/item',
                method: 'POST',
                data: {
                    courseID: this.data.courseID,
                    time: time,
                    data: null
                },
                success: ({ data }) => {
                    resolve(<itemRes>data)
                },
                fail: reject
            })
        })
        if (result.success) {
            this.setData({
                list: this.data.list.filter((value: HistoryItem) => {
                    return value.time != time
                })
            })
        } else {
            // TODO:
        }
    }
})
