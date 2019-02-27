import { IMyApp } from '../../app'
import { homeworkRes, answerRes, questionRes } from '../../utils/homework/homeworkRes'

const app = getApp<IMyApp>()

interface questionI {
    questionIndex: string
}

type question = questionI

interface choseI {
    choseIndex: string
}

type chose = choseI

Page({
    data: {
        basics: 0,
        isInList: false,
        answerList: [],
        userAnswer: [],
        questionNum: 0,
        listNum: 0
    },
    onLoad() {
        // 获取作业列表
        Promise.all([this.getHomework()])
    },
    async getHomework() {
        let res = await new Promise<homeworkRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/course/homework_list',
                method: 'GET',
                data: {
                    // courseID: wx.getStorageSync('CourseDetail').data.courseID,
                    // personID: app.globalData.personID,
                    // college: app.globalData.college
                    courseID: '3',
                    personID: '916106840407',
                    college: '南京理工大学'
                },
                success: ({ data }) => {
                    resolve(<homeworkRes>data)
                },
                fail: reject
            })
        })
        if (res.success) {
            this.setData({
                homeworkList: res.result
            })
        } else {
            // 作业未获取成功
        }
    },
    async getQuestion(homework_id: string) {
        let res = await new Promise<questionRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/course/homework',
                method: 'GET',
                data: {
                    // courseID: wx.getStorageSync('CourseDetail').data.courseID,
                    // personID: app.globalData.personID,
                    // college: app.globalData.college,
                    // homeworkID: homework_id
                    courseID: '3',
                    personID: '916106840407',
                    college: '南京理工大学',
                    homeworkID: '9'
                },
                success: ({ data }) => {
                    resolve(<questionRes>data)
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
    async postAnswer(homework_id: string) {
        let res = await new Promise<answerRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/course/homework_answer',
                method: 'POST',
                data: {
                    // personID: app.globalData.personID,
                    // college: app.globalData.college,
                    // courseID: wx.getStorageSync('courseDetail').data.courseID,
                    // homeworkID: homework_id,
                    courseID: '3',
                    personID: '916106840407',
                    college: '南京理工大学',
                    homeworkID: '9',
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
        this.setData({
            listNum: e.currentTarget.id
        })
        // 获取作业详情
        Promise.all([this.getQuestion(this.data.homeworkList[this.data.listNum].homeworkID)])
            .then(() => {
                    this.setData({
                        questionList: this.data.questionList.sort(function(a: question, b: question) {
                            return parseInt(a.questionIndex) - parseInt(b.questionIndex)
                        })
                    })
                    for (let n = 0; n < this.data.questionList.length; n++) {
                        this.data.questionList[n].choseList = this.data.questionList[n].choseList.sort(function(a: chose, b: chose) {
                            return parseInt(a.choseIndex) - parseInt(b.choseIndex)
                        })
                        this.setData({
                            questionList: this.data.questionList
                        })
                    }
                    if (this.data.homeworkList[this.data.listNum].isFinished) {
                        for (let i = 0; i < this.data.questionList.length; i++) {
                            for (let j = 0; j < this.data.questionList[i].choseList.length; j++) {
                                if (this.data.questionList[i].userAnswer.indexOf(j.toString()) >= 0) {
                                    this.data.questionList[i].choseList[j].checked = 1
                                } else {
                                    this.data.questionList[i].choseList[j].checked = 0
                                }
                                if (this.data.questionList[i].correctAnswer.indexOf(j.toString()) >= 0) {
                                    this.data.questionList[i].choseList[j].checked = 2
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
                }
            )
            .catch()
    },
    backCard() {
        this.setData({
            isInList: false
        })
        Promise.all([this.getHomework()])
    },
    questionSteps() {
        console.log(this.data.questionList[this.data.questionNum].choseList[1].checked)
        let finished: boolean = this.data.homeworkList[this.data.listNum].isFinished
        if (this.data.userAnswer.length == 0 && !finished) {
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
            } else {
                if (!finished) {
                    // 完成，发送answerList
                    Promise.all([this.postAnswer(this.data.homeworkList[this.data.listNum].homeworkID)])
                        .then((reason) => {
                            console.log(reason)
                        }).catch((reason) => {
                        console.log(reason)
                    })
                    this.data.homeworkList[this.data.listNum].isFinished = true
                    this.setData({
                        homeworkList: this.data.homeworkList
                    })
                }
                this.setData({
                    questionNum: 0
                })
                this.setData({
                    answerList: []
                })
                this.backCard()
            }
        }
        wx.pageScrollTo({
            scrollTop: 0
        })
    },
    checkboxChange(e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
        let value = e.detail.value
        if (this.data.questionList[this.data.questionNum].type == 0) {
            value = [e.detail.value]
        }
        this.setData({
            userAnswer: value
        })
    }
})

function arrayEqual(array1: string[], array2: string[]): boolean {
    if (!array2)
        return false
    if (!array1)
        return false

    if (array1.length != array2.length)
        return false

    let tempArr1 = array1.sort()
    let tempArr2 = array2.sort()
    console.log(tempArr1, tempArr2)
    for (let i = 0; i < tempArr1.length; i++) {
        if (tempArr1[i] != tempArr2[i]) {
            return false
        }
    }
    return true
}
