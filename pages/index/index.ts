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
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {},

    cardSwiper(e: wx.CustomEvent<'change', ChangeDetail>) {
        //console.log(e)
    }
})
