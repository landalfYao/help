const app = getApp()
let _this;
Page({

  /**
   * 页面的初始数据
   */
  userInfo: {},
  hasUserInfo: false,
  canIUseGetUserProfile: false,
  data: {
    phone:'',
    dphone:''
  },
  getPhoneNumber (e) {
    console.log(e.detail.code)
  },
  ddinput(e){
    let name = e.currentTarget.dataset.name;
    this.data[name] = e.detail.value;
    
    this.setData({
      phone: this.data.phone,
      dphone: this.data.dphone
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {

    wx.getUserProfile({
      desc: '用于完善用户资料(头像、昵称等)',
      success: (res) => {
        console.log('获取用户信息成功', res)
        this.setData({
          userInfo: res.userInfo
        })
        this.authorLogin()
      },
      fail: (res) => {
        console.log('获取用户信息失败', res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  authorLogin(e){
    if(this.data.phone == ''){
      wx.showToast({
        title: '请填写手机号',
        icon:'none'
      })
    }else{
      wx.showLoading({
        title: '授权中',
        task:true
      })
      let userInfo = this.data.userInfo
      console.log()
      userInfo.id = wx.getStorageSync("user").id
      userInfo.phone = this.data.phone
      userInfo.dphone = this.data.dphone
      app.com.post('wx/user/update', userInfo, function (res) {
        wx.hideLoading()
        if(res.code == 1){
          wx.showToast({
            title: '授权成功',
            mask:true,
            duration:800
          })
          let user = res.data
          user.phone = userInfo.phone
          wx.setStorage({
            key: 'user',
            data: user,
          })
          // wx.setStorageSync("user", user)
          setTimeout(function(){
            wx.navigateBack({
              detal:1
            })
          },900)
        }else{
          wx.showToast({
            title: '授权失败',
            icon:'none'
          })
        }
      })
    }
  },
})