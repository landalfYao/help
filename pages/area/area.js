const app = getApp()
let _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    load:false,
    search:'',
    wheres:''
  },
  searchInput(e){
    let search = e.detail.value
    if(search == ''){
      this.data.wheres = ''
    }else{
      this.data.wheres = 'is_delete=0 and name like "%'+search+'%"'
    }
    this.getArea()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#6e42d3',
    })
    _this = this
    this.getArea()
  },
  checkedIt(e){
    let index = e.currentTarget.dataset.index;
    wx.setStorageSync('area', this.data.list[index])
    _this.getDail(this.data.list[index].pk_id)
  },
  getArea(){
    this.setData({
      load:true
    })
    app.com.post('area/get',{
      pageIndex:1,
      pageSize:1000,
      wheres:this.data.wheres
    },function(res){
      if(res.code == 1){
        _this.setData({
          list: res.data.list,
          load:false
        })
        
      }else{
        wx.showToast({
          title: '请求失败',
          icon:'none'
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
        _this.getServer(res.data.pk_id)
        
      }else{
        wx.showToast({
          title: res.msg,
          icon:'none'
        })
      }
    })
  },  
  getServer(id){
    app.com.post('server/get/uid', {
      uid: id
    }, function (res) {
      if (res.code == 1) {
        wx.setStorageSync("server", res.data)
        wx.navigateBack({
          delta: 1
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
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