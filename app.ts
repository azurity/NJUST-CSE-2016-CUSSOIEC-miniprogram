//app.ts
export interface IMyApp extends wx.AppOptions {
    globalData: {
        readonly hostName: string // 后端的地址
        openid: string | null
        studentID: string | null
    }
}

App<IMyApp>({
    onLaunch() {
        // TODO: 在此处初始化APP信息(需要同步的网络请求，请在launch-page处理)
    },
    globalData: {
        hostName: 'http://example.com', // TODO: 设置后端地址，此处的hostName请勿添加末尾斜线
        openid: null,
        studentID: null
    }
})
