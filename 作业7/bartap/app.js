//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          var that = this;
          wx.request({
            url: that.globalData.usite + '/cmsv1/apis/getOpenid.ashx',
            method: "GET",
            data: { "code": res.code },
            header: { 'content-type': 'application/json' },
            success: function (res) {
              console.info(res.data.openid);
              that.globalData.openID = res.data.openid;
            },
            fail: function (error) {
              console.info("获取用户openId失败");
              this.globalData.openID = "失败2";
              console.info(error);
            },
            complete: function (openIdRes) {
            }
          })
        }

      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
     selected: 0,
    openID: '',
    usite:"http://132.232.88.15",
    //usite: "http://localhost",
  }
})