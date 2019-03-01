const app = getApp()
let _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:{},
    temp:false
  },
  formSubmit(e){
    wx.showLoading({
      title: '加载中',
      task:true
    })
    let form = e.detail.value;
    form.id = wx.getStorageSync('user').id;
    
    if (e.detail.value.nick_name != '' && e.detail.value.phone != '' ){
      _this.upload(function(r){
        form.avatar_url = _this.data.msg.avatar_url;
        app.com.post('wx/user/update/wx', form, function (res) {
          wx.hideLoading()
          if (res.code == 1) {
            wx.showToast({
              title: '修改成功',
            })
            let uinfo = wx.getStorageSync("user");
            uinfo.nick_name = e.detail.value.nick_name;
            wx.setStorageSync("user", uinfo)
            _this.setData({
              temp:false
            })
          }
        })
      })
      
    }else{
      wx.showToast({
        title: '修改失败',
        icon:'none'
      })
    }
  },
  changeAvatar(){
    wx.chooseImage({
      count:1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        wx.compressImage({
          src: res.tempFilePaths[0], // 图片路径
          quality: 50, 
          success(res){
            _this.setData({
              'msg.avatar_url': res.tempFilePath,
              temp: true
            })
          },
          fail(res){
            console.log(res)
          }
        })
        // _this.setData({
        //   'msg.avatar_url': res.tempFilePaths[0],
        //   temp: true
        // })
        
      },
    })
  },
  upload(cb){
    if(this.data.temp){
      wx.uploadFile({
        url: app.com.API + 'file/upload', 
        filePath: this.data.msg.avatar_url,
        name: 'file',
        formData: {
          wx_id: wx.getStorageSync("user").id,
          a_id: wx.getStorageSync("area").pk_id,
          is_temp:0
        },
        success(res) {
          let red = JSON.parse(res.data)
          if (red.code == 1) {

            let uinfo = wx.getStorageSync("user");
            uinfo.avatar_url = red.data.url;
            wx.setStorageSync("user", uinfo)
            _this.setData({
              'msg.avatar_url': red.data.url
            })
            cb(true)
          }else{
            cb(false)
          }
        }
      })
    }else{
      cb(false)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this= this
    this.setData({
      msg:wx.getStorageSync("user")
    })
  },
})