// pages/binding/binding.js
import { IMyApp } from '../../app'
import { bindingRes } from '../../utils/globalRes'
import { infoRes } from '../../utils/info/infoRes'

const app = getApp<IMyApp>()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        loading: false,
        college: '',
        personID: '',
        realName: '',
        nickName: '',
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {},

    /**
     * 提交请求
     */
    submit(defaultNickName: string) {
        if (this.data.college === '' || this.data.personID === '' || this.data.realName === '') {
            wx.showToast({ title: '请填写所有必填项', icon: 'none' })
            return
        }
        this.setData({ loading: true })
        this.submitRequest(defaultNickName)
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

    collegeInput(e: wx.InputEvent) {
        this.setData({
            college: e.detail.value
        })
    },

    personIDInput(e: wx.InputEvent) {
        this.setData({
            personID: e.detail.value
        })
    },

    realNameInput(e: wx.InputEvent) {
        this.setData({
            realName: e.detail.value
        })
    },

    nickNameInput(e: wx.InputEvent) {
        this.setData({
            nickName: e.detail.value
        })
    },

    userInfoSubmit() {
        wx.getUserInfo({
            success: (res: wx.UserInfoResponse) => {
                this.submit(res.userInfo.nickName)
            },
            fail: () => {
                wx.showToast({ title: '请授权允许使用用户信息', icon: 'none' })
            }
        })
    },

    bindGetUserInfo(e: any) {
        if (!e.detail.userInfo) {
            wx.showToast({ title: '请授权允许使用用户信息', icon: 'none' })
        } else {
            this.submit(e.detail.userInfo.nickName)
        }
    },

    async submitRequest(defaultNickName: string) {
        let result = await new Promise<bindingRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/user/binding',
                method: 'POST',
                data: {
                    openid: app.globalData.openid,
                    data: {
                        college: this.data.college,
                        personID: this.data.personID,
                        realName: this.data.realName,
                        nickName: this.data.nickName || defaultNickName
                    }
                },
                success: ({ data }) => {
                    resolve(<bindingRes>data)
                },
                fail: reject
            })
        })
        if (!result.success) {
            return false
        }
        let info = await new Promise<infoRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/user/info',
                method: 'GET',
                data: { openid: app.globalData.openid },
                success: ({ data }) => {
                    resolve(<infoRes>data)
                },
                fail: reject
            })
        })
        if (info.success) {
            app.globalData.personInfo = info.result
        }
        return info.success
    }
})
