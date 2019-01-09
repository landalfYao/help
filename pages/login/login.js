const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    dphone:''
  },
  ddinput(e){
    let name = e.currentTarget.dataset.name
    this.data[name] = e.detail.value
    this.setData({
      phone: this.data.phone,
      dphone: this.data.dphone
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#6e42d3',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  authorLogin(e){
    if(this.data.phone == ''){
      wx.showToast({
        title: '请填写手机号',
        icon:'none'
      })
    }else{
      wx.showLoading({
        title: '授权中',
      })
      let userInfo = e.detail.userInfo
      userInfo.id = wx.getStorageSync("user").id
      userInfo.phone = this.data.phone
      userInfo.dphone = this.data.dphone
      app.com.post('wx/user/update', userInfo, function (res) {
        if(res.code == 1){
          wx.showToast({
            title: '授权成功',
            mask:true,
            duration:800
          })
          wx.setStorageSync("user", res.data)
          setTimeout(function(){
            wx.navigateBack({
              detal:1
            })
          },800)
        }else{
          wx.showToast({
            title: '授权失败',
            icon:'none'
          })
        }
      })
    }
    
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