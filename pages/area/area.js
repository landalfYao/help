const app = getApp()
let _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
    this.getArea()
  },
  checkedIt(e){
    let index = e.currentTarget.dataset.index;
    wx.setStorageSync('area', this.data.list[index])
    _this.getDail(this.data.list[index].pk_id)
  },
  getArea(){
    app.com.get('area/wxget',{},function(res){
      if(res.code == 1){
        _this.setData({
          list: res.data
        })
        
      }else{
        wx.showToast({
          title: '请求失败',
          icon:none
        })
      }
      
    })
  },
  getDail(aid){
    app.com.post('user/get/aid',{
      aid:aid
    },function(res){
      console.log(res)
      if(res.code == 1){
        wx.setStorageSync("dl", res.data)
        wx.navigateBack({
          delta: 1
        })
      }else{
        wx.showToast({
          title: res.msg,
          icon:'none'
        })
      }
    })
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