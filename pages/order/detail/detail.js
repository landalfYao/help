const app = getApp()
let _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wx_id:wx.getStorageSync("user").id
  },
  cancel(e) {
    wx.showModal({
      title: '提示',
      content: '确定要取消吗？',
      success(res) {
        if (res.confirm) {
          app.com.cancel(e.currentTarget.dataset.id, 'navigateTo', function (res) {
            if (res) {
              _this.getList(e.currentTarget.dataset.id)
            }
          })
        }
      }
    })

  },
  pay(e){
    app.com.post('help/pay',{
      title: e.currentTarget.dataset.title,
      openid:wx.getStorageSync("user").openid,
      oid: e.currentTarget.dataset.id,
      total_fee: e.currentTarget.dataset.price
    },function(res){
      if(res.code == 1){
        app.com.wxpay(res)
      }
    })
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
        if(re[0].jd_id){
          _this.getJd()
        }
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  getJd(){
    app.com.post('wx/user/get/id',{
      id: wx.getStorageSync("user").id
    },function(res){
      if(res.code == 1){
        _this.setData({
          jduser:res.data
        })
      }
    })
  },
  makePhoneCall(e){
    let ty = e.currentTarget.dataset.type
    if (this.data.wx_id == this.data.list.wx_id || this.data.wx_id == this.data.list.jd_id){
      wx.makePhoneCall({
        phoneNumber: this.data.list[ty],
      })
    }else{
      wx.showToast({
        title: '您不是该单的发布者或接单人',
        icon:'none'
      })
    }
    
  },
  makePhoneCall2(e) {
    let ty = e.currentTarget.dataset.type
    if (this.data.wx_id == this.data.list.wx_id || this.data.wx_id == this.data.list.jd_id) {
      wx.makePhoneCall({
        phoneNumber: this.data.jduser[ty],
      })
    } else {
      wx.showToast({
        title: '您不是该单的发布者或接单人',
        icon: 'none'
      })
    }
   
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