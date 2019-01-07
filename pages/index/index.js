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

  
  navTo(e) {
    if(e.currentTarget.dataset.path == '/pages/other/other'){
      let index = e.currentTarget.dataset.index
      wx.navigateTo({
        url: '/pages/other/other?label=' + this.data.list[index].label + '&data=' + JSON.stringify(this.data.list[index].data),
      })
    }else{
      app.com.navTo(e)
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
        area: wx.getStorageSync('area')
      })
    }else{
      wx.navigateTo({
        url: '/pages/area/area',
      })
    }
    // if(wx.getStorageSync("user").nick_name){
      
    // }else{
    //   wx.navigateTo({
    //     url: '/pages/login/login',
    //   })
    // }
  }
  
})
