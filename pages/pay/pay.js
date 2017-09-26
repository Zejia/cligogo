//logs.js
Page({
  data: {
    logs:null
  },
  onLoad: function () {
   this.isDiscounts();
  },
  isDiscounts(){
    var user = wx.getStorageSync('user')
    let that = this;
    wx.request({
      url: 'http://120.76.208.177:8087/clzz/isDiscounts',
      data: {
        userid: user.id
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          logs:res.data.res
        })
      }
    })
  }
})
