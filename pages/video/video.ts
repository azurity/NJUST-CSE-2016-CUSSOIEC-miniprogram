function getRandomColor() {
    const rgb = []
    for (let i = 0; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16)
        color = color.length == 1 ? '0' + color : color
        rgb.push(color)
    }
    return '#' + rgb.join('')
}

Page({
    onReady() {
        this.videoContext = wx.createVideoContext('myVideo')
    },
    inputValue: '',
    videoContext: <wx.VideoContext>{},
    data: {
        url: '',
        courseName: '',
        danmuList: [
            {
                text: '第 1s 出现的弹幕',
                color: '#ff0000',
                time: 1
            },
            {
                text: '第 3s 出现的弹幕',
                color: '#ff00ff',
                time: 3
            }
        ]
    },
    onLoad() {
        try {
            let coursename = wx.getStorageSync('name')
            let ur = wx.getStorageSync('url')
            this.setData({
                courseName: coursename,
                url: ur // 可用测试视频'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
            })
            wx.setStorageSync('lastTime', 0)
        } catch (e) {
            //TODO
        }
    },
    bindInputBlur(e: any) {
        this.inputValue = e.detail.value
    },
    bindSendDanmu() {
        this.videoContext.sendDanmu({
            text: this.inputValue,
            color: getRandomColor()
        })
    },
    timeUpdate(e: wx.CustomEvent<'timeupdate', { currentTime: number; duration: number }>) {
        let lastTime = wx.getStorageSync('lastTime')
        if (Math.abs(e.detail.currentTime - lastTime) > 2) {
            // 防拖动
            this.videoContext.seek(lastTime)
            return
        }
        wx.setStorageSync('lastTime', e.detail.currentTime)
    },
    finish() {
        console.log('finish')
    }
})
