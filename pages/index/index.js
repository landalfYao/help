//index.js
//获取应用实例
const app = getApp()
let _this;
Page({
  data: {
    area:{
      name:'宁波大红鹰学院'
    },
    list:[
      { icon: '/img/s1.png', label: '快递代取', page: '/pages/daiqu/daiqu', color:'linear-gradient(to right top,#7162f6,#b746f0)'},
      { icon: '/img/s2.png', label: '校园跑腿', page: '/pages/paotui/paotui', color: 'linear-gradient(to right top,#8faefd,#45c6ff)' },
      { icon: '/img/s3.png', label: '打印', page: '/pages/dayin/dayin', color: 'linear-gradient(to right top,#43e2ec,#31beff)' },
      { icon: '/img/s4.png', label: '上门维修', page: '/pages/weixiu/weixiu', color: 'linear-gradient(to right top,#ef429a,#f95f46)' },
      { icon: '/img/s5.png', label: '代课', page: '/pages/daike/daike', color: 'linear-gradient(to right top,#0dc8b8,#29d790)' },
      { icon: '/img/s6.png', label: '其他', page: '/pages/other/other', color: 'linear-gradient(to right top,#fd65a2,#ff8866)' }
    ]
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
    // if(wx.getStorageSync('area')){
    //   this.setData({
    //     area: wx.getStorageSync('area')
    //   })
    // }else{
    //   wx.navigateTo({
    //     url: '/pages/area/area',
    //   })
    // }
  }
  
})
