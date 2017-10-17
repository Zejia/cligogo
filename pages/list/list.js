//logs.js
Page({
  data: {
    winWidth: 0,  
    winHeight: 0,  
    // height
    docHeight:2000,
    height:null,
    // tab切换  
    currentTab: 0,  
    cityid:null,
    info:null,
    swiper:null
  },
  onLoad: function (option) {
    var that = this;  
    wx.request({
      url: 'https://www.supermaker.com.cn/clzz/allfarm', //仅为示例，并非真实的接口地址
      data: {
        cityid: option.cityid
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
       that.setData({
          info:res.data.type,
          swiper:res.data.list
       })
      }
    })
      /** 
       * 获取系统信息 
       */  
      wx.getSystemInfo({  
        success: function( res ){
          that.setData( {  
            winWidth: res.windowWidth,  
            winHeight: res.windowHeight,
            cityid:option.cityid
          });  
        }  
      });  
       wx.createSelectorQuery().selectAll('.schedule-list').boundingClientRect(function(rects){
            rects.forEach(function(rect){
              that.setData({
                docHeight:2*rect.height
              })
            })
          }).exec()
  },
  /** 
     * 滑动切换tab 
     */  
    bindChange: function( e ) {  
        var that = this;  
        that.setData( { currentTab: e.detail.current }); 
        // console.log(e.detail.current) 
        // that.fetchData(e.detail.current)
      },  
      /** 
       * 点击tab切换 
       */  
      swichNav: function( e ) {  
        var that = this;  
        if( this.data.currentTab === e.target.dataset.current ) {  
          return false;  
        } else {  
        // that.fetchData(e.target.dataset.current)
          that.setData( {  
            currentTab: e.target.dataset.current  
          })  
        }  
      },
  fetchData(ex){
    let that = this;
    let user = wx.getStorageSync('user');
    wx.request({
      url: 'https://www.supermaker.com.cn/clzz/farmByType', //仅为示例，并非真实的接口地址
      data: {
        typeid:this.data.info[ex].id
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if(res.data.code==1){
          var key = "swiper"+ex
          console.log(res.data.farm)
          that.setData({
            [key]:res.data.farm
          })
          wx.createSelectorQuery().selectAll('.schedule-list').boundingClientRect(function(rects){
            rects.forEach(function(rect){
              that.setData({
                docHeight:res.data.farm[ex].farm.length*rect.height+200
              })
            })
          }).exec()
        }
      }
    })
  },
})