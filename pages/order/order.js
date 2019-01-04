// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tags:['我发出的','我收到的'],
    tagFlag:0
  },
  changeTag(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      tagFlag:index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  
})