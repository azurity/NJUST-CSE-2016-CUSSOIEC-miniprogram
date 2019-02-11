import { IMyApp } from '../../app'
import { infoRes, infoPostRes } from '../../utils/info/infoRes'

const app = getApp<IMyApp>()

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        personInfo: {},
        reviseNickName: '',
        revisePhone: '',
        reviseEmail: '',
        reviseFlage: false
    },
    onLoad() {
        this.setData({
            personInfo: {
                userType: '学生',
                college: '南京理工大学',
                personID: '916106840117',
                realName: '陈清扬',
                nickName: 'yuanmou',
                gender: '男',
                grade: '本科三年级',
                academy: '计算机科学与工程学院',
                major: '智能科学与技术',
                phone: '18851198612',
                email: 'yuanmou8@gmail.com'
            }
        })
        if (app.globalData.userInfo) {
            this.setData!({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = (res) => {
                this.setData!({
                    userInfo: res,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData!({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getUserInfo(e: any) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData!({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    showModal(e) {
        this.setData({
            modalName: e.currentTarget.dataset.target,
            reviseNickName: this.data.personInfo.nickName,
            revisePhone: this.data.personInfo.phone,
            reviseEmail: this.data.personInfo.email
        })
    },
    hideModal(e) {
        this.setData({
            modalName: null
        })
    },
    nickNameInput(e) {
        this.setData({
            reviseNickName: e.detail.value
        })
    },
    phoneInput(e) {
        this.setData({
            revisePhone: e.detail.value
        })
    },
    emailInput(e) {
        this.setData({
            reviseEmail: e.detail.value
        })
    },
    resivedInfo() {
        this.setData({
            personInfo: {
                userType: this.data.personInfo.userType,
                college: this.data.personInfo.college,
                personID: this.data.personInfo.personID,
                realName: this.data.personInfo.realName,
                nickName: this.data.reviseNickName,
                gender: this.data.personInfo.gender,
                grade: this.data.personInfo.grade,
                academy: this.data.personInfo.academy,
                major: this.data.personInfo.major,
                phone: this.data.revisePhone,
                email: this.data.reviseEmail
            }
        })
    },
    async getPeronInfo() {
        let res = await new Promise<infoRes>((resolve, reject) => {
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
        if (res.success) {
            this.setData({
                personInfo: res.result
            })
        } else {
            //console.log(res.reason)
        }
        // error抛出到外面，由catch处理
    },
    async postUserInfo() {
        let result = await new Promise<infoPostRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/global/binding',
                method: 'POST',
                data: {
                    college: app.globalData.college,
                    personID: app.globalData.personID,
                    data: {
                        nickName: this.data.personInfo.nickName,
                        phone: this.data.personInfo.phone,
                        email: this.data.personInfo.email
                    }
                },
                success: ({ data }) => {
                    resolve(<infoPostRes>data)
                },
                fail: reject
            })
        })
        if (result.success) {
            wx.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 2000
            })
        }
        return result.success
    },
    submit() {
        wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
        })
        this.setData({
            modalName: null
        })
        this.resivedInfo()
        /*
        this.postUserInfo()
            .then((value) => {
                if (value) {
                    wx.showToast({
                        title: '修改成功',
                        icon: 'success',
                        duration: 2000
                    })
                } else {
                    // TODO: 失败，提示
                }
            })
            .catch((reason) => {
                console.log(reason)
            })
            */
    }
})
