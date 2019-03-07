Page({

    /**
     * 页面的初始数据
     */
    data: {
      bbsList:[{title:"",time:'2019-03-07 11:11:00',tag:'高等数学'},'b','c','d','e','f','g','h','i','j','k']
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