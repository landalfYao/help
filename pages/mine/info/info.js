const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:{}
  },
  formSubmit(e){
    wx.showLoading({
      title: '加载中',
      task:true
    })
    let form = e.detail.value
    form.id = wx.getStorageSync('user').id
    if (e.detail.value.nick_name != '' && e.detail.value.phone != '' && e.detail.value.dphone != ''){
      app.com.post('wx/user/update/wx', form, function (res) {
        wx.hideLoading()
        if(res.code == 1){
          wx.showToast({
            title: '修改成功',
          })
          let uinfo = wx.getStorageSync("user");
          uinfo.nick_name = e.detail.value.nick_name;
          wx.setStorageSync("user",uinfo)
        }
      })
    }else{
      wx.showToast({
        title: '修改失败',
        icon:'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      msg:wx.getStorageSync("user")
    })
  },
})