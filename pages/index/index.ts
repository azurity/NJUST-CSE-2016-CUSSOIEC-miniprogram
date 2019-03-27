//index.js
import { IMyApp } from '../../app'
import { InfoItem, infoRes } from '../../utils/infoRes'

interface ChangeDetail {
    current: number
    currentItemId: string
    source: 'autoplay' | 'touch'
}

const app = getApp<IMyApp>()

Page({
    /**
     * 页面的初始数据
     */
    types: ['all', 'exam', 'score', 'notice', 'community'],
    data: {
        floating: false,
        scrollLeft: 0,
        TabCur: 0,
        infoList: <InfoItem[]>[],
        listName: ['全部', '考试', '成绩', '通知', '社区']
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.loadInfo(this.types[0], true)
            .then(() => {})
            .catch((reason) => {
                console.log(reason)
            })
    },

    cardSwiper(e: wx.CustomEvent<'change', ChangeDetail>) {
        //console.log(e)
    },

    onPageScroll() {
        wx.createSelectorQuery()
            .select('#recommand')
            .boundingClientRect((rect: wx.NodesRefRect) => {
                if (rect.height + rect.top <= 0) {
                    this.setData({
                        floating: true
                    })
                } else {
                    this.setData({
                        floating: false
                    })
                }
            })
            .exec()
    },

    onReachBottom() {
        this.loadInfo(this.types[this.data.TabCur], false)
            .then(() => {})
            .catch((reason) => {
                console.log(reason)
            })
    },

    scroll(e: wx.ScrollEvent) {
        this.setData({
            scrollLeft: e.detail.scrollLeft
        })
    },

    tabSelect(e: wx.TapEvent) {
        wx.createSelectorQuery()
            .select(`#${e.currentTarget.id}`)
            .boundingClientRect((rect) => {
                this.setData({
                    TabCur: e.currentTarget.dataset.id,
                    scrollLeft: (e.currentTarget.dataset.id - 1) * (<wx.NodesRefRect>rect).width
                })
            })
            .exec()
        this.loadInfo(this.types[e.currentTarget.dataset.id], true)
            .then(() => {})
            .catch((reason) => {
                console.log(reason)
            })
    },

    async loadInfo(type: string, reset: boolean) {
        if (reset) {
            this.setData({
                infoList: <InfoItem[]>[]
            })
        }
        let result = await new Promise<infoRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/stream/infos',
                method: 'GET',
                data: {
                    college: app.globalData.college,
                    personID: app.globalData.personID,
                    type: type,
                    startIndex: this.data.infoList.length
                },
                success: ({ data }) => {
                    resolve(<infoRes>data)
                },
                fail: reject
            })
        })
        if (result.success) {
            this.setData({
                infoList: this.data.infoList.concat(result.result)
            })
        } else {
            // TODO:
        }
    }
})
