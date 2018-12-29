let _this ;
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    genders:['不限','限男性','限女性'],
    gflag:0,
    des:'',
    address:'',
    lnglat:'',
    price:'',
    pubarea:'杭州'
  },
  genderChange(e){
    this.setData({
      gflag: e.detail.value
    })
  },
  priceInput(e){
    this.setData({
      price: e.detail.value
    })
  },
  helpInput(e){
    this.setData({
      des:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
  },
  openLocation(){
    wx.chooseLocation({
      success: function(res) {
        console.log(res)
        _this.setData({
          address:res.name,
          lnglat: res.longitude + ',' + res.latitude
        })
      },
    })
  },
  submit(){
    if(this.data.des == ''){
      wx.showToast({
        title: '请填写发布内容',
        icon:'none'
      })
    }else if( this.data.price == ''){
      wx.showToast({
        title: '请输入打赏金额',
        icon:'none'
      })
    }else{
      wx.showLoading({
        title: '请稍等',
      })
      app.com.post('help/add',{
        wx_id:1,
        des: this.data.des,
        lnglat: this.data.lnglat,
        address:this.data.address,
        pub_area:this.data.pubarea
      },function(res){
        wx.hideLoading()
        if(res.code == 1){
          wx.showToast({
            title: '发布成功',
          })
        }else{
          wx.showToast({
            title: res.msg,
          })
        }
        console.log(res)
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})