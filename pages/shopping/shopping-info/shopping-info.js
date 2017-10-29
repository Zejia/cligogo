//logs.js
var WxParse = require('../../../wxParse/wxParse.js');

Page({
    data: {
       current:"https://image.missfresh.cn/d95fc02f0ef14156b7f5c91fbabc93f8.jpg?iopcmd=thumbnail&type=4&width=640",
       urls:['https://image.missfresh.cn/d95fc02f0ef14156b7f5c91fbabc93f8.jpg?iopcmd=thumbnail&type=4&width=640','https://image.missfresh.cn/e92c49f72f1c468081d98f15026d5bd3.jpg?iopcmd=thumbnail&type=4&width=640']
    },
    onLoad: function(option) {
        console.log(option.id)
       
        var that = this;
       
    },
    previewImages() {
        var that = this;
        wx.previewImage({
            current: that.data.current, // 当前显示图片的http链接
            urls: that.data.urls // 需要预览的图片http链接列表
        })
    },
  
  
    onShareAppMessage: function () {
        var that = this;
       return {
         title: that.data.farm.name,
         imageUrl:that.data.current,
         path: 'pages/cInfo/cInfo?id='+that.data.farmid
       }
     }
})