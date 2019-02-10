// import { IMyApp } from '../../app'

// const app = getApp<IMyApp>()

Page({
    data: {
        TabCur: 0,
        scrollLeft: 0
    },
    tabSelect(e: wx.TapEvent) {
        console.log(e)
    }
})
