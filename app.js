//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    /*   var logs = wx.getStorageSync('logs') || []
       logs.unshift(Date.now())
       wx.setStorageSync('logs', logs)*/
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          var code = res.code;
          wx.getUserInfo({
            success: function (res) {
            that.globalData.userInfo = res.userInfo
            wx.setStorage({
              key:'userInfo',
              data:res.userInfo
            })
              wx.request({
                url: 'https://www.supermaker.com.cn/clzz/getOpenid',
                data: {
                  code: code,
                },
                success: function (res) {
                  // console.log(res.data.openid)
                  let openid = res.data.openid;
                  wx.setStorage({
                    key:'openid',
                    data:openid
                  })
                  that.globalData.openid = res.data.openid
                }
              })
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
          wx.getLocation({
            type: 'wgs84',
            success: function (res) {
              that.globalData.latitude = res.latitude
              that.globalData.longitude = res.longitude
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    latitude: null,
    longitude: null,
    openid: null,
    city: null,
    hosturl: 'https://www.supermaker.com.cn/clzz/'
  }
})