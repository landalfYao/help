let com = require('./utils/util.js')
App({
  onLaunch: function () {
    wx.login({
      success (res) {
        com.post('wx/user/login',{js_code:res.code},function(res){
          
        })
      }
    })
    
  },
  globalData: {
    userInfo: null
  }
})