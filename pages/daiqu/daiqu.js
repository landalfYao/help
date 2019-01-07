const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kdtype: [{ la: '小件', price: 1 }, { la: '中件', price: 2 }, { la: '大件', price: 3 }],
    flag:0
  },
  change(e){
    this.setData({
      flag: e.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  formSubmit(e){
    let formId = e.detail.formId
    let mu = e.detail.value.mu
    if(mu == ''){
      wx.showToast({
        title: '收件请填写地址',
        icon:'none'
      })
    }else{
      wx.showLoading({
        title: '发布中',
        mask:true
      })
      app.com.post('help/add',{
        wx_id:wx.getStorageSync("user").id,
        mu:mu,
        a_id: wx.getStorageSync("area").pk_id,
        form_id:formId,
        title:'快递代取',
        des:this.data.kdtype[this.data.flag].la+' '+e.detail.value.des,
        total_fee: this.data.kdtype[this.data.flag].price
      },function(res){
        if(res.code == 1){
          wx.showToast({
            title: '发布成功',
          })

        }else{
          wx.showToast({
            title: res.msg,
            icon:'none'
          })
        }
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