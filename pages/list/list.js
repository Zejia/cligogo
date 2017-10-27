//logs.js
Page({
  data: {
    winWidth: 0,  
    winHeight: 0,  
    // height
    docHeight:null,
    ccHeight:800,
    height:null,
    // tab切换  
    currentTab: 0,  
    cityid:null,
    info:null,
    swiper:null,
    tips:[],
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
       console.log(res.data.list.length)
       let tips = [];
       for (let i = 0; i < res.data.list.length; i++) {
        let tip = [];
         for (let k = 0; k < res.data.list[i].length; k++) {
          let element = res.data.list[i][k].tips;
              tip.push(element.split('|'))
         }
         tips.push(tip)
       }
        that.setData({
          tips
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
          wx.createSelectorQuery().selectAll('.scroll-view_H').boundingClientRect(function(rects){
            rects.forEach(function(rect){
              that.setData({
                docHeight:res.windowHeight-rect.height-40
              })
            })
          }).exec()
        }  
      });
     
     
  },
  /** 
     * 滑动切换tab 
     */  
    bindChange: function( e ) {  
        var that = this;  
        that.setData( { currentTab: e.detail.current }); 
        wx.createSelectorQuery().select('.schedule-list').boundingClientRect(function(rect){
            that.setData({
              ccHeight:that.data.swiper[e.detail.current].length*(rect.height+25)
            })
        }).exec()
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
          wx.createSelectorQuery().select('.schedule-list').boundingClientRect(function(rects){
            rects.forEach(function(rect){
              that.setData({
                ccHeight:res.data.farm[ex].farm.length*(rect.height+25)
              })
            })
          }).exec()
        }
      }
    })
  },
})
