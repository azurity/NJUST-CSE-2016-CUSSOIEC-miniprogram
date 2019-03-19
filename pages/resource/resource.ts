import { IMyApp } from '../../app'
import { resourceRes, resourceItem } from '../../utils/course/resourceRes'
const app = getApp<IMyApp>()
Page({
    data: {
        loadModal: false,
        // resourceList:[{name:'1.函数及其特性.zip',url:'',isDownLoad:false},
        // {name:'2.极限的概念、性质和运算法则.zip',url:'',isDownLoad:false},
        // {name:'3.两个重要极限.zip',url: '',isDownLoad:true}]
        resourceList: <resourceItem[]>[]
    },
    downtap(event: wx.TapEvent) {
        let url: string = event.currentTarget.dataset.url
        this.setData({
            loadModal: true
        })
        wx.downloadFile({
            url: url,
            success: (res) => {
                // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                let filePath = res.tempFilePath
                // TODO: 文件存储
                wx.showToast({
                    title: '下载完成',
                    icon: 'success'
                })
            },
            fail: () => {
                wx.showToast({
                    title: '下载失败',
                    icon: 'none'
                })
            },
            complete: () => {
                this.setData({
                    loadModal: false
                })
            }
        })
    },
    onLoad() {
        this.initSource(wx.getStorageSync('CourseDetail').courseID)
            .then(() => {})
            .catch((reason) => {
                console.log(reason)
            })
    },
    async initSource(courseID: string) {
        let resource = await new Promise<resourceRes>((resolve, reject) => {
            wx.request({
                url: app.globalData.hostName + '/course/resources',
                method: 'GET',
                data: {
                    courseID: courseID
                },
                success: ({ data }) => {
                    resolve(<resourceRes>data)
                },
                fail: reject
            })
        })
        if (resource.success) {
            this.setData({
                resourceList: resource.result
            })
        } else {
            // TODO: 错误处理
        }
    }
})
