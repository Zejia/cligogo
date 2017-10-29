// shopping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:null,
    address:null,
    remark:null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let total = wx.getStorageSync('total'),
        totalNum = wx.getStorageSync('totalNum'),
        cart = wx.getStorageSync('cart');
    this.setData({
      total:total,
      totalNum:totalNum,
      cart:cart
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
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
})