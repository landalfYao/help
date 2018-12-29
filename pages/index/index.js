//index.js
//获取应用实例
const app = getApp()
let _this;
Page({
  data: {
    price:'',
    des:'',
    phone:''
  },
  bindInput(e){
    this.setData({
      [e.currentTarget.dataset.name]:e.detail.value
    })
  },
  navTo(e) {
    app.com.navTo(e)
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
    _this = this
  },
  onShow(){
    if(wx.getStorageSync('area')){
      this.setData({
        area: wx.getStorageSync('area')
      })
    }else{
      wx.navigateTo({
        url: '/pages/area/area',
      })
    }
  }
  
})
