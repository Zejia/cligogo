//logs.js
Page({
  data: {
    date: '',
    time: '',
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
    minusStatuses: ['disabled', 'disabled', 'disabled', 'disabled', 'disabled']

  },
  onLoad: function () {
    console.log(this.getCurrenTime())
    this.setData({
      startTime: this.getCurrenTime()
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
    // 如果只有1件了，就不允许再减了
    console.log(index)
    if (index == 1) {
      if (num > 0) {
        num--;
      }
    } else {
      if (num > 1) {
        num--;
      }
    }
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
    // 自增
    num++;
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
  }
})