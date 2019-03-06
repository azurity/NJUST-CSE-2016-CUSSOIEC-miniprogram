import { IMyApp } from '../../app'
import {
    HomeworkItem,
    QuestionItem,
    ChoseItem,
    homeworkRes,
    answerRes,
    questionRes
} from '../../utils/homework/homeworkRes'

const app = getApp<IMyApp>()

Page({
    data: {
        basics: 0,
        isInList: false,
        answerList: <string[]>[],
        userAnswer: <string[]>[],
        questionNum: 0,
        homeworkList: <HomeworkItem[]>[],
        questionList: <QuestionItem[]>[],
        listNum: 0,
        loading: true
    },
    onLoad() {
        // 获取作业列表
        this.getHomework()
            .then(() => {
                this.setData({
                    loading: false
                })
            })
            .catch((reason) => {
                console.log(reason)
            })
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
    async getQuestion(homework: HomeworkItem) {
        let res = await new Promise<questionRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/course/homework',
                method: 'GET',
                data: {
                    // courseID: wx.getStorageSync('CourseDetail').data.courseID,
                    // personID: app.globalData.personID,
                    // college: app.globalData.college,
                    homeworkID: homework.homeworkID,
                    courseID: '3',
                    personID: '916106840407',
                    college: '南京理工大学'
                    // homeworkID: '9'
                },
                success: ({ data }) => {
                    resolve(<questionRes>data)
                },
                fail: reject
            })
        })
        if (res.success) {
            let questionList = res.result.sort(function(a: QuestionItem, b: QuestionItem) {
                return parseInt(a.questionIndex) - parseInt(b.questionIndex)
            })
            for (let it of questionList) {
                it.choseList = it.choseList.sort(function(a: ChoseItem, b: ChoseItem) {
                    return parseInt(a.choseIndex) - parseInt(b.choseIndex)
                })
            }
            if (homework.isFinished) {
                for (let i = 0; i < questionList.length; i++) {
                    for (let j = 0; j < questionList[i].choseList.length; j++) {
                        if (questionList[i].userAnswer.indexOf(j.toString()) >= 0) {
                            questionList[i].choseList[j].checked = 1
                        } else {
                            questionList[i].choseList[j].checked = 0
                        }
                        if (questionList[i].correctAnswer.indexOf(j.toString()) >= 0) {
                            questionList[i].choseList[j].checked = 2
                        }
                    }
                }
            }
            this.setData({
                isInList: true,
                questionList: questionList
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
                    homeworkID: homework_id,
                    courseID: '3',
                    personID: '916106840407',
                    college: '南京理工大学',
                    // homeworkID: '9',
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
        this.getQuestion(this.data.homeworkList[this.data.listNum])
            .then(() => {})
            .catch((reason) => {
                console.log(reason)
            })
    },
    backCard() {
        this.setData({
            isInList: false,
            answerList: [],
            userAnswer: [],
            questionNum: 0
        })
        this.getHomework().catch((reason) => {
            console.log(reason)
        })
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
            if (
                arrayEqual(
                    this.data.userAnswer,
                    this.data.questionList[this.data.questionNum].correctAnswer
                )
            ) {
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
                    questionNum: this.data.questionNum + 1,
                    userAnswer: []
                })
            } else {
                if (!finished) {
                    // 完成，发送answerList
                    this.postAnswer(this.data.homeworkList[this.data.listNum].homeworkID)
                        .then((reason) => {
                            console.log(reason)
                        })
                        .catch((reason) => {
                            console.log(reason)
                        })
                    this.data.homeworkList[this.data.listNum].isFinished = true
                    this.setData({
                        homeworkList: this.data.homeworkList
                    })
                }
                this.backCard()
            }
        }
        wx.pageScrollTo({
            scrollTop: 0
        })
    },
    checkboxChange(e: { detail: { value: any } }) {
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
    if (!array2) return false
    if (!array1) return false

    if (array1.length != array2.length) return false

    let tempArr1 = array1.sort()
    let tempArr2 = array2.sort()
    //console.log(tempArr1, tempArr2)
    for (let i = 0; i < tempArr1.length; i++) {
        if (tempArr1[i] != tempArr2[i]) {
            return false
        }
    }
    return true
}
