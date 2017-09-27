Page({
  data: {
    typeid:null,
    textInfo:null
  },
  onLoad: function (op) {
    var that = this;
    this.setData({
      typeid:op.id
    })
    wx.request({
      url: 'http://120.76.208.177:8087/clzz/textInfo', //仅为示例，并非真实的接口地址
      data: {
        id:that.data.typeid
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data)
        wx.setNavigationBarTitle({
          title: res.data.info.title
        })
        that.setData({
          textInfo:res.data.info
         })
      }
    })
  },
})
