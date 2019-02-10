// pages/binding/binding.js
import { IMyApp } from '../../app'
import { bindingRes } from '../../utils/globalRes'

const app = getApp<IMyApp>()

type InputType = 'college' | 'studentID' | 'realName' | 'nickName'

Page({
    /**
     * 页面的初始数据
     */
    data: {
        loading: false,
        college: '',
        studentID: '',
        realName: '',
        nickName: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {},

    /**
     * 提交请求
     */
    submit() {
        if (this.data.college === '' || this.data.studentID === '' || this.data.realName === '') {
            // TODO: 信息不完整提示
            return
        }
        this.setData({ loading: true })
        this.submitRequest()
            .then((value) => {
                if (value) {
                    // TODO: 成功，跳转
                } else {
                    this.setData({ loading: false })
                    // TODO: 失败，提示
                }
            })
            .catch((reason) => {
                console.log(reason)
            })
    },

    input(inputType: InputType) {
        return (e: wx.InputEvent) => {
            this.setData({
                [inputType]: e.detail.value
            })
        }
    },

    async submitRequest() {
        let result = await new Promise<bindingRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/global/binding',
                method: 'POST',
                data: {
                    openid: app.globalData.openid,
                    data: {
                        college: this.data.college,
                        studentID: this.data.studentID,
                        realName: this.data.realName,
                        nickName: this.data.nickName
                    }
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
