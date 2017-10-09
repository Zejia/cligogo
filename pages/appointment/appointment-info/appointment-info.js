//logs.js
Page({
  data: {
    tel: '',
    name: '',
    date: '',
    time: '',
    farmid: '',
    startTime: "",
    carts: [{
        num: '1',
        selected: true
      },
      {
        num: '0',
        selected: true
      },
    ],
    logs: null,
    minusStatuses: ['disabled', 'disabled', 'disabled', 'disabled', 'disabled']

  },
  onLoad: function (option) {
    this.useTime();
    console.log(this.getCurrenTime())
    this.setData({
      startTime: this.getCurrenTime(),
      farmid: option.farmid
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindnameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindtelInput: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  getCurrenTime: function () {
    var time = new Date();
    // 程序计时的月从0开始取值后+1
    var m = time.getMonth() + 1;
    var nd = new Date();
    var y = nd.getFullYear();
    var m = nd.getMonth() + 1;
    var d = nd.getDate() + 1;
    if (m <= 9) m = "0" + m;
    if (d <= 9) d = "0" + d;
    var currentTime = y + "-" + m + "-" + d;
    return currentTime;
  },
  bindMinus: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var num = this.data.carts[index].num;
    var times = this.data.time;
    // 如果只有1件了，就不允许再减了
    if (index == 1) {
      if (num > 0) {
        num--;
        this.setData({
          logs: this.data.logs + 0.5
        });
      }
    } else {
      if (num > 1) {
        num--;
        this.setData({
          logs: this.data.logs + 1
        });
      }
    }
    console.log(times)
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= 0 ? 'disabled' : 'normal';
    // 购物车数据
    var carts = this.data.carts;
    carts[index].num = num;
    // 按钮可用状态
    var minusStatuses = this.data.minusStatuses;
    minusStatuses[index] = minusStatus;
    // 将数值与状态写回
    this.setData({
      carts: carts,
      minusStatuses: minusStatuses
    });
  },
  bindPlus: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var num = this.data.carts[index].num;
    var times = this.data.time;
    // 自增
    if (this.data.logs) {
      num++;
      if (index == 1) {
        this.setData({
          logs: this.data.logs - 0.5
        });
      } else {
        this.setData({
          logs: this.data.logs - 1
        });
      }
    }
    console.log(times)
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= 0 ? 'disabled' : 'normal';
    // 购物车数据
    var carts = this.data.carts;
    carts[index].num = num;
    // 按钮可用状态
    var minusStatuses = this.data.minusStatuses;
    minusStatuses[index] = minusStatus;
    // 将数值与状态写回
    this.setData({
      carts: carts,
      minusStatuses: minusStatuses
    });
  },
  submitbtn() {
    let user = wx.getStorageSync('user');
    let that = this;
    let tel = that.data.tel,
      name = that.data.name,
      traveltime = that.data.date,
      arrivaltime = that.data.time,
      man = that.data.carts[0].num,
      kid = that.data.carts[1].num,
      farmid = that.data.farmid,
      userid = user.id
    if (!tel) {
      wx.showToast({
        title: '手机号码错误',
        image: '../../../images/error.png',
        duration: 2000
      })
      return false;
    }
    if (!name) {
      wx.showToast({
        title: '联系人错误',
        image: '../../../images/error.png',
        duration: 2000
      })
      return false;
    }
    if (!traveltime) {
      wx.showToast({
        title: '到达时间错误',
        image: '../../../images/error.png',
        duration: 2000
      })
      return false;
    }
    if (!arrivaltime) {
      wx.showToast({
        title: '到店时间错误',
        image: '../../../images/error.png',
        duration: 2000
      })
      return false;
    }
    wx.request({
      url: 'https://www.supermaker.com.cn/clzz/submitOrder', //仅为示例，并非真实的接口地址
      data: {
        tel: tel,
        name: name,
        traveltime: traveltime,
        arrivaltime: arrivaltime,
        man: man,
        kid: kid,
        farmid: farmid,
        userid: userid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code == 1) {
          wx.navigateBack({
            delta: 2
          })
        }
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 2000
        })
        console.log(res.data)
      }
    })
  },
  useTime() {
    var user = wx.getStorageSync('user')
    let that = this;
    wx.request({
      url: 'https://www.supermaker.com.cn/clzz/useTime',
      data: {
        userid: user.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          logs: res.data.time - 1

        })
        if (that.data.logs <= 0) {
          wx.showModal({
            title: '提示',
            content: '您出游卡次数不足请及时够买',
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../../pay/pay'
                })
              } else if (res.cancel) {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        }
      }
    })
  }
})