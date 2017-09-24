//logs.js
Page({
  data: {
    logs: []
  },
  onLoad: function () {
   
  },
  previewImages() {
        wx.previewImage({
            current: 'https://img.supermonkey.com.cn/box/1015/301.jpg', // 当前显示图片的http链接
            urls: ['https://img.supermonkey.com.cn/box/1015/301.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503288743056&di=486431acf9ab2f8c0f0134fa2764742e&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201508%2F01%2F20150801104534_LS25k.thumb.700_0.png'] // 需要预览的图片http链接列表
        })
  },
  // 常见问题/客服
   appointment() {
    wx.navigateTo({
       url: '../appointment/appointment-info/appointment-info'
   })
},
})
