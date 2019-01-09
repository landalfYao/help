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
    show:true
  },
  gotoUpdate(){
    this.setData({
      show:true
    })
  },
  choose(e){
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        if(e.currentTarget.dataset.name=='cert'){
          _this.setData({
            cert: tempFilePaths[0]
          })
        }else{
          _this.setData({
            stu_card: tempFilePaths[0]
          })
        }
        
        
      }
    })
  },
  upload(e){
    
    let name = e.currentTarget.dataset.name
    if (this.data[name] != '' && this.data[name].indexOf('tmp')>0){
      wx.showLoading({
        title: '上传中',
        mask: true
      })
      wx.uploadFile({
        url: app.com.API + 'file/upload', // 仅为示例，非真实的接口地址
        filePath: file,
        name: 'file',
        success(res) {
          wx.hideLoading()
          if (res.data) {
            if(name == 'cert'){
              _this.setData({
                cert: res.data
              })
            }else{
              _this.setData({
                stu_card: res.data
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
    } else if (e.detail.value.card_num == '') {
      wx.showToast({
        title: '请输入身份证号码',
        icon: 'none'
      })
    } else if (this.data.cert == '' || this.data.cert.indexOf('tmp') > 0) {
      wx.showToast({
        title: '请上传身份证',
        icon: 'none'
      })
    } else if (this.data.stu_card == '' || this.data.stu_card.indexOf('tmp')>0) {
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
        url = 'update'
      }
      app.com.post('wx/user/'+url, {
        wx_id: wx.getStorageSync("user").id,
        form_id: formId,
        name: e.detail.value.name,
        card_num: e.detail.value.card_num,
        cert: _this.data.cert,
        stu_card: _this.data.stu_card
      }, function (res) {
        wx.hideLoading()
        if (res.code == 1) {
          wx.showToast({
            title: '提交成功',
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
  
  onLoad: function (options) {
    _this = this
    if(wx.getStorageSync("res")){
      this.setData({
        res: wx.getStorageSync("res"),
        show:false,
        cert: wx.getStorageSync("res").cert,
        stu_card: wx.getStorageSync("res").stu_card,
        name: wx.getStorageSync("res").name,
        card_num: wx.getStorageSync("res").card_num,
      })
    }
    
  },


})
