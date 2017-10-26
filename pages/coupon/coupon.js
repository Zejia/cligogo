//logs.js
Page({
  data: {
    swiper0: null,
    swiper1: null,
    winWidth: 0,
    winHeight: 0,
    // height
    docHeight: 2000,
    ccHeight: 2000,
    // tab切换  
    currentTab: 0,
  },
  onLoad: function () {
    var that = this;

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
        wx.createSelectorQuery().selectAll('.swiper-tab').boundingClientRect(function (rects) {
          rects.forEach(function (rect) {
            that.setData({
              docHeight: res.windowHeight - rect.height
            })
          })
        }).exec()
      }
    });
    this.fetchData(0);
  },
  /** 
   * 滑动切换tab 
   */
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    that.fetchData(e.detail.current)


  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;
    that.fetchData(e.target.dataset.current)
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  fetchData(ex) {
    let that = this;
    let user = wx.getStorageSync('user');

    wx.request({
      url: 'https://www.supermaker.com.cn/clzz/cardIO', //仅为示例，并非真实的接口地址
      data: {
        userid: user.id,
        type: ex
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code == 1) {
          var key = "swiper" + ex
          that.setData({
            [key]: res.data.time
          })
          setTimeout(function () {
            if (ex == 0) {
              console.log(that.data.swiper0.length)
              wx.createSelectorQuery().select('.schedule-list').boundingClientRect(function (rect) {
                that.setData({
                  ccHeight: that.data.swiper0.length * (rect.height + 25)
                })
              }).exec()
            } else {
              console.log(that.data.swiper1.length)
              wx.createSelectorQuery().select('.schedule-list').boundingClientRect(function (rect) {
                that.setData({
                  ccHeight: that.data.swiper1.length * (rect.height + 25)
                })
              }).exec()
            }
          }, 300)

          // var time = []
          // for (let i = 0; i < res.data.time.length; i++) {
          //   let dataImg = res.data.time[i].s+'';
          //    time.push(dataImg.replace('-',' '))
          // };
          // that.setData({
          //   time
          // })
        }
      }
    })

  },
})