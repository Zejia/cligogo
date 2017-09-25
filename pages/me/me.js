//logs.js
Page({
  data: {
    nickName:null,
    avatarUrl:null,
    tel:null
  },
  onload(){
    
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
  }
})
