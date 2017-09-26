//logs.js
Page({
  data: {
    logs: []
  },
  onLoad: function () {
   this.fetchData()
  },
  fetchData(){
    var user = wx.getStorageSync('user')
    let that = this;
    wx.request({
      url: 'http://120.76.208.177:8087/clzz/travelList', //仅为示例，并非真实的接口地址
      data: {
        userid: user.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          logs:res.data.list
        })
      }
    })
  }
})
