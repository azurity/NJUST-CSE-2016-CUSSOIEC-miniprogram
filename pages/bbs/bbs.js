Page({

  /**
   * 页面的初始数据
   */
  data: {
    bbsList:['a','b','c','d','e','f','g','h','i','j','k']
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