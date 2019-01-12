const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'',
    no:'',
    page:0,
    cai:false,
    total_fee:0
  },
  chooseFile(){
    wx.navigateTo({
      url: '',
    })
  },
  pageInput(e){
    this.data.page = e.detail.value
    this.init()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      msg:wx.getStorageSync("server")[options.index],
      price: wx.getStorageSync("server")[options.index].price_gui.split(','),
    })
    this.init()
  },
  formSubmit(e){
    console.log(e)
  },
  switch1Change(e){
    this.setData({
      cai:e.detail.value
    })
    this.init()
  },  
  
  init(){
    let chenben = 0
    let tui = parseFloat(this.data.price[2])
    if(this.data.cai){
      chenben = parseFloat(this.data.price[1])
    }else{
      chenben = parseFloat(this.data.price[0])
    }
    let page = this.data.page ? parseFloat(this.data.page) : 0
    let total = 0

    total = chenben*page+tui
    this.setData({
      total_fee:total
    })
  }
})