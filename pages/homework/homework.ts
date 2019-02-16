import { IMyApp } from '../../app'
import { homeworkRes, answerRes } from '../../utils/homework/homeworkRes'

const app = getApp<IMyApp>()

Page({
    data: {
        basics: 0,
        numList: [{
            type: 0,
            question: '这是单选题',
            imageURL: '',
            choseList: [{
                name: '选项一'
            }, {
                name: '选项二'
            }, {
                name: '选项三'
            }, {
                name: '选项四'
            }],
            correctAnswer: '0'
        }, {
            type: 1,
            question: '这是多选题',
            imageURL: '',
            choseList: [{
                name: '选项一'
            }, {
                name: '选项二'
            }, {
                name: '选项三'
            }, {
                name: '选项四'
            }, {
                name: '选项五'
            }],
            correctAnswer: ['1', '2']
        }],
        answerList: [],
        userAnswer: null,
        num: 0
    },
    onLoad() {
        // 获取作业数据
    },
    async getHomework() {
        let res = await new Promise<homeworkRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/course/homework',
                method: 'GET',
                data: {
                    // 从courseDetail传来的courseID
                },
                success: ({ data }) => {
                    resolve(<homeworkRes>data)
                },
                fail: reject
            })
        })
        if (res.success) {
            this.setData({
                numList: res.result
            })
        } else {
            // 作业未获取成功
        }
    },
    async postAnswer() {
        let res = await new Promise<answerRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/course/homework_answer',
                method: 'POST',
                data: {
                    openid: app.globalData.openid,
                    // 从courseDetail传来的courseID
                    data: {
                        answer: this.data.answerList
                    }
                },
                success: ({ data }) => {
                    resolve(<answerRes>data)
                },
                fail: reject
            })
        })
        return res
    },
    numSteps() {
        if (this.data.num == this.data.numList.length - 1) {
            // 提示错题情况
            // 完成作业提交
            // 页面跳转返回
        }
        if (!this.data.userAnswer) {
            wx.showToast({
                title: '请作答！',
                icon: 'none',
                duration: 2000
            })
        } else {
            if (arrayEqual(this
                .data.userAnswer, this.data.numList[this.data.num].correctAnswer)) {
                this.data.answerList.push({
                    indexNum: this.data.num,
                    isCorrect: true,
                    userAnswer: this.data.userAnswer
                })
            } else {
                this.data.answerList.push({
                    indexNum: this.data.num,
                    isCorrect: false,
                    userAnswer: this.data.userAnswer
                })
            }
            console.log(this.data.answerList)
            if (this.data.num < this.data.numList.length - 1) {
                this.setData({
                    num: this.data.num + 1
                })
            }
        }
        wx.pageScrollTo({
            scrollTop: 0
        })
    },
    checkboxChange(e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
        this.setData({
            userAnswer: e.detail.value
        })
    }
})

function arrayEqual(array1: Array<any>, array2: Array<any>): boolean {
    if (!array2)
        return false
    if (!array1)
        return false

    if (array1.length != array2.length)
        return false

    for (let i = 0, l = array1.length; i < l; i++) {
        if (array1[i] instanceof Array && array2[i] instanceof Array) {
            if (!array1[i].equals(array2[i]))
                return false
        } else if (array1[i] != array2[i]) {
            return false
        }
    }
    return true
}
