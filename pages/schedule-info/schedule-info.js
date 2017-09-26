//logs.js
Page({
  data: {
    logs: [],
    orderid:null
  },
  onLoad: function (o) {
   let user = wx.getStorageSync('user');
   let orderid = this.data.orderid;
   let that = this;
  wx.request({
         url: 'http://120.76.208.177:8087/clzz/order', //仅为示例，并非真实的接口地址
         data: {
           orderid:o.orderid,
           userid:user.id
         },
         header: {
             'content-type': 'application/json' // 默认值
         },
         success: function(res) {
           console.log(res.data)
           that.setData({
             logs:res.data.info
           })
         }
       })
  }
})
