//logs.js
Page({
  data: {
    farm:null,
    urls:null,
    evaluate:null,
    current:null,

  },
  onLoad: function (option) {
    console.log(option.id)
    var that = this;
    wx.request({
      url: 'http://120.76.208.177:8087/clzz/farm',
      data: {
          farmid:option.id
      },
      success: function (res) {
        that.setData({
           farm:res.data.farm,
           urls:res.data.urls,
           current:res.data.current,
           evaluate:res.data.evaluate
        })
      }
  })
  },
  previewImages() {
    var that = this;
        wx.previewImage({
            current:that.data.current, // 当前显示图片的http链接
            urls: that.data.urls// 需要预览的图片http链接列表
        })
  },
  // 常见问题/客服
   appointment() {
    wx.navigateTo({
       url: '../appointment/appointment-info/appointment-info'
   })
},
})