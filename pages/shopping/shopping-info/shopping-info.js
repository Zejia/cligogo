//logs.js
var WxParse = require('../../../wxParse/wxParse.js');

Page({
    data: {
        urls: []
    },
    onLoad: function (option) {
        this.fetchdata(option.id)

    },
    previewImages() {
        var that = this;
        wx.previewImage({
            current: that.data.firstimg, // 当前显示图片的http链接
            urls: that.data.urls // 需要预览的图片http链接列表
        })
    },
    fetchdata(skuid) {
        var that = this;
        wx.request({
            url: 'https://www.supermaker.com.cn/chh/skuInfo', //仅为示例，并非真实的接口地址
            data: {
                skuid: skuid
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                if (res.data.code == 1) {
                    let url = [];
                    for (var i = 0; i < res.data.imgs.length; i++) {
                        let ele = "http://img.bama77.com/temp/" + res.data.imgs[i];
                        url.push(ele)
                    }
                    let bring = [],
                        info = [];
                    for (var k = 0; k < res.data.tips.length; k++) {
                        switch (res.data.tips[k].type) {
                            case 1:
                                bring.push(res.data.tips[k]);
                                break;
                            case 2:
                                info.push(res.data.tips[k]);
                                break;
                        }
                    }
                    var article = res.data.skuinfo.content
                    WxParse.wxParse('article', 'html', article, that, 5);
                    that.setData({
                        skuinfo: res.data.skuinfo,
                        bring,
                        info,
                        urls: url,
                        firstimg: "http://img.bama77.com/temp/"+res.data.firstimg,
                    })
                }
            }
        })
    },
    onShareAppMessage: function () {
        var that = this;
        return {
            title: that.data.farm.name,
            imageUrl: that.data.current,
            path: 'pages/cInfo/cInfo?id=' + that.data.farmid
        }
    }
})