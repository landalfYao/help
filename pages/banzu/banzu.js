const app = getApp()
let _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    page:1,
    load:false,
    size:10,
    tag:['校园帮','我发出的','我帮助的'],
    flag:0,
    url:'get',
    wheres:"",
    sorts:"",
    fields:'',
    wx_id:wx.getStorageSync("user").id
  },
  getWxsmData(){
    let date = new Date()
    let m = date.getMonth() + 1
    let month = m < 10 ? ""+"0"+m:m
    let com = date.getFullYear() + '-' + month+'%'
    app.com.post('anlysis/get/wx/sm',{wx_id:wx.getStorageSync("user").id,com_time:com},function(res){
      console.log(res)
      if(res.code == 1){
        _this.setData({
          anlysis:res.data
        })
      }
    })
  },
  comfirm(e){
    let id = e.currentTarget.dataset.id
    wx.showLoading({
      title: '请稍等',
      task:true
    })
    app.com.post('help/confirm',{id:id},function(res){
      wx.hideLoading()
      if(res.code == 1){
        wx.showToast({
          title: '订单已完成',
        })
        _this.getList(0)
      }else{
        wx.showToast({
          title: '确认失败',
          icon: 'none'
        })
      }
    })
  },
  takeIt(e){
    let index = e.currentTarget.dataset.index
    let msg = this.data.list[index]
    if (wx.getStorageSync("res").state == 1){
      if (wx.getStorageSync("res").a_id == wx.getStorageSync("area").pk_id) {
        this.takeDo(msg)
      }else{
        wx.showModal({
          title: '提示',
          content: '您不是该学校的接单员',
          confirmText: '朕知道了',
          showCancel:false,
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/register/register',
              })
            }
          }
        })
      }
    } else{
      wx.showModal({
        title: '提示',
        content: '您还不是接单员，是否前往申请',
        confirmText:'立即前往',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/register/register',
            })
          }
        }
      })
    }
    
    
  },
  takeDo(msg){
    wx.showLoading({
      title: '请稍等',
      task:true
    })
    app.com.post('help/jd', {
      jd_id: wx.getStorageSync("user").id,
      id: msg.id,
      openid:msg.openid,
      form_id:msg.form_id,
      title:msg.title,
      order_num:msg.order_num
    }, function (res) {
      wx.hideLoading()
      if (res.code == 1) {
        wx.showToast({
          title: '接单成功',
        })
        _this.getList(0)
      } else {
        wx.showToast({
          title: '接单失败',
          icon: 'none'
        })
      }
    })
  },
  pay(e) {
    wx.showLoading({
      title: '请稍等',
      task: true
    })
    app.com.post('help/pay', {
      title: e.currentTarget.dataset.title,
      openid: wx.getStorageSync("user").openid,
      oid: e.currentTarget.dataset.id,
      total_fee: e.currentTarget.dataset.price
    }, function (res) {
      if (res.code == 1) {
        app.com.wxpay(res,function(res){
          wx.hideLoading()
          if(res){
            _this.getList(0)
          }
        })
      }
    })
  },
  cancel(e){
    wx.showModal({
      title: '提示',
      content: '确定要取消吗？',
      success(res){
        if(res.confirm){
          wx.showLoading({
            title: '请稍等',
            task: true
          })
          app.com.cancel(e.currentTarget.dataset.id, 'navigateTo',function(res){
            wx.hideLoading()
            if(res){
              _this.getList(0)
            }
          })
        }
      }
    })
    
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
      _this.data.fields = 'helplist.*,wxuser.phone,wxuser.dphone,wxuser.avatar_url,wxuser.nick_name'
      _this.data.wheres = 'helplist.is_delete=0 and jd_id=' + wx.getStorageSync("user").id
      _this.data.sorts = "helplist.create_time desc"
      _this.getList(0)
      _this.getWxsmData()
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
    this.setData({
      load:true
    })
    app.com.post('help/'+this.data.url, {
      a_id:wx.getStorageSync("area").pk_id,
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
          total: res.data.total,
          load:false
        })
      } else {
        _this.setData({
         
          load: false
        })
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
    if(wx.getStorageSync("bzflag")){
      this.changeTag({ currentTarget: { dataset: { index: wx.getStorageSync("bzflag")}}})
      wx.removeStorageSync("bzflag")
    }else{
      if(this.data.flag != 0){
        this.changeTag({ currentTarget: { dataset: { index: 0 } } })
      }
    }
    this.setData({
      wx_id: wx.getStorageSync("user").id
    })
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
    return {
      title:'互帮互助代替你',
      path:'/pages/index/index'
    }
  }
})