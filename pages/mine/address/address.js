const app = getApp()
let _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    load:false
  },
  chooseIt(e){
    let index = e.currentTarget.dataset.index
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];   //当前页面
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      address: this.data.list[index].address + '-' + this.data.list[index].detail
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  del(e){
    let index = e.currentTarget.dataset.index
    wx.showModal({
      title: '提示',
      content: '删除后该数据将无法恢复，是否继续?',
      success(res){
        if(res.confirm){
          wx.showLoading({
            title: '删除中',
            task:true
          })
          app.com.post('user/address/del',{
            ids:_this.data.list[index].id
          },function(res){
            wx.hideLoading()
            if(res.code == 1){
              wx.showToast({
                title: '删除成功',
                task:true
              })
              _this.getList()
            }else{
              wx.showToast({
                title: '删除失败',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  },
  navTo(e) {
    app.com.navTo(e)
  },
  bj(e){
    wx.navigateTo({
      url: '/pages/mine/addressinfo/addressinfo?data='+JSON.stringify(this.data.list[e.currentTarget.dataset.index]),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
    _this.getList()
    _this.setData({
      choose: options.choose ? options.choose:0
    })
  },
  getList(){
    this.setData({
      load:true
    })
    app.com.post('user/address/get',{
      pageIndex:1,
      pageSize:1000,
      wheres:'is_delete=0 and wx_id='+wx.getStorageSync("user").id,
      sorts:'create_time desc'
    },function(res){
      if(res.code == 1){
        _this.setData({
          list:res.data.list,
          load:false
        })
      }
    })
  },
  onShow: function (){
    this.setData({
      defId:wx.getStorageSync("user").default_address
    })
  }
})