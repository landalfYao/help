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

  formSubmit(e) {
    this.setData({
      des: e.detail.value.des,
      phone: e.detail.value.phone,
      price: e.detail.value.price
    })
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
    } else if (e.detail.value.phone == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
    } else {
      wx.showLoading({
        title: '加载中',
      })
      app.com.post('help/add', {
        des: e.detail.value.des,
        wx_id: wx.getStorageSync("user").id,
        phone: e.detail.value.phone,
        price: e.detail.value.price
      }, function (res) {
        wx.hideLoading()
        if (res.code == 1) {
          wx.showToast({
            title: '发布成功',
          })
          _this.setData({
            des: '',
            phone: '',
            price: ''
          })
        }
      })
    }
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
  onLoad: function () {
    _this = this
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
