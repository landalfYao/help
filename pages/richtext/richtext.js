const app = getApp()
let _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
    this.getMsg(options.id)
  },
  getMsg(id){
    app.com.post('richtext/get/id',{id:id},function(res){
      if(res.code == 1){
        let reg = new RegExp('<img', "g")
        res.data.content = res.data.content.replace(reg,'<img width="100%" ')
        _this.setData({
          msg: res.data
        })
        wx.setNavigationBarTitle({
          title: res.data.title,
        })
      }
      
    })
  },
  doIT(){
    wx.makePhoneCall({
      phoneNumber: this.data.msg.phone
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title:this.data.msg.title,
      path: '/pages/richtext/richtext?id=' + this.data.msg.id
    }
  }
})