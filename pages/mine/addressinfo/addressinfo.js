const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:'',
    address:''
  },
  navTo(e){
    app.com.navTo(e)
  },
  bInput(e){
    this.setData({
      detail:e.detail.value
    })
  },
  submit(){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  
})