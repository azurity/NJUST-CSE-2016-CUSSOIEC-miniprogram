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
    uptap(event: any) {
        wx.chooseImage({
            success(res) {
                console.log('choose')
                wx.showToast({
                    title: '正在上传...',
                    icon: 'loading',
                    mask: true,
                    duration: 2000,
                    success: function(ress) {}
                })
                const tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    url: '', // 需要文件上传接口
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData: {
                        user: app.globalData.personID
                    },
                    success(res) {
                        wx.showToast({
                            title: '成功',
                            icon: 'success',
                            duration: 1000,
                            mask: true
                        })
                    },
                    fail(res) {
                        wx.showToast({
                            title: '上传失败',
                            icon: 'none',
                            duration: 1000,
                            mask: true
                        })
                    }
                })
            }
        })
    },
    downtap(event: any) {
        let name: string = event.currentTarget.dataset.name
        let url: string = event.currentTarget.dataset.url
        let index: number = event.currentTarget.dataset.index
        let download: string = 'resourceList[' + index + '].isDownLoad'
        this.setData({
            loadModal: true
        })
        let that = this
        wx.downloadFile({
            url: url,
            success(res) {
                // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                var filePath = res.tempFilePath
                that.setData({
                    loadModal: false,
                    [download]: true
                })
            }
        })
        setTimeout(() => {
            this.setData({
                loadModal: false
            })
        }, 2000)
    },
    onLoad() {},
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
