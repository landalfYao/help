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
    } else if (e.detail.value > this.data.realFee){
      wx.showToast({
        title: '提现金额不能大于余额',
        icon: 'none'
      })
    }else{
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
        cashFee: this.data.realFee
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
    }else{
      app.com.post('wallet/cash',{cashFee:this.data.cashFee},function(res){

      })
    }
  }
})