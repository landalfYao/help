const app = getApp()
let _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'',
    no:'',
    page:0,
    cai:false,
    total_fee:0,
    address:''
  },
  
  navTo(e) {
    app.com.navTo(e)
  },
  chooseFile(){
    wx.navigateTo({
      url: '/pages/dayin/dy/dy',
    })
    // wx.chooseMessageFile({
    //   count: 1,
    //   type: 'all',
    //   success(res) {
    //     const tempFilePaths = res.tempFilePaths
    //     console.log(res)
    //   }
    // })
  },
  pageInput(e){
    this.data.page = e.detail.value
    this.init()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
    this.setData({
      msg:wx.getStorageSync("server")[options.index],
      price: wx.getStorageSync("server")[options.index].price_gui.split(','),
    })
    this.init()
    if (wx.getStorageSync("address")) {
      let add = wx.getStorageSync("address")
      this.setData({
        address: add.address + '-' + add.detail
      })
    }
  },
  onShow(){
    this.getFile()
  },
  getFile(){
    wx.showLoading({
      title: '请稍等',
      task:true
    })
    app.com.post('file/get',{
      sorts:'create_time desc',
      pageIndex:1,
      pageSize:1,
      wheres:'is_delete=0 and is_temp=1 and wx_id = '+wx.getStorageSync('user').id
    },function(res){
      wx.hideLoading()
      if(res.code == 1){
        _this.setData({
          file: res.data.list[0] ? res.data.list[0]:''
        })
      }
    })
  },
  formSubmit(e){
    let formId = e.detail.formId
    if(this.data.file == ''){
      wx.showToast({
        title: '请上传文件',
        icon: 'none'
      })
    }else if(this.data.address == ''){
      wx.showToast({
        title: '请选择一个地址',
        icon:'none'
      })
    } else if (e.detail.value.page == '' || e.detail.value.page == null){
      wx.showToast({
        title: '请输入页数',
        icon: 'none'
      })
    }else {
      wx.showLoading({
        title: '加载中',
      })
      app.com.post('help/add', {
        openid: wx.getStorageSync("user").openid,
        des: '文件：' + this.data.file.filename + ' ' + e.detail.value.page+'页 '+e.detail.value.des,
        file:this.data.file.realname,
        wx_id: wx.getStorageSync("user").id,
        total_fee: this.data.total_fee,
        a_id: wx.getStorageSync("area").pk_id,
        title: this.data.msg.server_name,
        mu: this.data.address,
        cai:this.data.cai ? 1:0,
        page: e.detail.value.page,
        form_id: e.detail.formId,},function(res){
          wx.hideLoading()
          if (res.code == 1) {
            _this.wxpay(res)
            _this.tempUp()
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            })
          }
        })
    }
  },
  tempUp(){
    app.com.post('file/temp',{
      id:this.data.file.id
    },function(res){

    })
  },
  wxpay(msg) {
    app.com.wxpay(msg)
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