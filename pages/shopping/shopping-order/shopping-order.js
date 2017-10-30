// shopping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:null,
    address:null,
    remark:null,
    addressInfo:null,
    pay:0,
    items: [
      {name: '在线支付', value: 0 , checked: 'true'},
      {name: '货到付款', value: 1 }
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
    this.setData({
      total:total,
      totalNum:totalNum,
      cart:cart,
      addressInfo:addressInfo
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
  },
  submitbtn(){
   
  },
  chooseAddress(){
    let that = this;
    wx.chooseAddress({
      success: function (res) {
        wx.setStorageSync('addressInfo',res);
        that.setData({
          addressInfo:res
        })
      }
    })
  },
  payChange: function(e) {
    this.setData({
      pay:e.detail.value
    })
  }
})