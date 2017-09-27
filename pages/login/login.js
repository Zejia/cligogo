//logs.js
function countdown(that) {
  var second;
  if (that.data.second == '获取验证码') {
    var second = 60
  } else {
    var second = that.data.second
  }
  if (second == 0) { // console.log("Time Out...");
    that.setData({
      click_flag: 1,
      second: "获取验证码"
    });
    return;
  }
  var time = setTimeout(function () {

    that.setData({
      click_flag: 0,
      second: second - 1
    });
    countdown(that);
  }, 1000)
}
Page({
  data: {
    second: '获取验证码',
    phone: '',
    click_flag: 1,
    count: 60,
    code: null,
    selfCode: null
  },
  onLoad() {

  },
  getCode() {
    var that = this;
    if (!(/^[1][345678][0-9]{9}$/.test(that.data.phone))) {
      wx.showToast({
        title: '错误的号码',
        image: '../../images/error.png',
        duration: 1000
      })
      return false;
    } else {
      if (that.data.click_flag == 1) {
        countdown(that)

        wx.request({
          url: 'http://120.76.208.177:8087/clzz/telLogin',
          data: {
            tel: that.data.phone
          },
          success: function (res) {
            // console.log(res.data.openid)
            console.log(res.data.sendCode)
            if (res.data.code == 1) {
              that.setData({
                code: res.data.sendCode
              });
            }
          }
        })
      } else {
        return false;
      }
    }
  },
  login() {
    var that = this;
    if (that.data.phone == "" || that.data.selfCode == "") {
      wx.showToast({
        title: '输入完整的信息',
        image: '../../images/error.png',
        duration: 1000
      })
    } else {
      if (that.data.selfCode == that.data.code) {
        var openid = wx.getStorageSync('openid')
        var userInfo = wx.getStorageSync('userInfo')
        console.log(openid.openid)
        console.log(userInfo.nickName)
        console.log(userInfo.avatarUrl)
        wx.request({
          url: 'http://120.76.208.177:8087/clzz/bindingTel',
          data: {
            tel: that.data.phone,
            openid: openid.openid,
            nickname: userInfo.nickName,
            avatarurl: userInfo.avatarUrl
          },
          success: function (res) {
            // console.log(res.data.openid)
            if (res.data.code == 1) {
              wx.setStorage({
                key: 'user',
                data: res.data.user
              })
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: '验证码错误!',
          image: '../../images/error.png',
          duration: 1000
        })
      }
    }
  },
  bindKeyInput(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  bindKeyPin(e) {
    this.setData({
      selfCode: e.detail.value
    })
  }
})