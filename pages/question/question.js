//logs.js
Page({
  data: {
    logs: [],
    active:0
  },
  onLoad: function () {
   
  },
  toggle(e) {
        if (e.currentTarget.dataset.index == this.data.active) {
            this.setData({
                active: "0"
            })
        } else {
            this.setData({
                active: e.currentTarget.dataset.index
            })
        }
    }, // 客服拨打电话
    calling() {
        wx.makePhoneCall({
            phoneNumber: '12345678900', //此号码并非真实电话号码，仅用于测试
            success: function() {
                console.log("拨打电话成功！")
            },
            fail: function() {
                console.log("拨打电话失败！")
            }
        })
    },
})
