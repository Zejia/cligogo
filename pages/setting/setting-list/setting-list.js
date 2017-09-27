//logs.js
Page({
  data: {
    typeid: null,
    textContent: null
  },
  onLoad: function (op) {
    var that = this;
    wx.setNavigationBarTitle({
      title: op.name
    })
    this.setData({
      typeid: op.id
    })
    wx.request({
      url: 'http://120.76.208.177:8087/clzz/textContent', //仅为示例，并非真实的接口地址
      data: {
        typeid: that.data.typeid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)

        that.setData({
          textContent: res.data.list
        })
      }
    })
  },
})