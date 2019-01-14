const app = getApp()
let _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
    _this.setData({
      url: app.com.webSrc+'?wx_id='+wx.getStorageSync("user").id
    })
  },

})