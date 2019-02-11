//app.ts
export interface IMyApp extends wx.AppOptions {
    globalData: {
        readonly hostName: string // 后端的地址
        openid: string | null
        college: string | null // 学校
        personID: string | null // 学号/教工号
    }
}

App<IMyApp>({
    onLaunch() {
        // TODO: 在此处初始化APP信息(需要同步的网络请求，请在launch-page处理)
    },
    globalData: {
        hostName: 'https://www.turing-cup.online/netc', // 此处的hostName请勿添加末尾斜线
        openid: null,
        college: null,
        personID: null
    }
})
