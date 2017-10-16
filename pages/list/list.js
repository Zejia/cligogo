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
  },
  onLoad: function () {
    var that = this;  
    
      /** 
       * 获取系统信息 
       */  
      wx.getSystemInfo({  
        success: function( res ){
          that.setData( {  
            winWidth: res.windowWidth,  
            winHeight: res.windowHeight  
          });  
        }  
      });  
    this.fetchData(0);
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
        that.fetchData(e.detail.current)
      },  
      /** 
       * 点击tab切换 
       */  
      swichNav: function( e ) {  
      
        var that = this;  
        that.fetchData(e.target.dataset.current)
        if( this.data.currentTab === e.target.dataset.current ) {  
          return false;  
        } else {  
          that.setData( {  
            currentTab: e.target.dataset.current  
          })  
        }  
      },
  fetchData(ex){
    let that = this;
    let user = wx.getStorageSync('user');
   
    wx.request({
      url: 'https://www.supermaker.com.cn/clzz/cardIO', //仅为示例，并非真实的接口地址
      data: {
        userid: user.id,
        type:ex
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(ex)
        if(res.data.code==1){

          console.log(res.data.time.length)
         
          if(ex==0){
            that.setData({
              swiper0:res.data.time
            })
          }else{
            console.log('`31321231231212312312312123123')
            that.setData({
              swiper1:res.data.time
            })
          }
          // wx.createSelectorQuery().selectAll('.schedule-list').boundingClientRect(function(rects){
          //   rects.forEach(function(rect){
          //     that.setData({
          //       docHeight:res.data.time.length*rect.height+200
          //     })
          //   })
          // }).exec()
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
