//logs.js
Page({
  data: {
    logs:null,
    card:null
  },
  onLoad: function () {
   this.fetchCard();
  },
  onShow(){
    try {
      var value = wx.getStorageSync('user')
      if (!value) {
        console.log('123123')
        wx.switchTab({
          url: '../index/index'
      })
        wx.navigateTo({
          url: '../login/login'
      })
      }
    } catch (e) {
    console.log('请刷新')
      // Do something when catch error
    }
    
  },
  fetchCard(){
    var user = wx.getStorageSync('user')
    let that = this;
    wx.request({
      url: 'http://120.76.208.177:8087/clzz/card',
      data:{
        userid: user.id
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          card:res.data.info
        })
      }
    })
  },
  buyCard(e){
    let that = this;
    var user = wx.getStorageSync('user')
    console.log(e.target.dataset.cardid)
    wx.request({
      url: 'http://120.76.208.177:8087/clzz/buyCard',
      data:{
        userid:user.id,
        cardid:e.target.dataset.cardid,
        wxorderid:'1'
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data)
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 2000
        })
      }
    })
  }
})
