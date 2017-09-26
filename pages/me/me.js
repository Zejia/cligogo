//logs.js
Page({
  data: {
    nickName:null,
    avatarUrl:null,
    tel:null,
    logs:null
  },
  onLoad(){
    this.useTime();
  },
  onShow(){
    try {
      var value = wx.getStorageSync('openid')
      if (!value) {
        console.log('123123')
        wx.navigateTo({
          url: '../login/login'
      })
      }
    } catch (e) {
    alert('请刷新')
      // Do something when catch error
    }
    var userInfo = wx.getStorageSync('userInfo')
    var user = wx.getStorageSync('user')
    this.setData({
      nickName:userInfo.nickName,
      avatarUrl:userInfo.avatarUrl,
      tel:user.tel
    })
  },
  useTime(){
     var user = wx.getStorageSync('user')
     let that = this;
     wx.request({
       url: 'http://120.76.208.177:8087/clzz/useTime',
       data: {
         userid: user.id
       },
       header: {
           'content-type': 'application/json' // 默认值
       },
       success: function(res) {
         console.log(res.data)
         that.setData({
           logs:res.data.time
         })
       }
     })
   }
})
