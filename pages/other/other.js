//index.js
//获取应用实例
const app = getApp()
let _this;
Page({
  data: {
    price: '',
    des: '',
    phone: ''
  },
  navTo(e) {
    app.com.navTo(e)
  },
  formSubmit(e) {
    let formId = e.detail.formId
    if (e.detail.value.des == '') {
      wx.showToast({
        title: '请填写帮助内容',
        icon: 'none'
      })
    } else if (e.detail.value.price == '') {
      wx.showToast({
        title: '请输入赏金',
        icon: 'none'
      })
    } else if (this.data.address == ''){
      wx.showToast({
        title: '请选择目的地',
        icon: 'none'
      })
    } else if (e.detail.value.price <1){
      wx.showToast({
        title: '输入金额不能小于1',
        icon: 'none'
      })
    }else {
      wx.showLoading({
        title: '加载中',
      })
      app.com.post('help/add', {
        openid: wx.getStorageSync("user").openid, 
        des: e.detail.value.des,
        wx_id: wx.getStorageSync("user").id,
        total_fee: e.detail.value.price,
        a_id: wx.getStorageSync("area").pk_id,
        title:this.data.title,
        mu: this.data.address,
        qi: e.detail.value.qi,
        form_id: e.detail.formId,
      }, function (res) {
        wx.hideLoading()
        if (res.code == 1) {
          _this.wxpay(res)
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      })
    }
  },
  wxpay(msg) {
    app.com.wxpay(msg)
  },
  navTo(e) {
    app.com.navTo(e)
  },
  navToArea() {
    wx.navigateTo({
      url: '/pages/area/area',
    })
  },
  publist() {
    wx.navigateTo({
      url: '/pages/pub/pub',
    })
  },
  tagsClick(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      price:this.data.msg.tagsFilter[index].price,
      des: this.data.msg.tagsFilter[index].label
    })
  },
  onLoad: function (options) {
    _this = this
    let msg = wx.getStorageSync("server")[options.index];
    let tags = msg.tags ?  msg.tags.split(','):[];
    let arr= []
    for(let i in tags){
      arr.push({ label: tags[i], price: tags[i].replace(/[^0-9]/ig, "")})
    }
    msg.tagsFilter = arr
    this.setData({
      title:options.label,
      msg: msg,
    })
    wx.setNavigationBarTitle({
      title: options.label,
    })
    if (wx.getStorageSync("address")) {
      let add = wx.getStorageSync("address")
      this.setData({
        address: add.address + '-' + add.detail
      })
    }
  },
  onShow() {
    // if (wx.getStorageSync('area')) {
    //   this.setData({
    //     area: wx.getStorageSync('area')
    //   })
    // } else {
    //   wx.navigateTo({
    //     url: '/pages/area/area',
    //   })
    // }
  }

})
