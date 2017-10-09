//logs.js
Page({
  data: {
    nickName:null,
    avatarUrl:null,
    tel:null,
    logs:null,
    textCatalogue:null
  },
  onLoad(){
    this.textCatalogue();
  },
  onShow(){
    try {
      var value = wx.getStorageSync('user')
      if (!value) {
        wx.switchTab({
          url: '../index/index'
      })
        wx.navigateTo({
          url: '../login/login'
      })
      }
    } catch (e) {
    console.log('请刷新')
      // Do something when catch error
    }
    var userInfo = wx.getStorageSync('userInfo')
    var user = wx.getStorageSync('user')
    this.setData({
      nickName:userInfo.nickName,
      avatarUrl:userInfo.avatarUrl,
      tel:user.tel
    })
    this.useTime();
  },
  useTime(){
     var user = wx.getStorageSync('user')
     let that = this;
     wx.request({
       url: 'https://www.supermaker.com.cn/clzz/useTime',
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
   },
   textCatalogue(){
    var that = this;
     wx.request({
       url: 'https://www.supermaker.com.cn/clzz/textCatalogue',
       data:"",
       header: {
           'content-type': 'application/json' // 默认值
       },
       success: function(res) {
         console.log(res.data)
         that.setData({
          textCatalogue:res.data.list
         })
       }
     })
   }
})
