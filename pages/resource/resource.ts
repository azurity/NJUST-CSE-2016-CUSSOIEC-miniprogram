import { IMyApp } from '../../app'

const app = getApp<IMyApp>()
Page({
    data:{
        loadModal:false,
        resourceList:[{name:'1.函数及其特性.zip',url:'',isDownLoad:false},
        {name:'2.极限的概念、性质和运算法则.zip',url:'',isDownLoad:false},
        {name:'3.两个重要极限.zip',url: '',isDownLoad:true}]
    },
    downtap(event:any){
        let name: string = event.currentTarget.dataset.name
        let url: string = event.currentTarget.dataset.url
        let index:number=event.currentTarget.dataset.index
        let download:string="resourceList["+index+"].isDownLoad"
        this.setData({
            loadModal:true
        })
        let that=this
        wx.downloadFile({
            url: url,
            success(res) {
              // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
              var filePath = res.tempFilePath;
              that.setData({
                  loadModal:false,
                  [download]:true
              });


              
              
            }
          })
          setTimeout(()=> {
            this.setData({
              loadModal: false
            })
          }, 2000)
        

    }


})
