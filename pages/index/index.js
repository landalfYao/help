//index.js
//获取应用实例
const app = getApp()
let _this;
Page({
  data: {
    // area:{
    //   name:'宁波大红鹰学院'
    // },
    list:[
      { icon: '/img/s1.png', label: '快递代取', page: '/pages/daiqu/daiqu', color:'linear-gradient(to right top,#6183dd,#6e42d3)'},
      { icon: '/img/s3.png', label: '打印服务', page: '/pages/dayin/dayin', color: 'linear-gradient(to right top,#6183dd,#6e42d3)' },
      { icon: '/img/s2.png', label: '校园跑腿', page: '/pages/other/other',data:{qi:true,mu:true}, color: 'linear-gradient(to right top,#6183dd,#6e42d3)' },
      { icon: '/img/s4.png', label: '上门维修', page: '/pages/other/other', data: { qi: false, mu: true }, color: 'linear-gradient(to right top,#6183dd,#6e42d3)' },
      { icon: '/img/s5.png', label: '代替服务', page: '/pages/other/other', data: { qi: false, mu: true }, color: 'linear-gradient(to right top,#6183dd,#6e42d3)' },
      { icon: '/img/s6.png', label: '其他帮助', page: '/pages/other/other', data: { qi: false, mu: true }, color: 'linear-gradient(to right top,#6183dd,#6e42d3)' }
    ]
  },
  navToArea(){
    wx.navigateTo({
      url: '/pages/area/area',
    })
  },
  
  navTo(e) {
    if (wx.getStorageSync("user").phone == '' || wx.getStorageSync("user").phone == null || wx.getStorageSync("user").phone == undefined){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else{
      let name = e.currentTarget.dataset.name
      let index = e.currentTarget.dataset.index
      if (name == '快递代取') {
        wx.navigateTo({
          url: '/pages/daiqu/daiqu?index='+index,
        })
      } else if (name == '打印服务'){
        wx.navigateTo({
          url: '/pages/dayin/dayin?index=' + index,
        })
      }else{
        wx.navigateTo({
          url: '/pages/other/other?label=' + name+'&index='+index,
        })
        
      }
    }
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
        area: wx.getStorageSync('area'),
        list: wx.getStorageSync('server')
      })
    }else{
      wx.navigateTo({
        url: '/pages/area/area',
      })
    }
  },
  onShareAppMessage(){
    return {
      title:'互帮互助代替你',
      path:'/pages/index/index'
    }
  }
  
})
