//网络请求API
const API = "http://localhost:3000/api/"

/**
 * 获取窗口大小
 */
function getWindowSize(that) {
  let pages = getCurrentPages(); // 当前页面
  // let beforePage = pages[pages.length - 2]; 
  wx.getSystemInfo({
    success: function (res) {
      that.setData({
        model: res.model,
        width: res.windowWidth,
        height: res.windowHeight,
        topHeight: res.statusBarHeight + 46,
        pageLength: pages.length
      })
    },
  })
}
//post请求
function post(url, data, success, fail) {
  http('POST', url, data, success, fail)
}
function get(url, data, success, fail) {
  http('GET', url, data, success, fail)
}

function http(method, url, data, success, fail) {
  //通用post接口实现方法
  var that = this;
  let _data = data || {};
  let _success = success || function (e) {
    console.log(e)
  };
  let _fail = fail || function (e) {
    console.log(e)
  };
  let _method = method || 'POST';
  let _header = { 'content-type': 'application/x-www-form-urlencoded' };

  if (_method.toUpperCase() == 'GET') {
    _header = { 'content-type': 'application/json' };
  }
  if (arguments.length == 2 && typeof _data == 'function') {
    _success = _data
  }
  wx.request({
    url: API + url,
    method: _method,
    header: _header,
    data: _data,
    success: function (res) {
      if (typeof _success == 'function' && res.statusCode != 404 && res.statusCode != 500 && res.statusCode != 400) {

        _success(res.data);
      } else {
        if (typeof _success != 'function') {
        }
        console.log(`======== 接口  错误 ${res.statusCode} ========`);
      }
    },
    fail: function (res) {
      console.log(`======== 接口  请求失败 ========`);
      if (typeof _fail == 'function') {
        _fail(res);
      }
    }
  });
}
function dateFormat(time, fmt) { //author: meizz 
  let date = new Date(parseInt(time))
  var o = {
    "M+": date.getMonth() + 1, //月份 
    "d+": date.getDate(), //日 
    "h+": date.getHours(), //小时 
    "m+": date.getMinutes(), //分 
    "s+": date.getSeconds(), //秒 
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
    "S": date.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

module.exports = {
  API: API,
  post: post,
  get: get,
  http: http,
  getWindowSize: getWindowSize,
  dateFormat: dateFormat
}
