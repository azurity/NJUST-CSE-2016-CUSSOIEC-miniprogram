import { IMyApp } from '../../app'
import { homeworkRes, questionRes, questionPostRes } from '../../utils/homework/homeworkRes'

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
        correctAnswer: [],
        questionNum: 1,
        questionIndex: 0,
        listNum: 0,
        isDelete: false,
        isAdd: false,
        choseNum: 1,
        choseType: 0,
        homeworkName: '',
        questionName: '',
        questionType: false,
        choseList: [],
        imageURLs: { url: 'imageURLs' }
    },
    onLoad() {
        // 获取作业列表
        this.getHomework().then(() => {
            console.log(this.data.homeworkList)
        }).catch((reason) => {
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
            // 作业列表未获取成功
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
                    homeworkID: homework_id,
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
            this.setData({
                questionList: res.result
            })
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
        } else {
            // 作业未获取成功
        }
    },
    async postHomework(homework_name: string) {
        let res = await new Promise<questionPostRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/course/homework',
                method: 'POST',
                data: {
                    // personID: app.globalData.personID,
                    // college: app.globalData.college,
                    // courseID: wx.getStorageSync('courseDetail').data.courseID,
                    courseID: '3',
                    personID: '916106840407',
                    college: '南京理工大学',
                    homeworkName: homework_name,
                    homeworkID: null,
                    data: this.data.answerList
                },
                success: ({ data }) => {
                    resolve(<questionPostRes>data)
                },
                fail: reject
            })
        })
        return res
    },
    async deleteHomework(homework_name: string, homework_id: string) {
        let res = await new Promise<questionPostRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/course/homework',
                method: 'POST',
                data: {
                    // personID: app.globalData.personID,
                    // college: app.globalData.college,
                    // courseID: wx.getStorageSync('courseDetail').data.courseID,
                    courseID: '3',
                    personID: '916106840407',
                    college: '南京理工大学',
                    homeworkName: homework_name,
                    homeworkID: homework_id,
                    data: null
                },
                success: ({ data }) => {
                    resolve(<questionPostRes>data)
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
        this.getQuestion(this.data.homeworkList[this.data.listNum].homeworkID)
            .then(() => {
                    this.setData({
                        isInList: true
                    })
                }
            )
            .catch((reason) => {
                console.log(reason)
            })
    },
    backCard() {
        this.setData({
            questionIndex: 0
        })
        this.setData({
            questionNum: 0
        })
        this.setData({
            isAdd: false
        })
        this.setData({
            choseNum: 1
        })
        this.setData({
            isInList: false
        })
        Promise.all([this.getHomework()])
    },
    addCard() {
        this.setData({
            questionList: [{
                questionIndex: '0',
                question: '请输入题目'
            }]
        })
        this.setData({
            isAdd: true
        })
        this.setData({
            isInList: true
        })
    },
    deleteCard() {
        // Promise.all([this.deleteCard()])
        this.getHomework()
    },
    addChose() {
        this.setData({
            choseNum: this.data.choseNum + 1
        })
    },
    questionSteps() {
        if (this.data.isAdd) {
            if (this.data.correctAnswer.length == 0) {
                wx.showToast({
                    title: '请设置正确选项！',
                    icon: 'none',
                    duration: 2000
                })
            } else if (this.data.questionName.length == 0) {
                wx.showToast({
                    title: '请填写题目！',
                    icon: 'none',
                    duration: 2000
                })
            } else if (this.data.homeworkName.length == 0) {
                wx.showToast({
                    title: '请设置作业名称！',
                    icon: 'none',
                    duration: 2000
                })
            } else {
                this.data.answerList.push({
                    questionIndex: this.data.questionIndex,
                    questionName: this.data.questionName,
                    correctAnswer: this.data.correctAnswer,
                    type: this.data.questionType,
                    choseList: this.data.choseList,
                    imageURLs: this.data.imageURLs
                })
                this.setData({
                    answerList: this.data.answerList
                })
                console.log(this.data.answerList)
                if (this.data.questionNum - 1 == this.data.questionIndex) {
                    this.setData({
                        questionNum: this.data.questionNum + 1
                    })
                }
                this.setData({
                    questionIndex: this.data.questionIndex + 1
                })
                this.setData({
                    correctAnswer: []
                })
            }
        } else {
            if (this.data.questionNum <= this.data.questionList.length - 1) {
                this.setData({
                    questionIndex: this.data.questionIndex + 1
                })
            } else {
                this.backCard()
            }
        }
        // this.setData({
        //     correctAnswer: []
        // })

        this.setData({
            answerList: []
        })
        this.setData({
            questionName: ''
        })
        this.setData({
            chose: ''
        })
        this.setData({
            choseNum: 0
        })
        this.setData({
            questionType: false
        })
        wx.pageScrollTo({
            scrollTop: 0
        })
    },
    questionStepsBack() {
        this.setData({
            questionIndex: this.data.questionIndex - 1
        })
        this.setData({
            questionName: this.data.answerList[this.data.questionIndex].questionName
        })
        this.setData({
            questionType: this.data.answerList[this.data.questionIndex].type
        })
    },
    questionFinished() {
        this.postHomework(this.data.homeworkName)
            .catch((reason) => {
                console.log(reason)
            })
        this.setData({
            questionNum: 0
        })
        this.setData({
            questionIndex: 0
        })
        this.setData({
            answerList: []
        })
        this.setData({
            homeworkName: ''
        })
        this.setData({
            questionName: ''
        })
        this.setData({
            chose: ''
        })
        this.setData({
            choseNum: 0
        })
        this.setData({
            questionType: false
        })
        this.backCard()
    },

    inputHomeworkName(e: { detail: { value: any; }; }) {
        this.setData({
            homeworkName: e.detail.value
        })
    },
    inputQuestionName(e: { detail: { value: any; }; }) {
        this.setData({
            questionName: e.detail.value
        })
    },
    inputChose(e: { detail: { value: { [x: string]: any; }; }; }) {
        for (let i = 0; i < this.data.choseNum; i++) {
            this.data.choseList.push({
                name: e.detail.value['chose' + i.toString()],
                choseIndex: i
            })
            this.setData({
                choseList: this.data.choseList
            })
        }
        console.log(this.data.choseList)
    },
    questionTypeChange(e: { detail: { value: any; }; }) {
        if (e.detail.value) {
            this.setData({
                questionType: 1
            })
        } else {
            this.setData({
                questionType: 0
            })
        }
        console.log(this.data.questionType)
    },
    checkboxChange(e: { detail: { value: any; }; }) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
        let value = e.detail.value
        if (this.data.choseType == 0) {
            value = [e.detail.value]
        }
        this.setData({
            correctAnswer: value
        })
    },

    // ListTouch触摸开始
    ListTouchStart(e: { touches: { pageX: any; }[]; }) {
        this.setData({
            ListTouchStart: e.touches[0].pageX
        })
    },

    // ListTouch计算方向
    ListTouchMove(e: { touches: { pageX: number; }[]; }) {
        this.setData({
            ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
        })
    },

    // ListTouch计算滚动
    ListTouchEnd(e: { currentTarget: { dataset: { target: any; }; }; }) {
        if (this.data.ListTouchDirection == 'left') {
            this.setData({
                modalName: e.currentTarget.dataset.target
            })
        } else {
            this.setData({
                modalName: null
            })
        }
        this.setData({
            ListTouchDirection: null
        })
    }
})