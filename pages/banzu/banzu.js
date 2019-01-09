const app = getApp()
let _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    page:1,
    size:10,
    tag:['校园帮','我发出的','我帮助的'],
    flag:0,
    url:'get',
    wheres:"",
    sorts:"",
    fields:''
  },
  changeTag(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      flag: e.currentTarget.dataset.index
    })
    if(index == 0){
      _this.data.url = 'get'
      _this.data.wheres = 'a_id=' + wx.getStorageSync("area").pk_id
      _this.data.sorts = ""
      _this.data.fields = ''
      _this.getList(0)
    }else if(index == 1){
      _this.data.url = 'get2'
      _this.data.fields = 'helplist.*,wxuser.phone,wxuser.dphone,wxuser.avatar_url,wxuser.nick_name'
      _this.data.wheres = 'helplist.is_delete=0 and wx_id=' + wx.getStorageSync("user").id
      _this.data.sorts = "helplist.create_time desc"
      _this.getList(0)
    }else{
      _this.data.url = 'get2'
      _this.getList(0)
    }
  },
  navTo(e) {
    app.com.navTo(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
    _this.getList(0)
  },
 
  getList(type){
    if (type == 0) {
      this.data.page = 1
    } else {
      this.data.page += 1
    }
    app.com.post('help/'+this.data.url, {
      wheres:this.data.wheres,
      sorts:this.data.sorts,
      fields:this.data.fields,
      pageIndex: this.data.page,
      pageSize: this.data.size
    }, function (res) {
      wx.stopPullDownRefresh()
      if (res.code == 1) {
        let re = res.data.list
        for (let i in re) {
          re[i].time = app.com.formatMsgTime(re[i].create_time)
        }
        let arr = []
        if (type == 0) {
          arr = re
        } else {
          arr = _this.data.list
          for (let i in re) {
            arr.push(re[i])
          }
        }
        _this.setData({
          list: arr,
          total: res.data.total
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    _this.getList(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.list.length < this.data.total){
      _this.getList(1)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})