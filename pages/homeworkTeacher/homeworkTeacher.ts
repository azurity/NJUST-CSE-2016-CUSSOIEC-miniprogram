import { IMyApp } from '../../app'

const app = getApp<IMyApp>()

Page({
    data: {
        homeworkList: [{
            name: "数字音频理论",
            homeworkID: "1234",
            isFinished: true
        },{
            name: "数字视频信号处理",
            homeworkID: "12345",
            isFinished: false
        }],
    }
})