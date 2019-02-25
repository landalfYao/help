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
    wx.showModal({
      title: '请确认您的选择',
      content: '您的选择是"' + _this.data.list[index].name+'"',
      cancelText:'我点错了',
      confirmText:'确认',
      confirmColor:'#6887e1',
      success(res){
        if(res.confirm){
          wx.setStorageSync('area', _this.data.list[index])
          _this.getDail(_this.data.list[index].pk_id)
        }else{

        }
      }
    })
    
  },
  getArea(){
    this.setData({
      load:true
    })
    app.com.post('area/get',{
      pageIndex:1,
      pageSize:1000,
      wheres:this.data.wheres,
      sorts:'sort asc'
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
      if(res.code == 1){
        wx.setStorageSync("dl", res.data)
        // _this.getServer(res.data.pk_id)
        wx.navigateBack({
          delta: 1
        })
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

})