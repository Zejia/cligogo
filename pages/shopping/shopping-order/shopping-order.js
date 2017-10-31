// shopping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: null,
    address: null,
    remark: null,
    addressInfo: null,
    pay: 1,
    paydone: true,
    tips: null,
    items: [{
        name: '在线支付',
        value: 1,
        checked: 'true'
      },
      {
        name: '货到付款',
        value: 0
      }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let total = wx.getStorageSync('total'),
      totalNum = wx.getStorageSync('totalNum'),
      cart = wx.getStorageSync('cart'),
      addressInfo = wx.getStorageSync('addressInfo');
    this.isScope(addressInfo.countyName + addressInfo.cityName + addressInfo.provinceName + addressInfo.detailInfo)
    this.setData({
      total: total,
      totalNum: totalNum,
      cart: cart,
      addressInfo: addressInfo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onShareAppMessage: function () {

  },
  bindphone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  bindaddress: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  bindremark: function (e) {
    this.setData({
      remark: e.detail.value
    })
  }, //确认订单
  submitbtn() {
    let that = this,
      openid = wx.getStorageSync('openid'),
      cityid = wx.getStorageSync('cityid');
    console.log(that.data.cart)
    console.log(that.data.total)
    console.log(cityid)
    console.log(that.data.addressInfo.telNumber)
    console.log(that.data.addressInfo.userName)
    console.log(that.data.addressInfo.countyName)
    console.log(that.data.pay)
    // 判断是否有地址
    if (!that.data.addressInfo) {
      that.chooseAddress();
      return false;
    }
    wx.request({
      url: 'https://www.supermaker.com.cn/chh/submitOrder',
      data: {
        skuvalues: that.data.cart,
        total: that.data.total,
        storeid: cityid,
        tel: that.data.addressInfo.telNumber,
        name: that.data.addressInfo.userName,
        address: that.data.addressInfo.countyName + that.data.addressInfo.cityName + that.data.addressInfo.provinceName + that.data.addressInfo.detailInfo,
        remarks: "shpppingOrder",
        paytype: that.data.pay,
        openid: openid.openid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        let orderid = res.data.orderid
        console.log(orderid)
        if (that.data.pay == 0) {
          wx.redirectTo({
            url: "../shopping-orderInfo/shopping-orderInfo?id=" + orderid
          })
        } else {
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


      }
    })
  },
  chooseAddress() { //选择地址
    let that = this;
    wx.chooseAddress({
      success: function (res) {
        wx.setStorageSync('addressInfo', res);
        that.setData({
          addressInfo: res
        })
        // that.isScope(res.countyName+res.cityName+res.provinceName+res.detailInfo)
        that.isScope(res.countyName + res.cityName + res.provinceName + res.detailInfo)

      }
    })
  },
  payChange: function (e) { //选择支付方式
    this.setData({
      pay: e.detail.value
    })
  },
  primary() {
    wx.switchTab({
      url: '../../index/index'
    })
  },
  //判断地址是否超出范围
  isScope(name) {
    let that = this;
    wx.request({
      url: 'https://www.supermaker.com.cn/chh/isRangen',
      data: {
        name: name,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.code != 1) {
          that.setData({
            tips: res.data.msg
          })
        } else {
          that.setData({
            tips: null
          })
        }
      }
    })
  }
})