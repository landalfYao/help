const app = getApp()
let _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
    this.getList(options.id)
  },
  getList(id) {
    app.com.post('help/get2', {
      fields: 'helplist.*,wxuser.phone,wxuser.dphone,wxuser.avatar_url,wxuser.nick_name',
      wheres:'helplist.id='+id,
      sorts:'helplist.create_time asc'
    }, function (res) {
      if (res.code == 1) {
        let re = res.data.list
        _this.setData({
          list: re[0],
          total: res.data.total
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  makePhoneCall(e){
    let ty = e.currentTarget.dataset.type
    wx.makePhoneCall({
      phoneNumber:this.data.list[ty] ,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})