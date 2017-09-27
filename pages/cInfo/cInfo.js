//logs.js
Page({
  data: {
    farm:null,
    urls:null,
    evaluate:null,
    current:null,
    farmid:''
  },
  onLoad: function (option) {
    console.log(option.id)
    this.setData({
      farmid:option.id
    })
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
        wx.setNavigationBarTitle({
          title: res.data.farm.name
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
     let that = this;
     try {
      var value = wx.getStorageSync('user')
      if (!value) {
        wx.navigateTo({
          url: '../login/login'
      })
      }else{
        wx.navigateTo({
          url: '../appointment/appointment-info/appointment-info?farmid='+that.data.farmid
      })
      }
    } catch (e) {
    console.log('请刷新')
      // Do something when catch error
    }
  
  
},
})
