//index.js
//获取应用实例
const app = getApp()
let _this;
Page({
  data: {
    imgurls:[],
    isFirst:true,
    list:[
    ],
    server:[]
  },
  navToArea(){
    wx.navigateTo({
      url: '/pages/area/area',
    })
  },
  navTo2(e){
    app.com.navTo(e)
  },
  navTo(e) {
    if (wx.getStorageSync("user").phone == '' || wx.getStorageSync("user").phone == null || wx.getStorageSync("user").phone == undefined){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else{
      let name = e.currentTarget.dataset.name
      let index = e.currentTarget.dataset.index
      if(this.data.list[index].is_show == 1){
        if (name == '快递代取') {
          wx.navigateTo({
            url: '/pages/daiqu/daiqu?index=' + index,
          })
        } else if (name == '打印服务') {
          wx.navigateTo({
            url: '/pages/dayin/dayin?index=' + index,
          })
        } else {
          wx.navigateTo({
            url: '/pages/other/other?label=' + name + '&index=' + index,
          })

        }
      }else{
        wx.showModal({
          title: '提示',
          content: '服务暂停中',
          showCancel: false,
          confirmText: '朕知道了',
          confirmColor: '#6887e1'
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
  onLoad: function (options) {
    _this = this
    this.login()
  },
  getCarousel(){
    app.com.post('calousels/get',{a_id:wx.getStorageSync("area").pk_id},function(res){
      if(res.code == 1){
        _this.setData({
          imgurls:res.data.list
        })
      }
    })
  },
  login(){
    wx.showLoading({
      title: '加载中',
      task:true
    })
    app.login(function (res) {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      app.getRes(res.data.id)
      app.getMoren(res.data.default_address)
      // _this.getCarousel()
      if (_this.data.isFirst) {
        
        _this.checkArea()
        _this.setData({
          isFirst: false
        })
      }
    })
  },
  onPullDownRefresh(){
    this.login()
    this.getServer(wx.getStorageSync('dl').pk_id)
  },
  onShow(){
    if(!this.data.isFirst){
      this.checkArea()
    }
    if(!this.data.emer){
      this.getAdminMemr()
    }
  },
  //通知
  getAdminMemr(){
    app.com.post('user/get/emer', { dl_id: 1 }, function (res) {
      _this.setData({
        emer: res.data
      })
      if (res.data.open_emer == 1) {
        wx.showModal({
          title: res.data.emer_title,
          content: res.data.emer_content,
          showCancel: false,
          confirmText: '朕知道了',
          confirmColor: '#6887e1'
        })
      }else{
        _this.getMemr()
      }
    })
  },
  getMemr(){
    app.com.post('user/get/emer',{dl_id:wx.getStorageSync("dl").pk_id || 1},function(res){
      _this.setData({
        emer:res.data
      })
      if(res.data.open_emer == 1){
        wx.showModal({
          title: res.data.emer_title,
          content: res.data.emer_content,
          showCancel:false,
          confirmText:'朕知道了',
          confirmColor:'#6887e1'
        })
      }
    })
  },
  getServer(id) {
    app.com.post('server/get/uid', {
      uid: id
    }, function (res) {
      if (res.code == 1) {
        wx.setStorageSync("server", res.data)
        _this.setData({list:res.data})
      
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  checkArea() {
    if (wx.getStorageSync('area')) {
      this.setData({
        area: wx.getStorageSync('area'),
      })
      if(_this.data.imgurls.length == 0){
        _this.getCarousel()
      }
      if(_this.data.list.length == 0){
        _this.getServer(wx.getStorageSync('dl').pk_id)
      }

    } else {
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
