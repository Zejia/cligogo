// var cartButton = require('../../../cartButton/cartButton.js');
//logs.js
Page({
  data: {
    swiper0: null,
    swiper1: null,
    winWidth: 0,
    winHeight: 0,
    // height
    docHeight: 3000,
    height: null,
    isDefault:true,
    shoppingFlag:true,
    // tab切换  
    currentTab: 0,
    navList: [{
        id: 1,
        name: '热销菜品'
      },
      {
        id: 2,
        name: '热菜'
      },
      {
        id: 3,
        name: '凉菜'
      },
      {
        id: 4,
        name: '套餐'
      }
    ],
    dishesList: [
      [{
          name: "红烧肉",
          price: 38,
          num: 1,
          id: 0
        },
        {
          name: "宫保鸡丁",
          price: 58,
          num: 0,
          id: 1
        },
        {
          name: "水煮鱼",
          price: 88,
          num: 0,
          id: 2
        }
      ],
      [{
          name: "小炒日本豆腐",
          price: 18,
          num: 0,
          id: 0
        },
        {
          name: "烤鱼",
          price: 58,
          num: 0,
          id: 1
        }
      ],
      [{
          name: "大拌菜",
          price: 18,
          num: 0,
          id: 2
        },
        {
          name: "川北凉粉",
          price: 8,
          num: 0,
          id: 3
        }
      ],
      [{
          name: "大拌菜4444",
          price: 18,
          num: 0,
          id: 0
        },
        {
          name: "川北凉粉6666",
          price: 8,
          num: 0,
          id: 1
        }
      ]
    ]
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

    // wx.request({
    //   url: 'https://www.supermaker.com.cn/clzz/cardIO', //仅为示例，并非真实的接口地址
    //   data: {
    //     userid: user.id,
    //     type:ex
    //   },
    //   header: {
    //       'content-type': 'application/json' // 默认值
    //   },
    //   success: function(res) {
    //     if(res.data.code==1){
    //       var key = "swiper"+ex
    //       that.setData({
    //       [key]:res.data.time
    //       })

    //     }
    //   }
    // })

  },
  reduce(options) {
    let currentTab = this.data.currentTab;
    let index = options.currentTarget.dataset.index;
    let counter = this.data.dishesList[currentTab][index];
    let string = "dishesList["+currentTab+"]["+index+"].num"
    if (counter.num == 0) {
      return false;
    }
    counter.num--
    this.setData({
      [string]:counter.num
    })
  },
  addNum(options) {
    let currentTab = this.data.currentTab;
    let index = options.currentTarget.dataset.index;
    let counter = this.data.dishesList[currentTab][index];
    let string = "dishesList["+currentTab+"]["+index+"].num"
    counter.num++
    this.setData({
      [string]:counter.num
    })
  },
  openShopping(){
    this.setData({
      shoppingFlag:!this.data.shoppingFlag
    })
  }
})