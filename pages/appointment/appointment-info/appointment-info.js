//logs.js
Page({
  data: {
    _num: null,
    tel: '',
    name: '',
    date: '',
    time: '',
    farmid: '',
    farmname: '',
    startTime: "",
    radio: "",
    tarifftype: "",
    checked: true,
    range: ['上午（8:00-12:00）',
      '中午(12:00-15:00)',
      '下午(15:00-19:00)',
      '晚上(19:00-23:00)',
      '其他时间'
    ],
    carts: [{
        num: '1',
        selected: true
      },
      {
        num: '0',
        selected: true
      },
    ],
    items: [

    ],
    logs: null,
    minusStatuses: ['disabled', 'disabled', 'disabled', 'disabled', 'disabled']

  },
  onLoad: function (option) {
    this.useTime();
    console.log(this.getCurrenTime())
    this.setData({
      startTime: this.getCurrenTime(),
      farmid: option.farmid,
      farmname: option.farmname
    })
    this.tariffByfarm();
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
      time: this.data.range[e.detail.value]
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
      userid = user.id,
      tarifftyps = that.data.tarifftype
    if (!name) {
      wx.showToast({
        title: '请填写联系人',
        image: '../../../images/error.png',
        duration: 2000
      })
      return false;
    }
    if (!tel) {
      wx.showToast({
        title: '手机号码错误',
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
        userid: userid,
        tarifftype: tarifftyps,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 2000
        })
        if (res.data.code == 1) {
          // wx.navigateBack({
          //   delta: 2
          // })
          wx.redirectTo({
            url: '../../schedule-info/schedule-info?orderid=' + res.data.oid
          })
        }

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
          logs: res.data.time - 1,
          _num: res.data.time - 1

        })
        if (that.data.logs < 0) {
          wx.showModal({
            title: '提示',
            content: '您旅游币不足一个请及时够买。',
            cancelText: '重新选择',
            confirmText: '买旅游币',
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
  },
  radioChange: function (e) {
    this.changeStatus()

    if (!e.detail.value) {
      this.setData({
        tarifftype: ""
      })
      return false;
    }
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    var that = this;
    var key1 = "carts[0].num"
    var key2 = "carts[1].num"
    let logsNum = this.data.logs - this.data.items[e.detail.value].man + (this.data.items[e.detail.value].kid / 2) + 1;
    console.log(logsNum)
    // console.log(this.data.items[e.detail.value].man)
    if (logsNum < 0) {
      wx.showModal({
        title: '提示',
        content: '该套餐需要' + (this.data.items[e.detail.value].man + (this.data.items[e.detail.value].kid / 2)) + '个旅游币，您的旅游币为' + this.data.logs + '个，不足以支付。',
        cancelText: '重新选择',
        confirmText: '买旅游币',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../../pay/pay'
            })
          } else if (res.cancel) {
            that.changeStatus()
            that.setData({
              checked: true
            })
          }
        }
      })
      return false;
    }
    this.setData({
      [key1]: this.data.items[e.detail.value].man,
      [key2]: this.data.items[e.detail.value].kid,
      logs: logsNum,
      tarifftype: this.data.items[e.detail.value].id
    })
  },
  tariffByfarm() {
    var that = this;
    wx.request({
      url: 'https://www.supermaker.com.cn/clzz/tariffByfarm',
      data: {
        farmid: this.data.farmid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          items: res.data.type
        })

      }
    })
  },
  changeStatus() {
    var key1 = "carts[0].num"
    var key2 = "carts[1].num"
    this.setData({
      [key1]: 1,
      [key2]: 0,
      logs: this.data._num,
    })
  },
  showModel() {
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
  },
  consult() {
    wx.makePhoneCall({
      phoneNumber: '0898-38322067'
    })
  }
})