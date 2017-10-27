//logs.js
var WxParse = require('../../wxParse/wxParse.js');

Page({
    data: {
        farm: null,
        urls: null,
        evaluate: null,
        current: null,
        tariff: null,
        farmid: ''
    },
    onLoad: function(option) {
        console.log(option.id)
        this.setData({
            farmid: option.id
        })
        var that = this;
        wx.request({
            url: 'https://www.supermaker.com.cn/clzz/farm',
            data: {
                farmid: option.id
            },
            success: function(res) {
                that.setData({
                    farm: res.data.farm,
                    urls: res.data.urls,
                    current: res.data.current,
                    evaluate: res.data.evaluate,
                    link: res.data.link,
                    tariff: res.data.tariff
                })
                var article = res.data.farm.content
                WxParse.wxParse('article', 'html', article, that);
                wx.setNavigationBarTitle({
                    title: res.data.farm.name
                })
            }
        })
    },
    previewImages() {
        var that = this;
        wx.previewImage({
            current: that.data.current, // 当前显示图片的http链接
            urls: that.data.urls // 需要预览的图片http链接列表
        })
    },
    // 常见问题/客服
    appointment() {
        let that = this;
        try {
            var value = wx.getStorageSync('user')
            if (!value) {
                wx.navigateTo({
                    url: '../login/login'
                })
            } else {
                wx.navigateTo({
                    url: '../appointment/appointment-info/appointment-info?farmid=' + that.data.farmid + '&farmname=' + that.data.farm.name
                })
            }
        } catch (e) {
            console.log('请刷新')
            // Do something when catch error
        }


    },
    openLocation() {
        var that = this;
        wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            success: function(res) {
                var latitude = res.latitude
                var longitude = res.longitude
                wx.openLocation({
                    latitude: that.data.farm.latitude,
                    longitude: that.data.farm.longitude,
                    scale: 28,
                    name: that.data.farm.address
                })
            }
        })
    },
    onShareAppMessage: function () {
        var that = this;
       return {
         title: that.data.farm.name,
         imageUrl:that.data.current,
         path: 'pages/cInfo/cInfo?id='+that.data.farmid
       }
     },
     consult(){
         wx.makePhoneCall({
             phoneNumber: '0898-38322067'
           })
     }
})