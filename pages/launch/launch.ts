// pages/launch/launch.js
import { IMyApp } from '../../app'
import { openidRes } from '../../utils/globalRes'

const app = getApp<IMyApp>()

enum DirectAim {
    Binding,
    Index
}

Page({
    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载，在此处做需要同步的初始化
     */
    onLoad() {
        Promise.all([this.initOpenid()]) // 利用Prmoise.all做多个并行的初始化流程
            .then(() => {
                let aim = DirectAim.Binding // 没有学号信息时强制绑定
                if (app.globalData != null) {
                    aim = DirectAim.Index
                }
                this.direct(aim)
            })
            .catch((reason) => {
                console.log(reason)
            })
    },

    async initOpenid() {
        let code = await new Promise<wx.LoginSuccessCallbackResult>((resolve, reject) => {
            wx.login({ success: resolve, fail: reject })
        })
        let res = await new Promise<openidRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/global/login',
                method: 'POST',
                data: JSON.stringify({ code: code.code }),
                success: ({ data }) => {
                    resolve(<openidRes>data)
                },
                fail: reject
            })
        })
        if (res.success) {
            app.globalData.openid = res.result
        } else {
            // TODO: 未能获取到openid，做出处理
        }
        // error抛出到外面，由catch处理
    },

    direct(aim: DirectAim) {
        // TODO: 在此处完成实际的跳转过程，跳转至主页面
        if (aim == DirectAim.Binding) {
            // 跳转至绑定页
        } else if (aim == DirectAim.Index) {
            // 跳转至主页
        }
    }
})
