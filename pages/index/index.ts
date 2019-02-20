//index.js
import { IMyApp } from '../../app'

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
    data: {
        floating: false,
        scrollLeft: 0,
        TabCur: 0,
        listName: ['全部', '考试', '成绩', '教务', '社区']
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {},

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
    }
})
