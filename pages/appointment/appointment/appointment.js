//logs.js
Page({
  data: {
    next:0
  },
  next(){
    this.setData({
        next:1
    })
  },
  confirm(){
   wx.navigateTo({
            url: '../../appointment/appointment-info/appointment-info'
     })
  },
  list(){
   wx.navigateTo({
            url: '../../appointment/appointment-list/appointment-list'
     })
  }
})
