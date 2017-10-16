Page({
  data:{
     flag2:5,
     comment:['非常不满意,各方面都很差','不满意,比较差','一般,还需改善','比较满意,仍可改善','非常满意,无可挑剔'],
     disabled: false,
     loading: false,
     comments:'非常满意,无可挑剔',
     farmid:null,
     orderid:null
  },
  onLoad(option){
    this.setData({
      farmid: option.farmid,
      orderid:option.orderid
    })
  },
  changeColor11:function(){
        var that = this;
        that.setData({
            flag2: 1,
            comments:this.data.comment[0]
        });
    },
  changeColor12:function(){
        var that = this;
        that.setData({
            flag2:2,
            comments:this.data.comment[1]
        });
    },
  changeColor13:function(){
        var that = this;
        that.setData({
            flag2: 3,
            comments:this.data.comment[2]
        });
    },
  changeColor14:function(){
        var that = this;
        that.setData({
            flag2:4,
            comments:this.data.comment[3]
        });
    },
  changeColor15:function(){
        var that = this;
        that.setData({
            flag2: 5,
            comments:this.data.comment[4]
        });
  },
  upload(){
    
  let that = this,
      user = wx.getStorageSync('user'),
      farmid = that.data.farmid,
      userid = user.id
    this.setData({
      loading: true,
      disabled:true
    })
    wx.request({
      url: 'https://www.supermaker.com.cn/clzz/subEvaluate', 
      data: {
        userid:userid,
        farmid: farmid,
        star: this.data.flag2,
        content: this.data.comments,
        orderid:this.data.orderid
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
        console.log(res.data)
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
        },2000)
        // wx.switchTab({
        //   url:'../me/me'
        // })
      },
      complete:function(){
        that.setData({
          loading: false,
          disabled:false
        })
      }
    })
  },
  changeValue(e){
    this.setData({
      comments: e.detail.value
    })
  }
})