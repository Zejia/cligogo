//获取应用实例
var app = getApp()
Page({
    //index.js
    data: {
        mapCtx: null,
        active: '0',
        menuFlag: 0,
        accordionFlag: 0,
        swiperIndex: 0,
        commentMask: 0,
        swiper: null,
        circular: true,
        userInfo: {},
        mapheight: '',
        mallsrc: '../../images/mall.png',
        latitude: null,
        longitude: null,
        scale: 14,
        markers: null
    },
    onReady: function () {
        this.mapCtx = wx.createMapContext('map')
    },
    onLoad: function () {
        wx.getStorage({
            key: 'openid',
            success: function(res) {
                console.log(res.data.openid)
            } 
          })
        console.log('onLoad')
        var that = this
        // 获取手机高度 设置map高度
        wx.getSystemInfo({
            success: function (res) {
                console.log(res.windowHeight)
                that.setData({
                    mapheight: res.windowHeight,
                    'controls[0].position.top': res.windowHeight - 100,
                    'controls[1].position.top': res.windowHeight - 100,
                    'controls[2].position.top': res.windowHeight - 100,
                    'controls[1].position.left': res.windowWidth / 2 - 20,
                    'controls[2].position.left': res.windowWidth - 50
                })
            }
        })
        app.getUserInfo(function (info) {
            //更新数据
            wx.request({
                url: 'https://www.supermaker.com.cn/clzz/index',
                data: {
                    lat: app.globalData.latitude,
                    lng: app.globalData.longitude
                    // lat: '18.535607',
                    // lng: '110.033913'

                },
                success: function (res) {
                    if (res.data.code > 1) {
                        wx.showToast({
                            title: "该城市暂未开通",
                            icon: 'loading',
                            duration: 2000
                        })
                    }
                    that.setData({
                        swiper: res.data.cct,
                        markers: res.data.farmlist
                    })
                    wx.setNavigationBarTitle({
                        title: res.data.city.name+"村里走走"
                      })
                }
            })
            that.setData({
                latitude:app.globalData.latitude,
                longitude: app.globalData.longitude
                // 'markers[0].latitude': '18.535607',
                // 'markers[0].longitude': '110.033913',
            })
        })
    },
    // 显示村庄详情页
    markertap(e) {
        console.log(e.markerId)
        wx.navigateTo({
            url: '../cInfo/cInfo?id='+e.markerId
        })

    },
    // 顶部菜单栏
    menuClick() {
        console.log(this.data.menuFlag)
        if (this.data.menuFlag == 0) {
            this.setData({
                menuFlag: 1
            })
        } else {
            this.setData({
                menuFlag: 0
            })
        }
    },
    // 常见问题/客服
    accordion() {
        wx.navigateTo({
            url: '../question/question'
        })
    },

    // 顶部滑动
    swipersActivity(e) {
        var that = this;
        wx.request({
            url: 'https://www.supermaker.com.cn/clzz/farmByType',
            data: {
                typeid: e.currentTarget.dataset.id
            },
            success: function (res) {
                that.setData({
                    markers: res.data.farm
                })
            }
        })
        this.setData({
            swiperIndex: e.currentTarget.dataset.index
        })
    },
    scanCode() {
        wx.scanCode({
            onlyFromCamera: true,
            success: (res) => {
                console.log(res)
            }
        })
    },
    controltap(e) {
        switch (e.controlId) {
            case 1:
                wx.scanCode({
                    onlyFromCamera: true,
                    success: (res) => {
                        console.log(res)
                    }
                })
                break;
            case 2:
                if (this.data.accordionFlag == 0) {
                    this.setData({
                        accordionFlag: 1
                    })
                } else {
                    this.setData({
                        accordionFlag: 0
                    })
                }
                break;
        }
    },
    // 进入预约页面
    appointment() {
        wx.navigateTo({
            url: '../appointment/appointment/appointment'
        })
    },
    // 点击地图事件
    hidemask() {
        this.setData({
            infoMask: 0
        })
    },  
    reset() {
        this.mapCtx.moveToLocation();
        /*wx.getLocation({
            type: 'wgs84',
            success: function(res) {
                that.setData({
                    latitude: res.latitude,
                    longitude: res.longitude,
                    'scale': 16
                })
            }
        })*/
    },
    selectAddress(e) {
        // var index = $(this).index();
        // var id = $(this).attr('data-id');
        // $('.swiper-slide').removeClass('swiper-activity')
        // $('.swiper-slide').eq(index).addClass('swiper-activity')
        // swiper.slideTo(index)
        // map.clearOverlays();
        var that = this;
        console.log(e.currentTarget.dataset.id)
        wx.request({
            url: 'https://www.supermaker.com.cn/clzz/farmByType',
            data: {
                typeid: e.currentTarget.dataset.id
            },
            success: function (res) {
                that.setData({
                    markers: res.data.farm
                })
            }
        })
        this.setData({
            menuFlag: 0
        })
        this.setData({
            swiperIndex: e.currentTarget.dataset.index
        })
    }
})