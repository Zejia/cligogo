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
    isDefault: false,
    shoppingFlag: false,
    // tab切换  
    currentTab: 0,
    navList: null,
    dishesList: null,
    carts: [],
    total:0,
    totalNum:0,
  },
  onLoad: function () {
    var that = this;
    try {
      wx.removeStorageSync('cart')
    } catch (e) {
      // Do something when catch error
    }
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
    this.fetchData();
  },
  /** 
   * 滑动切换tab 
   */
  bindChange: function (e) {
    var that = this;

    that.setData({
      currentTab: e.detail.current
    });
    // that.fetchData(e.detail.current)
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  fetchData() {
    let that = this;
    wx.request({
      url: 'https://www.supermaker.com.cn/chh/storeIndex', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code == 1) {
          that.setData({
            navList: res.data.memu,
            dishesList: res.data.skulist
          })

        }
      }
    })

  },
  reduce(options) {
    let that = this,
      currentTab = this.data.currentTab, //当前大选项卡index
      fetchData = options.currentTarget.dataset, //点击传值 parm:index=小选项卡位置 id = 选项卡ID;
      counts = this.data.dishesList[currentTab][fetchData.index],
      toatl = null,
      string = "dishesList[" + currentTab + "][" + fetchData.index + "].counter";

    counts.counter = counts.counter - 1;
    
    this.data.total -= counts.price
    this.setData({
      [string]: counts.counter,
      total:this.data.total,
      totalNum:this.data.totalNum-=1
    })
    // 遍历列表 与 购物车列表  
    for (var i in this.data.dishesList[currentTab]) {
      // 列表中某一项item的id == 点击事件传递过来的id。则是被点击的项  
      if (this.data.dishesList[currentTab][i].id == options.currentTarget.dataset.id) {
        // 获取购物车的缓存数组（没有数据，则赋予一个空数组）  
        var arr = wx.getStorageSync('cart') || [];
        // 如果购物车有数据  
        if (arr.length > 0) {
          // 遍历购物车数组  
          for (var j in arr) {
            // 判断购物车内的item的id，和事件传递过来的id，是否相等  
            if (arr[j].id == options.currentTarget.dataset.id) {
              // 相等的话，给counter+1（即再次添加入购物车，数量+1）  
              arr[j].counter = arr[j].counter - 1;
              if(arr[j].counter == 0){
                arr.splice(j, 1);
              }
              // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）  
             
                try {
                  wx.setStorageSync('cart', arr)
                } catch (e) {
                  console.log(e)
                }
                if(arr.length <= 0 ){
                  wx.removeStorageSync('cart')
                }
              // 返回（在if内使用return，跳出循环节约运算，节约性能）  
              return;
            }
          }
        }
       
        // 最后，把购物车数据，存放入缓存  
        try {
          wx.setStorageSync('cart', arr)
          // 返回（在if内使用return，跳出循环节约运算，节约性能）  
          return;
        } catch (e) {
          console.log(e)
        }
      }
    }
  },
  // 加入购物车  
  addcart(options) {
    let that = this,
      currentTab = this.data.currentTab, //当前大选项卡index
      fetchData = options.currentTarget.dataset, //点击传值 parm:index=小选项卡位置 id = 选项卡ID;
      counts = this.data.dishesList[currentTab][fetchData.index],
      string = "dishesList[" + currentTab + "][" + fetchData.index + "].counter";
      this.data.total += counts.price
      counts.counter = counts.counter + 1;
    this.setData({
      [string]: counts.counter,
      total:this.data.total,
      totalNum:this.data.totalNum+=1
    })
    // 遍历列表 与 购物车列表  
    for (var i in this.data.dishesList[currentTab]) {
      // 列表中某一项item的id == 点击事件传递过来的id。则是被点击的项  
      if (this.data.dishesList[currentTab][i].id == options.currentTarget.dataset.id) {
        // 获取购物车的缓存数组（没有数据，则赋予一个空数组）  
        var arr = wx.getStorageSync('cart') || [];
        // 如果购物车有数据  
        if (arr.length > 0) {
          // 遍历购物车数组  
          for (var j in arr) {
            // 判断购物车内的item的id，和事件传递过来的id，是否相等  
            if (arr[j].id == options.currentTarget.dataset.id) {
              // 相等的话，给counter+1（即再次添加入购物车，数量+1）  
              arr[j].counter = arr[j].counter + 1;
              // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）  
              try {
                wx.setStorageSync('cart', arr)
              } catch (e) {
                console.log(e)
              }
              // 返回（在if内使用return，跳出循环节约运算，节约性能）  
              return;
            }
          }
          // 遍历完购物车后，没有对应的item项，把goodslist的当前项放入购物车数组  
          arr.push(this.data.dishesList[currentTab][i]);
        }
        // 购物车没有数据，把item项push放入当前数据（第一次存放时）  
        else {
          arr.push(this.data.dishesList[currentTab][i]);
        }
        // 最后，把购物车数据，存放入缓存  
        try {
          wx.setStorageSync('cart', arr)
          // 返回（在if内使用return，跳出循环节约运算，节约性能）  
          return;
        } catch (e) {
          console.log(e)
        }
      }
    }


  },
  openShopping() {
    try {
      let cart = wx.getStorageSync('cart')
      if (cart) {
        this.setData({
          shoppingFlag: !this.data.shoppingFlag,
          carts: cart
        })
      }
    } catch (e) {
      console.log(e)
    }

  },
  order(){
    let that = this;
    if(that.data.total<=0){
        return;      
    }
    wx.setStorageSync('total', this.data.total);
    wx.setStorageSync('totalNum', this.data.totalNum);

    wx.navigateTo({
      url:'../shopping-order/shopping-order'
    })
  }
})