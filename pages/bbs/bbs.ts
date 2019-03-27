Page({

    /**
     * 页面的初始数据
     */
    data: {
      bbsList:[{"topicID":"1234567",
                  "user":"张三",
                  "time":"2019-02-28 22:09:23",
                  "title":"为什么这个题使用字扩展而不是位扩展？",
                  "content":"balabalabala，4x8k，balabalabala，4x16k，balabalabala",
                  "replyCount":12,
                  "clickingRate":14
      },{"topicID":"1234567",
                  "user":"张三",
                  "time":"2019-02-28 22:09:23",
                  "title":"为什么这个题使用字扩展而不是位扩展？",
                  "content":"balabalabala，4x8k，balabalabala，4x16k，balabalabala",
                  "replyCount":12,
                  "clickingRate":14
      }],
      modalName:''
      
    },
    showModal(e:any) {
      this.setData({
          modalName:'bottomModal'
      })
    },
    hideModal(e:any) {
      this.setData({
        modalName: null
      })
    },
    topic(e:any){

    },
    
    onPullDownRefresh() {
      wx.stopPullDownRefresh()
    },
  
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      
    },
  
   
  })