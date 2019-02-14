const app = getApp()
let _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFee:'0.00',
    realFee:0,
    cashFee:null
  },
  cashInput(e){
    if(e.detail.value > 1000){
      wx.showToast({
        title: '单笔提现金额不能大于1000元',
        icon: 'none'
      })
    } else{
      this.setData({
        cashFee: e.detail.value
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
    this.getData()
  },
  getData(){
    app.com.post('wallet/get/uid',{
      wx_id:wx.getStorageSync("user").id,
      type:1
    },function(res){
      if(res.code == 1){
        _this.setData({
          showFee:res.data.showFee,
          realFee:res.data.realFee
        })
      }
    })
  },
  cashAll(){
    if(this.data.realFee > 0.3){
      this.setData({
        cashFee: this.data.realFee.toFixed(2)
      })
    }else{
      wx.showToast({
        title: '单笔提现金额不能小于0.3元',
        icon: 'none'
      })
    }
  },
  cashIt(){
    if (this.data.cashFee <=0.3){
      wx.showToast({
        title: '单笔提现金额不能小于0.3元',
        icon:'none'
      })
    } else if (this.data.cashFee >1000){
      wx.showToast({
        title: '单笔提现金额不能大于1000元',
        icon: 'none'
      })
    } else if (this.data.cashFee > this.data.realFee+0.01) {
      wx.showToast({
        title: '提现金额不能大于余额',
        icon: 'none'
      })
      this.setData({
        cashFee: this.data.realFee.toFixed(2)
      })
    }else{
      wx.showLoading({
        title: '请求中',
        task:true
      })
      app.com.post('wallet/cash',{cashFee:this.data.cashFee},function(res){
        if(res.code == 1){
          wx.hideLoading()
      
          wx.showModal({
            title: '提现结果',
            content: res.msg,
            showCancel:false,
          })
          _this.getData()
        }
      })
    }
  }
})