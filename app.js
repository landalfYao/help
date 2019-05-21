let com = require('./utils/util.js')
App({
  com: com,
  onLaunch: function () {
    let _this = this
  },
  login(cb){
    wx.login({
      success(res) {
        com.post('wx/user/login', { js_code: res.code }, function (res) {
          if (res.code == 1) {
            wx.setStorageSync("user", res.data)
            wx.setStorageSync("token", res.token)
            cb(res)
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
        }
      })
    }
  },
  getRes(id){
    com.post('wx/user/get/info/wxid', { wx_id: id }, function (res) {
      if (res.code == 1) {
        wx.setStorageSync("res", res.data)
      }
    })
  },
  globalData: {
    userInfo: null
  }
})