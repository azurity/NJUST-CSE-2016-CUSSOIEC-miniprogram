// pages/checkInControl/checkInControl.ts
import { IMyApp } from '../../app'
import { CourseDetailInfo, CourseWeekInfo } from '../../utils/course/CourseInfo'
import { historyRes, HistoryItem } from '../../utils/course/checkIn/historyRes'
import { itemRes } from '../../utils/course/checkIn/itemRes'

const app = getApp<IMyApp>()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        courseID: '',
        list: <HistoryItem[]>[
            {
                weekInfo: {
                    numOfWeek: 1,
                    dayOfWeek: 1,
                    indexOfDay: [1, 2, 3]
                },
                recordID: 12,
                count: 28
            }
        ],
        isOpen: false,
        loading: false,
        listLoading: true,
        currentRecordID: 0,
        weekNum: ['一', '二', '三', '四', '五', '六', '日']
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        console.log(this.data.list)
        /*this.init()
            .then(() => {
                this.setData({
                    listLoading: false
                })
            })
            .catch((reason) => {
                console.log(reason)
            })*/
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
        this.delete(e.currentTarget.dataset.index)
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
        let weekInfo: CourseWeekInfo | null = null
        try {
            weekInfo = wx.getStorageSync('CourseWeekInfo')
        } catch (e) {
            // TODO:
        }
        let result = await new Promise<itemRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/course/check_in/item',
                data: {
                    data: {
                        courseID: this.data.courseID,
                        weekInfo: weekInfo!
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
                currentRecordID: result.result
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
                data: { recordID: this.data.currentRecordID, data: { isOpen: false } },
                success: ({ data }) => {
                    resolve(<itemRes>data)
                },
                fail: reject
            })
        })
        if (result.success) {
            // TODO: 刷新list
        } else {
            // TODO:
        }
    },

    async delete(recordID: number) {
        let result = await new Promise<itemRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/course/check_in/item',
                data: { recordID: recordID, data: null },
                success: ({ data }) => {
                    resolve(<itemRes>data)
                },
                fail: reject
            })
        })
        if (result.success) {
            // TODO: 刷新list
        } else {
            // TODO:
        }
    }
})
