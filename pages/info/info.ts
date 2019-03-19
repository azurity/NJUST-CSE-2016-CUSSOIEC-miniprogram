import { IMyApp } from '../../app'
import { infoPostRes } from '../../utils/info/infoRes'

type ModalName = 'menuModal' | null

const app = getApp<IMyApp>()

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        personInfo: app.globalData.personInfo!,
        reviseNickName: '',
        revisePhone: '',
        reviseEmail: '',
        reviseFlage: false,
        modalName: <ModalName>null
    },
    onLoad() {},
    showModal(e: wx.TapEvent) {
        this.setData({
            modalName: e.currentTarget.dataset.target,
            reviseNickName: this.data.personInfo.nickName,
            revisePhone: this.data.personInfo.phone,
            reviseEmail: this.data.personInfo.email
        })
    },
    hideModal(_: wx.TapEvent) {
        this.setData({
            modalName: null
        })
    },
    nickNameInput(e: wx.InputEvent) {
        this.setData({
            reviseNickName: e.detail.value
        })
    },
    phoneInput(e: wx.InputEvent) {
        this.setData({
            revisePhone: e.detail.value
        })
    },
    emailInput(e: wx.InputEvent) {
        this.setData({
            reviseEmail: e.detail.value
        })
    },
    revisedInfo() {
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
    /*async getPeronInfo() {
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
    },*/
    async postUserInfo() {
        let result = await new Promise<infoPostRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/user/info',
                method: 'POST',
                data: {
                    college: app.globalData.personInfo!.college,
                    personID: app.globalData.personInfo!.personID,
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
        this.revisedInfo()
        this.postUserInfo()
            .then((value) => {
                if (value) {
                    // TODO: 成功
                } else {
                    // TODO: 失败，提示
                }
            })
            .catch((reason) => {
                console.log(reason)
            })
    }
})
