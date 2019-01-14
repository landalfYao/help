const app = getApp()
let _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cate:[],
    flag:0,
    load:false,
    lisst:[]
  },
  chooseIt(e){
    let index = e.currentTarget.dataset.index
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];   //当前页面
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      address: this.data.cate[this.data.flag].name+'-'+this.data.list[index].name
    })
    wx.navigateBack({
      delta:1
    })
  },
  changeTag(e){
    this.setData({
      flag:e.currentTarget.dataset.index
    })
    this.getList(this.data.cate[e.currentTarget.dataset.index].id)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
    this.getCate()
  },

  getCate(){
    app.com.post('address/cate/get',{
      pageIndex:1,
      pageSize:1000,
      wheres:'is_delete=0 and is_show=1 and a_id='+wx.getStorageSync("area").pk_id,
      sorts:'sort asc'
    },function(res){
      if(res.code == 1){
        _this.setData({
          cate:res.data.list
        })
        _this.getList(res.data.list[0].id)
      }
    })
  },
  getList(cate_id){
    this.setData({
      load:true
    })
    app.com.post('address/get',{
      pageIndex: 1,
      pageSize: 1000,
      wheres: 'is_delete=0 and cate_id='+cate_id+' and a_id=' + wx.getStorageSync("area").pk_id,
      sorts: 'sort asc'
    },function(res){
      if(res.code == 1){
        _this.setData({
          list:res.data.list,
          load:false
        })
      }
    })
  }
})