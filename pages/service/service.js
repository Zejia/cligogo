//logs.js
var app = getApp();
Page({
  data: {
    swiper:null
  },
  onLoad(e) {
    console.log(e)
    var that = this;
    wx.request({
      url: 'https://www.supermaker.com.cn/clzz/index',
      data: {
          lat: e.latitude,
          lng: e.longitude
      },
      success: function (res) {
          if(res.data.code > 1){
            wx.showToast({
                title: res.data.msg,
                image:'../../images/error.png',
                duration: 2000
              })
              setTimeout(function(){
                wx.navigateBack({
                    delta: 1
                  })
              },2000)
             
          }
          that.setData({
              swiper: res.data.cct,
          })
      }
  })
  },
  onShow(e) {
  },
  selectAddress(e){
    var that = this;
    console.log(e.currentTarget.dataset.id)
    app.globalData.farmName = e.currentTarget.dataset.name
    if(e.currentTarget.dataset.id == "-1"){
        app.globalData.farm = -1
        wx.navigateBack({
            delta: 1
          })
      return false;
    }
    wx.request({
        url: 'https://www.supermaker.com.cn/clzz/farmByType',
        data: {
            typeid: e.currentTarget.dataset.id
        },
        success: function (res) {
            app.globalData.farm = res.data.farm
            wx.navigateBack({
                delta: 1
              })
            // that.setData({
            //     markers: res.data.farm
            // })
        }
    })
  },
  shopping(){
    wx.navigateTo({
        url:"../shopping/shopping-list/shopping-list"
    })
  }
})