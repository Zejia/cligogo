// shopping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressInfo:null,
    orderid:null
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderid:options.id
    })
   this.fetchData(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  fetchData(oid){
    let that = this;
    wx.request({
        url: 'https://www.supermaker.com.cn/chh/order',
        data: {
          oid:oid
        },
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function(res) {
            console.log(res.data)
            that.setData({
              list:res.data.list,
              order:res.data.order,
            })

        }
    })
  }, //确认订单
  submitbtn() {
    let that = this,
        openid = wx.getStorageSync('openid'),
        cityid = wx.getStorageSync('cityid');
    
    wx.request({
      url: 'https://www.supermaker.com.cn/chh/submitOrder',
      data: {
        skuvalues: that.data.list,
        total: that.data.order.total,
        storeid: cityid,
        tel: that.data.order.tel,
        name: that.data.order.name,
        address: that.data.order.address,
        remarks: "shpppingOrder",
        paytype: 1,
        openid: openid.openid,
        orderid:that.data.orderid

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        let orderid = res.data.orderid
        console.log(orderid)
          wx.requestPayment({
            'timeStamp': res.data.info.timeStamp,
            'nonceStr': res.data.info.nonceStr,
            'package': res.data.info.package,
            'signType': res.data.info.signType,
            'paySign': res.data.info.paySign,
            'success': function (res) {
              wx.redirectTo({
                url: "../shopping-orderInfo/shopping-orderInfo?id=" + orderid
              })
            },
            'fail': function (res) {
              wx.showModal({
                title: '提示',
                showCancel: false,
                content: '如果不方便微信支付,请选择货到付款',
                success: function (res) {
                  if (res.confirm) {
                    // todo orderid跳转长轮询页面
                  }
                }
              })
            },
            'complete': function (res) {

            }
          })



      }
    })
  }
})