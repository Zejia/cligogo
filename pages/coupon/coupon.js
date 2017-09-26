//logs.js
Page({
  data: {
    logs:null
  },
  onLoad: function () {
    this.fetchData();
  },
  fetchData(){
    let that = this;
    let user = wx.getStorageSync('user');
    wx.request({
      url: 'http://120.76.208.177:8087/clzz/cardIO', //仅为示例，并非真实的接口地址
      data: {
        userid: user.id
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data.time)
        if(res.data.code==1){
          that.setData({
            logs:res.data.time
          })
          var time = []
          for (let i = 0; i < res.data.time.length; i++) {
            let dataImg = res.data.time[i].s+'';
             time.push(dataImg.replace('-',' '))
          };
          that.setData({
            time
          })
        }
      }
    })
    
  }
})
