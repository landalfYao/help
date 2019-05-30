//index.js
//获取应用实例
const app = getApp()
let _this;
Page({
  data: {
    price: '',
    des: '',
    phone: '',
    cert:'',
    stu_card:'',
    show:true,
    isUpdate:false
  },
  gotoUpdate(){
    this.setData({
      show:true,
      isUpdate:true
    })
  },
  choose(e){
    let name = e.currentTarget.dataset.name
    wx.chooseImage({
      count:1,
      success(res) {
        const tempFilePaths = res.tempFilePaths
        if(name=='cert'){
          _this.setData({
            cert: tempFilePaths[0]
          })
          
        }else{
          _this.setData({
            stu_card: tempFilePaths[0]
          })
        }
        _this.upload(name)
      }
    })
  },
  upload(name){
    if (this.data[name] != '' && this.data[name].indexOf('tmp')>0){
      wx.showLoading({
        title: '上传中',
        mask: true
      })
      wx.uploadFile({
        url: app.com.API + 'file/upload', // 仅为示例，非真实的接口地址
        filePath: this.data[name],
        name: 'file',
        formData:{
          wx_id:wx.getStorageSync("user").id,
          a_id:wx.getStorageSync("area").pk_id,
          is_temp: 0
        },
        success(res) {
          wx.hideLoading()
          let red = JSON.parse(res.data)
          if (red.code == 1) {
            
            if(name == 'cert'){
              _this.setData({
                cert: red.data.url
              })
            }else{
              _this.setData({
                stu_card: red.data.url
              })
            }
            
          }
        }
      })
    }else{
      wx.showToast({
        title: '请选择图后再上传',
        icon:'none'
      })
    }
  },
  
  formSubmit(e) {
    let formId = e.detail.formId
    if (e.detail.value.name == '') {
      wx.showToast({
        title: '请输入填姓名',
        icon: 'none'
      })
    } else if (e.detail.value.card_num == ''){
      wx.showToast({
        title: '请输入身份证号码',
        icon: 'none'
      })
    }else if (this.data.stu_card == '' || this.data.stu_card.indexOf('tmp') > 0) {
      wx.showToast({
        title: '请上传学生证',
        icon: 'none'
      })
    }else if (this.data.stu_card == '' || this.data.stu_card.indexOf('tmp')>0) {
      wx.showToast({
        title: '请上传学生证',
        icon: 'none'
      })
    }else {
      wx.showLoading({
        title: '加载中',
      })
      let url = 'regis'
      if(this.data.res){
        url = 'update/info'
      }
      app.com.post('wx/user/'+url, {
        wx_id: wx.getStorageSync("user").id,
        form_id: formId,
        name: e.detail.value.name,
        card_num: e.detail.value.card_num,
        cert: _this.data.cert,
        stu_card: _this.data.stu_card,
        id: _this.data.res ? _this.data.res.id:'',
        a_id: wx.getStorageSync("area").pk_id
      }, function (res) {
        wx.hideLoading()
        if (res.code == 1) {
          wx.showToast({
            title: '提交成功',
          })
          if (_this.data.res) {
            wx.setStorageSync("res", _this.data.res)
          }
          _this.setData({
            'res.state': 0,
            show: false,
            isUpdate:false
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      })
      
    }
  },
  makePhone(){
    wx.makePhoneCall({
      phoneNumber: wx.getStorageSync("dl").phone,
    })
  },
  onLoad: function (options) {
    _this = this
    let server = wx.getStorageSync("server")
    for(let i in server){
      server[i].pk_server = ((server[i].dl_sy + server[i].p_sy)*100).toFixed(0)
    }
    this.setData({
      server: server
    })
  },
  onShow(){
      this.getRes()
    
  },
  getRes() {
    wx.showLoading({
      title: '加载中',
      task:true
    })
    app.com.post('wx/user/get/info/wxid', { wx_id: wx.getStorageSync("user").id }, function (res) {
      wx.hideLoading()
      if (res.code == 1) {
        if(res.data != 0){
          wx.setStorageSync("res", res.data)
          _this.setData({
            res: res.data,
            show: false,
            cert: res.data.cert,
            stu_card: res.data.stu_card,
            name: res.data.name,
            card_num: res.data.card_num,
          })
        }else{
          if (wx.getStorageSync("xy")) {

          } else {
            wx.navigateTo({
              url: '/pages/mine/jdsm/jdsm',
            })
          }
        }
      } else {
        wx.showToast({
          title: '失败',
          icon: 'none'
        })
      }
    })
  },


})
