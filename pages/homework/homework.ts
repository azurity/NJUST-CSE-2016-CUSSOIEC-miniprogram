import { IMyApp } from '../../app'
import { homeworkRes, answerRes } from '../../utils/homework/homeworkRes'

const app = getApp<IMyApp>()

Page({
    data: {
        basics: 0,
        homeworkList: [{
            name: '数字音频理论',
            homeworkID: '1234',
            isFinished: true
        }, {
            name: '数字视频信号处理',
            homeworkID: '12345',
            isFinished: false
        }],
        isInList: false,
        questionList: [{
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
            correctAnswer: '0',
            userAnswer: '1'
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
            correctAnswer: ['1', '2'],
            userAnswer: ['1', '2']
        },{
            type: 1,
            question: '这是多选题2',
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
            correctAnswer: ['1', '2'],
            userAnswer: ['1', '2']
        }],
        answerList: [],
        userAnswer: [],
        questionNum: 0,
        listNum: 0
    },
    onLoad() {
        // 获取作业列表
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
                questionList: res.result
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
    entryCard(e: wx.TapEvent) {
        // 获取作业详情
        this.setData({
            listNum: e.currentTarget.id
        })
        if (this.data.homeworkList[this.data.listNum].isFinished) {
            for (let i = 0; i < this.data.questionList.length; i++) {
                for (let j = 0; j < this.data.questionList[i].choseList.length; j++) {
                    if (isInArray(this.data.questionList[i].userAnswer, j.toString())) {
                        this.data.questionList[i].choseList[j].checked = true
                    } else {
                        this.data.questionList[i].choseList[j].checked = false
                    }
                    this.setData({
                        questionList: this.data.questionList
                    })
                }
            }
        }
        this.setData({
            isInList: true
        })
    },
    backCard() {
        this.setData({
            isInList: false
        })
        this.onLoad()
    },
    questionSteps() {
        console.log(this.data.questionList[this.data.questionNum].choseList[1].checked)
        if (this.data.questionNum == this.data.questionList.length - 1) {
            // 完成作业提交
            // 页面跳转返回
            if (arrayEqual(this
                .data.userAnswer, this.data.questionList[this.data.questionNum].correctAnswer)) {
                this.data.answerList.push({
                    indexNum: this.data.questionNum,
                    isCorrect: true,
                    userAnswer: this.data.userAnswer
                })
            } else {
                this.data.answerList.push({
                    indexNum: this.data.questionNum,
                    isCorrect: false,
                    userAnswer: this.data.userAnswer
                })
            }
            this.setData({
                answerList: this.data.answerList
            })
            this.backCard()
        }
        if (this.data.userAnswer.length==0) {
            wx.showToast({
                title: '请作答！',
                icon: 'none',
                duration: 2000
            })
        } else {
            if (arrayEqual(this
                .data.userAnswer, this.data.questionList[this.data.questionNum].correctAnswer)) {
                this.data.answerList.push({
                    indexNum: this.data.questionNum,
                    isCorrect: true,
                    userAnswer: this.data.userAnswer
                })
            } else {
                this.data.answerList.push({
                    indexNum: this.data.questionNum,
                    isCorrect: false,
                    userAnswer: this.data.userAnswer
                })
            }
            this.setData({
                answerList: this.data.answerList
            })
            console.log(this.data.answerList)
            if (this.data.questionNum < this.data.questionList.length - 1) {
                this.setData({
                    questionNum: this.data.questionNum + 1
                })
                this.setData({
                    userAnswer: []
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

function isInArray(array: Array<any>, value: any): boolean {
    for (let i = 0; i < array.length; i++) {
        if (value === array[i]) {
            return true
        }
    }
    return false
}
