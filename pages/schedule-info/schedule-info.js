//logs.js
Page({
  data: {
    logs: [],
    orderid:null,
    farmTel:null,
    statusName:'联系农场主',
    statusImg:null,
    shares:null

  },
  onLoad: function (o) {
    let that = this,
        user = wx.getStorageSync('user'),
        orderid = o.orderid,
        userid = user.id;
   that.setData({
    orderid:o.orderid
  })
  that.fetchData(orderid,userid)
  },
  onShow(e){
    let that = this,
        user = wx.getStorageSync('user'),
        orderid = this.data.orderid,
        userid = user.id;
    that.fetchData(orderid,userid)
  },
  statusBtn(){
    let  that = this;
    switch(that.data.logs.statusnum){
        case 0:
        case 1:
        wx.makePhoneCall({
          phoneNumber: that.data.logs.telphone //仅为示例，并非真实的电话号码
        })
        break;
        case 2:
        wx.navigateTo({
          url: '../comment/comment?farmid='+that.data.logs.farmid+'&orderid='+that.data.orderid
        })
        break;
        
    }
  },
  fetchData(orderid,userid){
    let that = this;
    wx.request({
      url: 'https://www.supermaker.com.cn/clzz/order', 
      data: {
        orderid:orderid,
        userid:userid
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          logs:res.data.info
        })
        switch(that.data.logs.statusnum){
         case 0:
         case 1:
         that.setData({
           statusName:'联系农场主'
         })
         break;
         case 2:
         that.setData({
           statusName:'评论'
         })
         break;
         case 3:
         that.setData({
           statusName:'分享给好友',
           shares:'share'
         })
         break;
     }
      }
    })
  },
  onShareAppMessage: function () {
    var that = this;
   return {
     title: '村里走走',
     desc: '村里走走'+that.data.logs.name,
     path: 'pages/schedule-info/schedule-info?orderid='+that.data.orderid
   }
 }
})
