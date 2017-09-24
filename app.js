//app.js
App({
    onLaunch: function() {
        //调用API从本地缓存中获取数据
        /*   var logs = wx.getStorageSync('logs') || []
           logs.unshift(Date.now())
           wx.setStorageSync('logs', logs)*/
    },

    getUserInfo:function(cb){
        var that = this
        if(this.globalData.userInfo){
          typeof cb == "function" && cb(this.globalData.userInfo)
        }else{
          //调用登录接口
          wx.login({
            success: function (res) {
              var code = res.code;
              wx.getUserInfo({
                success: function (res) {
                  that.globalData.userInfo = res.userInfo
                  console.log(res.userInfo)
                   wx.request({
                url: 'https://www.bama77.com/dafu/addUser',
                data: {
                  openid: code,
                  nickname:res.userInfo.nickName,
                  avatarurl:res.userInfo.avatarUrl,
                  gender:res.userInfo.gender,
                  province:res.userInfo.province,
                  city:res.userInfo.city,
                  country:res.userInfo.country
                },
                success:function(res){
                  that.globalData.uid = res.data.uid
                }
               })
                  typeof cb == "function" && cb(that.globalData.userInfo)
                }
              })
               wx.getLocation({
                  type: 'wgs84',
                  success: function(res) {
                  that.globalData.latitude = res.latitude
                  that.globalData.longitude = res.longitude
               }
               })
            }
          })
        }
      },
      globalData:{
        userInfo:null,
        latitude:null,
        longitude:null,
        uid:null,
        city:null,
        hosturl:'http://120.76.208.177:8087/clzz/'
      }
})