//app.js
App({
    onLaunch: function() {
        //调用API从本地缓存中获取数据
     /*   var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)*/
    },

    getUserInfo: function(cb) {
        var that = this
        /* if (this.globalData.userInfo) {
           typeof cb == "function" && cb(this.globalData.userInfo)
         } else {
           //调用登录接口
           wx.getUserInfo({
             withCredentials: false,
             success: function(res) {
               that.globalData.userInfo = res.userInfo
               typeof cb == "function" && cb(that.globalData.userInfo)
             }
           })
         }*/
        wx.getLocation({
            type: 'wgs84',
            success: function(res) {
         /*       var latitude = res.latitude
                var longitude = res.longitude
                var speed = res.speed
                var accuracy = res.accuracy*/
                that.globalData.Location = res;
                console.log(res)
            }
        })
    },

    globalData: {
        Location: null
    }
})