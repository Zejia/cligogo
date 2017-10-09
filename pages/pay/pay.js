//logs.js
Page({
    data: {
        logs: null,
        card: null
    },
    onLoad: function() {
        this.fetchCard();
    },
    onShow() {
        try {
            var value = wx.getStorageSync('user')
            if (!value) {
                console.log('123123')
                wx.switchTab({
                    url: '../index/index'
                })
                wx.navigateTo({
                    url: '../login/login'
                })
            }
        } catch (e) {
            console.log('请刷新')
            // Do something when catch error
        }

    },
    fetchCard() {
        var user = wx.getStorageSync('user')
        let that = this;
        wx.request({
            url: 'https://www.supermaker.com.cn/clzz/card',
            data: {
                userid: user.id
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(res) {
                console.log(res.data)
                that.setData({
                    card: res.data.info
                })
            }
        })
    },
    buyCard(e) {
        let that = this;
        var user = wx.getStorageSync('user')
        var openid = wx.getStorageSync('openid')
        console.log(e.target.dataset.cardid)
        wx.request({
            url: 'https://www.supermaker.com.cn/clzz/buyCards',
            data: {
                userid: user.id,
                cardid: e.target.dataset.cardid,
                openid: openid.openid
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(res) {
                console.log(res.data.info)
                wx.requestPayment({
                    'timeStamp': res.data.info.timeStamp,
                    'nonceStr': res.data.info.nonceStr,
                    'package': res.data.info.package,
                    'signType': res.data.info.signType,
                    'paySign': res.data.info.paySign,
                    'success': function(res) {
                        wx.showToast({
                            title: res.data.requestPayment,
                            icon: 'success',
                            duration: 2000
                        })
                    },
                    'fail': function(res) {}
                })

            }
        })
    }
})