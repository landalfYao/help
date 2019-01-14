const app = getApp()
let _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:'',
    address:'',
    mo:false
  },
  dchange(e){
    this.setData({
      mo:e.detail.value
    })
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
    if(this.data.address == ''){
      wx.showToast({
        title: '请选择楼栋',
        icon:'none'
      })
    }else if(this.data.detail == ''){
      wx.showToast({
        title: '请输入门牌号',
        icon:'none'
      })
    }else{
      wx.showLoading({
        title: '保存中',
        task:true
      })
      let url = 'add'
      let formData = {
        address: this.data.address,
        detail: this.data.detail,
      }
      if(this.data.id){
        url = 'update'
        formData.id = this.data.id
      }else{
        formData.wx_id = wx.getStorageSync("user").id
      }
      app.com.post('user/address/'+url,formData,function(res){
        wx.hideLoading()
        if(res.code == 1){
          wx.showToast({
            title: '保存成功',
            task:true
          })
          if(_this.data.mo){
            _this.setMo(_this.data.id ? _this.data.id:res.data)
          }else{
            setTimeout(function () {
              let pages = getCurrentPages();
              let currPage = pages[pages.length - 1];   //当前页面
              let prevPage = pages[pages.length - 2];
              prevPage.getList()
              wx.navigateBack({
                delta: 1
              })
            }, 800)
          }
          
        }
      })
    }
  },
  setMo(id){
    app.com.post('wx/user/update/def/address',{
      default_address:id,
      id: wx.getStorageSync("user").id
    },function(res){
      if(res.code == 1){
        wx.setStorageSync("user", res.data)
        setTimeout(function () {
          let pages = getCurrentPages();
          let currPage = pages[pages.length - 1];   //当前页面
          let prevPage = pages[pages.length - 2];
          prevPage.getList()
          wx.navigateBack({
            delta: 1
          })
        }, 800)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
    if(options.data){
      let msg = JSON.parse(options.data)
      _this.setData({
        detail:msg.detail,
        address:msg.address,
        mo:msg.id == wx.getStorageSync("user").default_address,
        id:msg.id
      })
    }
  },

  
})