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
        cityid: null,
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
    onReady: function() {
        this.mapCtx = wx.createMapContext('map')
    },
    onShow: function() {
        var that = this;
        if (!app.globalData.farm) {
            return;
        }
        if (app.globalData.farm == -1) {
            app.globalData.farm = null;
            wx.request({
                url: 'https://www.supermaker.com.cn/clzz/index',
                data: {
                    lat: this.data.latitude,
                    lng: this.data.longitude
                },
                success: function(res) {
                    that.setData({
                        swiper: res.data.cct,
                        markers: res.data.farmlist
                    })
                    wx.setNavigationBarTitle({
                        title: "村里走走"
                    })
                }
            })
            console.log('全部')
            return;
        }
        this.setData({
            markers: app.globalData.farm
        });
        wx.setNavigationBarTitle({
            title: app.globalData.farmName
        })
        app.globalData.farm = null;
    },
    onLoad: function() {
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
            success: function(res) {
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
        app.getUserInfo(function(info) {
            wx.getLocation({
                type: 'wgs84',
                success: function(res) {
                    //更新数据
                    that.setData({
                        latitude: res.latitude,
                        longitude: res.longitude
                    })
                    wx.request({
                        url: 'https://www.supermaker.com.cn/clzz/index',
                        data: {
                            lat: res.latitude,
                            lng: res.longitude
                        },
                        success: function(res) {
                            that.setData({
                                swiper: res.data.cct,
                                markers: res.data.farmlist,
                                cityid: res.data.city.id
                            })
                        }
                    })

                }
            })

        })
    },
    // 显示村庄详情页
    markertap(e) {
        console.log(e.markerId)
        wx.navigateTo({
            url: '../cInfo/cInfo?id=' + e.markerId
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
            success: function(res) {
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
        wx.showModal({
            title: '村里走走',
            content: '扫描无人农庄大门、冰箱、储物箱旁边的二维码，实现控制开关门。',
            success: function(res) {
                if (res.confirm) {
                    wx.scanCode({
                        onlyFromCamera: true,
                        success: (res) => {
                            console.log(res)
                        }
                    })
                } else if (res.cancel) {

                }
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
            success: function(res) {
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
    },
    selectType() {
        wx.navigateTo({
            url: '../service/service?latitude=' + this.data.latitude + '&longitude=' + this.data.longitude + '',
        })
    },
    selectlist() {
        wx.navigateTo({
            url: '../list/list?cityid=' + this.data.cityid
        })
    },
    onShareAppMessage: function() {
        var that = this;
        return {
            title: '农餐、农宿、农玩、农游、果场、赏花、农品购物',
            imageUrl: "http://cdnimg.bama77.com/13.jpg",
            path: 'pages/index/index'
        }
    }
})