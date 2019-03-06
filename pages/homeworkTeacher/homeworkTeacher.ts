import { IMyApp } from '../../app'
import {
    HomeworkItem,
    QuestionItem,
    ChoseItem,
    homeworkRes,
    questionRes,
    questionPostRes
} from '../../utils/homework/homeworkRes'

const app = getApp<IMyApp>()

interface QuestionPostItem {
    type: 0 | 1
    questionIndex: string
    question: string
    imageURLs: { url: string }[]
    choseList: ChoseItem[]
    correctAnswer: string[]
}

Page({
    data: {
        loading: true,
        basics: 0,
        isInList: false,
        answerList: <QuestionPostItem[]>[],
        homeworkList: <HomeworkItem[]>[],
        questionList: <QuestionItem[]>[],
        correctAnswer: [],
        questionNum: 0,
        questionIndex: 0,
        listNum: 0,
        isDelete: false,
        isAdd: false,
        choseNum: 0,
        homeworkName: '',
        questionName: '',
        questionType: false,
        choseList: <ChoseItem[]>[],
        imageURLs: [{ url: 'imageURLs' }]
    },
    onLoad() {
        // 获取作业列表
        this.getHomework()
            .then(() => {
                this.setData({
                    loading: false
                })
                console.log(this.data.homeworkList)
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
                    personID: '916000000001',
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
            for (let i = 0; i < questionList.length; i++) {
                for (let j = 0; j < questionList[i].choseList.length; j++) {
                    if (questionList[i].correctAnswer.indexOf(j.toString()) >= 0) {
                        questionList[i].choseList[j].checked = 2
                    } else {
                        questionList[i].choseList[j].checked = 0
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
                    personID: '916000000001',
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
    async deleteHomework(homework_id: string) {
        let res = await new Promise<questionPostRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/course/homework',
                method: 'POST',
                data: {
                    // personID: app.globalData.personID,
                    // college: app.globalData.college,
                    // courseID: wx.getStorageSync('courseDetail').data.courseID,
                    courseID: '3',
                    personID: '916000000001',
                    college: '南京理工大学',
                    homeworkName: null,
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
    clear() {
        this.setData({
            questionNum: 0,
            questionIndex: 0,
            answerList: [],
            homeworkName: '',
            questionName: '',
            choseNum: 0,
            questionType: false
        })
    },
    entryCard(e: wx.TapEvent) {
        this.setData({
            listNum: e.currentTarget.id
        })
        // 获取作业详情
        this.getQuestion(this.data.homeworkList[this.data.listNum])
            .then(() => {
                this.setData({
                    isInList: true
                })
            })
            .catch((reason) => {
                console.log(reason)
            })
    },
    backCard() {
        this.setData({
            isAdd: false,
            isInList: false
        })
        this.clear()
        this.getHomework()
            .then(() => {})
            .catch((reason) => {
                console.log(reason)
            })
    },
    addCard() {
        this.setData({
            isAdd: true,
            questionNum: 1,
            isInList: true,
            choseList: [<ChoseItem>{ name: '', choseIndex: '0' }],
            choseNum: 1
        })
    },
    deleteCard(e: wx.TapEvent) {
        console.log(e.currentTarget.dataset.id_card)
        this.setData({
            listNum: e.currentTarget.dataset.id_card
        })
        console.log(this.data.homeworkList[this.data.listNum].homeworkID)
        this.deleteHomework(this.data.homeworkList[this.data.listNum].homeworkID)
        this.getHomework()
    },
    addChose() {
        console.log(this.data.choseList)
        this.data.choseList.push(<ChoseItem>{
            name: '',
            choseIndex: this.data.choseList.length.toString()
        })
        this.setData({
            choseNum: this.data.choseNum + 1,
            choseList: this.data.choseList
        })
        console.log(this.data)
    },
    dataCheck() {
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
            return true
        }
        return false
    },
    questionSteps() {
        console.log('step')
        if (this.data.isAdd) {
            if (!this.dataCheck()) {
                return
            } else {
                let question_type: 0 | 1 = 0
                if (this.data.questionType) {
                    question_type = 1
                }
                ;(<QuestionPostItem[]>this.data.answerList)[this.data.questionIndex] = {
                    questionIndex: this.data.questionIndex.toString(),
                    question: this.data.questionName,
                    correctAnswer: this.data.correctAnswer,
                    type: question_type,
                    choseList: this.data.choseList,
                    imageURLs: this.data.imageURLs
                }
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
                    questionName: '',
                    choseNum: 1,
                    questionType: false,
                    questionIndex: this.data.questionIndex + 1,
                    correctAnswer: [],
                    choseList: [<ChoseItem>{ name: '', choseIndex: '0' }]
                })
            }
        } else {
            if (this.data.questionIndex <= this.data.questionList.length - 1) {
                this.setData({
                    questionIndex: this.data.questionIndex + 1
                })
                console.log(this.data)
            } else {
                this.backCard()
            }
        }
        wx.pageScrollTo({
            scrollTop: 0
        })
    },
    questionStepsBack() {
        this.setData({
            questionIndex: Math.max(0, this.data.questionIndex - 1)
        })
        const question = <QuestionPostItem>this.data.answerList[this.data.questionIndex]
        this.setData({
            questionName: question.question,
            questionType: question.type == 1,
            choseList: question.choseList.map((value) => {
                if (question.correctAnswer.indexOf(value.choseIndex) >= 0) {
                    value.checked = 2
                }
                return value
            }),
            choseNum: question.choseList.length,
            correctAnswer: question.correctAnswer
        })
        console.log(this.data)
    },
    questionFinished() {
        console.log('finish', this.data.answerList)
        if (!this.dataCheck()) {
            return
        }
        if (this.data.answerList.length > 0) {
            //本页的数据提交
            this.postHomework(this.data.homeworkName)
                .then(() => {})
                .catch((reason) => {
                    console.log(reason)
                })
        }
        this.clear()
        this.backCard()
    },

    inputHomeworkName(e: wx.InputEvent) {
        this.setData({
            homeworkName: e.detail.value
        })
    },
    inputQuestionName(e: wx.InputEvent) {
        this.setData({
            questionName: e.detail.value
        })
    },
    oneChoseInput(e: wx.InputEvent) {
        this.data.choseList[e.currentTarget.dataset.index].name = e.detail.value
        console.log(this.data)
        this.setData({
            choseList: this.data.choseList
        })
        console.log(this.data)
    },
    inputChose(e: wx.FormEvent) {
        let choseList: ChoseItem[] = []
        for (let i = 0; i < this.data.choseNum; i++) {
            choseList.push({
                name: e.detail.value['chose' + i.toString()] as string,
                choseIndex: i.toString()
            })
            this.setData({
                choseList: choseList
            })
        }
        console.log('submit', this.data.choseList)
    },
    questionTypeChange(e: wx.CustomEvent<'change', { value: boolean }>) {
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
    checkboxChange(e: { detail: { value: any } }) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
        let value = e.detail.value
        if (!this.data.questionType) {
            value = [e.detail.value]
        }
        for (let it of this.data.choseList as ChoseItem[]) {
            if (value.indexOf(it.choseIndex) >= 0) {
                it.checked = 2
            }
        }
        this.setData({
            choseList: this.data.choseList,
            correctAnswer: value
        })
    },

    // ListTouch触摸开始
    ListTouchStart(e: { touches: { pageX: any }[] }) {
        this.setData({
            ListTouchStart: e.touches[0].pageX
        })
    },

    // ListTouch计算方向
    ListTouchMove(e: { touches: { pageX: number }[] }) {
        this.setData({
            ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
        })
    },

    // ListTouch计算滚动
    ListTouchEnd(e: { currentTarget: { dataset: { target: any } } }) {
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
