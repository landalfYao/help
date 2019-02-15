// pages/mine/jdsm/jdsm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  jdsm(){
    wx.setStorageSync("xy", true)
    wx.navigateBack({
      detla:1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  
})