//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   
  },
  navToArea(){
    wx.navigateTo({
      url: '/pages/area/area',
    })
  },
  publist(){
    wx.navigateTo({
      url: '/pages/pub/pub',
    })
  },
  onLoad: function () {
    
  },
  
})
