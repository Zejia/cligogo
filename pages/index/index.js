//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        active: '0',
        swiper: [{ "createtime": "2017-07-29 17:07:48", "display": 1, "icon": "1501552299384.png", "id": 1, "name": "无人农庄", "sort": 0 }, { "createtime": "2017-07-29 17:08:37", "display": 1, "icon": "1501577439641.png", "id": 2, "name": "美丽乡村", "sort": 0 }, { "createtime": "2017-07-29 17:08:45", "display": 1, "icon": "1501552443375.png", "id": 3, "name": "农活/采摘", "sort": 0 }, { "createtime": "2017-08-01 16:00:49", "display": 1, "icon": "1501577388747.png", "id": 4, "name": "农厨好味", "sort": 0 }],
        "contentlist": [{ "address": "青山村", "contact": "杨士海", "createtime": "2017-07-29 17:20:51", "display": 1, "icon": "1501680452927.png", "id": 1, "loglat": "109.948915,18.48357", "maxman": 100, "minimun": 200.0, "name": "乡村童年", "price": 200.0, "star": 5, "telophone": "21234242223", "title": "小时候渴望长大，长大了希望停留在小时候，去到乡村童年，遇见那时的自己", "typeid": 1 }],
        circular: true,
        userInfo: {},
        mapheight: '',
        mallsrc: '../../images/mall.png',
        latitude: 23.099994,
        longitude: 113.324520,
        markers: [{
            iconPath: "../../images/index.png",
            id: 0,
            latitude: 23.099994,
            longitude: 113.324520,
            width: 50,
            height: 50
        }, {
            iconPath: "../../images/index.png",
            id: 1,
            latitude: 23.099994,
            longitude: 113.334520,
            width: 50,
            height: 50
        }]

    },
    onLoad: function() {
        console.log('onLoad')
        var that = this
        // 获取手机高度 设置map高度
        wx.getSystemInfo({
            success: function(res) {
                console.log(res.windowHeight)
                that.setData({
                    mapheight: res.windowHeight - 40,
                    'controls[0].position.top': res.windowHeight - 60,
                    'controls[1].position.top': res.windowHeight - 60,
                    'controls[2].position.top': res.windowHeight - 60,
                    'controls[1].position.left': res.windowWidth / 2 - 20,
                    'controls[2].position.left': res.windowWidth - 50
                })
            }
        })
    },
    markertap(e) {
        console.log(e.markerId)
    },
    toggle(e) {
        if (e.currentTarget.dataset.index == this.data.active) {
            this.setData({
                active: "0"
            })
        } else {
            this.setData({
                active: e.currentTarget.dataset.index
            })
        }
    },
    previewImages() {
        wx.previewImage({
            current: 'https://img.supermonkey.com.cn/box/1015/301.jpg', // 当前显示图片的http链接
            urls: ['https://img.supermonkey.com.cn/box/1015/301.jpg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503288743056&di=486431acf9ab2f8c0f0134fa2764742e&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201508%2F01%2F20150801104534_LS25k.thumb.700_0.png'] // 需要预览的图片http链接列表
        })
    }
})