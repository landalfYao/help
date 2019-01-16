let com = require('./utils/util.js')
App({
  com: com,
  onLaunch: function () {
    let _this = this
    wx.login({
      success (res) {
        com.post('wx/user/login',{js_code:res.code},function(res){
          if(res.code == 1){
            wx.setStorageSync("user", res.data)
            _this.getRes(res.data.id)
            _this.getMoren(res.data.default_address)
          }else{
            wx.showToast({
              title: '失败',
              icon:'none'
            })
          }
        })
      }
    })
  },
  //获取默认地址
  getMoren(id){
    if(id){
      com.post('user/address/get/id', { id: id }, function (res) {
        if (res.code == 1) {
          wx.setStorageSync("address", res.data)
        } else {
          wx.showToast({
            title: '失败',
            icon: 'none'
          })
        }
      })
    }
  },
  getRes(id){
    com.post('wx/user/get/info/wxid', { wx_id: id }, function (res) {
      if (res.code == 1) {
        wx.setStorageSync("res", res.data)
      } else {
        wx.showToast({
          title: '失败',
          icon: 'none'
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})