// pages/binding/binding.js
import { IMyApp } from '../../app'
import { bindingRes } from '../../utils/globalRes'

const app = getApp<IMyApp>()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        studentID: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {},

    /**
     * 提交请求
     */
    submit() {
        this.submitRequest()
            .then((value) => {
                if (value) {
                    // TODO: 成功，跳转
                } else {
                    // TODO: 失败，提示
                }
            })
            .catch((reason) => {
                console.log(reason)
            })
    },

    async submitRequest() {
        let result = await new Promise<bindingRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/global/binding',
                method: 'POST',
                data: {
                    openid: app.globalData.openid,
                    studentID: this.data.studentID
                },
                success: ({ data }) => {
                    resolve(<bindingRes>data)
                },
                fail: reject
            })
        })
        if (result.success) {
            app.globalData.studentID = result.result
        }
        return result.success
    }
})
