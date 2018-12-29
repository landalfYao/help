let com = require('./utils/util.js')
App({
  com: com,
  onLaunch: function () {
    wx.login({
      success (res) {
        com.post('wx/user/login',{js_code:res.code},function(res){
          if(res.code == 1){
            wx.setStorageSync("user", res.data)
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
  globalData: {
    userInfo: null
  }
})