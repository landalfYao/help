const app = getApp()
let _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wx_id:wx.getStorageSync("user").id
  },
  comfirm(e) {
    let id = e.currentTarget.dataset.id
    wx.showLoading({
      title: '请稍等',
      task:true
    })
    app.com.post('help/confirm', { id: id }, function (res) {
      wx.hideLoading()
      if (res.code == 1) {
        wx.showToast({
          title: '订单已完成',
        })
        _this.getList(_this.data.list.id)
      } else {
        wx.showToast({
          title: '确认失败',
          icon: 'none'
        })
      }
    })
  },
  takeIt(e) {
    let msg = this.data.list
    if (wx.getStorageSync("res").state == 1) {
      this.takeDo(msg)
    } else {
      wx.showModal({
        title: '提示',
        content: '您还不是接单员，是否前往申请',
        confirmText: '立即前往',
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
  takeDo(msg) {
    wx.showLoading({
      title: '请稍等',
      task: true
    })
    
    app.com.post('help/jd', {
      jd_id: wx.getStorageSync("user").id,
      id: msg.id,
      openid: msg.openid,
      form_id: msg.form_id,
      title: msg.title,
      order_num: msg.order_num
    }, function (res) {
      wx.hideLoading()
      if (res.code == 1) {
        wx.showToast({
          title: '接单成功',
        })
        _this.getList(_this.data.list.id)
      } else {
        wx.showToast({
          title: '接单失败',
          icon: 'none'
        })
      }
    })
  },
  cancel(e) {
    wx.showModal({
      title: '提示',
      content: '确定要取消吗？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '请稍等',
            task: true
          })
          app.com.cancel(e.currentTarget.dataset.id, 'navigateTo', function (res) {
            wx.hideLoading()
            if (res) {
              _this.getList(e.currentTarget.dataset.id)
            }
          })
        }
      }
    })

  },
  pay(e){
    app.com.post('help/pay',{
      title: e.currentTarget.dataset.title,
      openid:wx.getStorageSync("user").openid,
      oid: e.currentTarget.dataset.id,
      total_fee: e.currentTarget.dataset.price
    },function(res){
      if(res.code == 1){
        app.com.wxpay(res,function(res){
          wx.hideLoading()
          if (res) {
            _this.getList(_this.data.id)
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
    this.setData({
      id:options.id
    })
    this.getList(options.id)
  },
  getList(id) {
    app.com.post('help/get2', {
      fields: 'helplist.*,wxuser.phone,wxuser.dphone,wxuser.avatar_url,wxuser.nick_name',
      wheres:'helplist.id='+id,
      sorts:'helplist.create_time asc'
    }, function (res) {
      if (res.code == 1) {
        let re = res.data.list
        _this.setData({
          list: re[0],
          total: res.data.total
        })
        if(re[0].jd_id){
          _this.getJd(re[0].jd_id)
        }
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  getJd(id){
    app.com.post('wx/user/get/id',{
      id: id
    },function(res){
      if(res.code == 1){
        _this.setData({
          jduser:res.data
        })
      }
    })
  },
  makePhoneCall(e){
    let ty = e.currentTarget.dataset.type
    if (this.data.wx_id == this.data.list.wx_id || this.data.wx_id == this.data.list.jd_id){
      wx.makePhoneCall({
        phoneNumber: this.data.list[ty],
      })
    }else{
      wx.showToast({
        title: '您不是该单的发布者或接单人',
        icon:'none'
      })
    }
    
  },
  makePhoneCall2(e) {
    let ty = e.currentTarget.dataset.type
    if (this.data.wx_id == this.data.list.wx_id || this.data.wx_id == this.data.list.jd_id) {
      wx.makePhoneCall({
        phoneNumber: this.data.jduser[ty],
      })
    } else {
      wx.showToast({
        title: '您不是该单的发布者或接单人',
        icon: 'none'
      })
    }
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  
})