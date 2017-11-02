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
    },
    joinCart(){
        let currentCartJson =  wx.getStorageSync('currentCartJson'),
             arr = wx.getStorageSync('cart') || [],
             clickN = this.data.clickNum;
             wx.showToast({
                title: '成功加入购物车',
                icon: 'success',
                duration: 1000
            })
             if(arr.length >0){
                for (var j in arr) {
                    // 判断购物车内的item的id，和事件传递过来的id，是否相等  
                    if (arr[j].id == currentCartJson.id) {
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
                  arr.push(currentCartJson);
             }else{
                arr.push(currentCartJson);
             }
             try {
                wx.setStorageSync('cart', arr)
                // 返回（在if内使用return，跳出循环节约运算，节约性能）  
                return;
              } catch (e) {
                console.log(e)
              }
            
    }
})