const app = getApp()
let _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      { tit: '校园跑腿', des: '我有一个外卖需要人帮我拿一下', price: 2, state: '需要帮助', qi: '南区1号楼1楼外卖柜', mu:'南区1号楼5楼507'},
      { tit: '代课', des: '下午12节课', price: 50, state: '已帮助', qi: '', mu: '南区21号楼5楼501教师' },
      { tit: '上门维修', des: '电脑开不了机了，头大。求大神帮忙', price: 10, state: '已完成', qi: '', mu: '南区1号楼5楼507' },
    ]
  },
  navTo(e) {
    app.com.navTo(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
    _this.getList()
  },
  getList(){
    app.com.post('help/get',{},function(res){
      if(res.code == 1){
        _this.setData({
          list:res.data.list
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