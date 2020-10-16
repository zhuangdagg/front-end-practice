//index.js
const app = getApp();
var userInfo = {};
Page({
  data: {
    userInfo: {
      nickName:"点击 登录",
      avatarUrl:"/images/user/unlogin.png",
    },
    logged: false,

  },

  onLoad: function() {
    let that = this;
    wx.getStorage({
      key:"userInfo",
      success:function(res) {
        userInfo = res.data;
        that.setData({
          userInfo,
        })
      },
      fail:function(){
        wx.showToast({
          icon:"none",
          title: "请登录！",
        })
      }
    })
  },

  //   // 获取用户信息
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             this.setData({
  //               avatarUrl: res.userInfo.avatarUrl,
  //               userInfo: res.userInfo
  //             })
  //           }
  //         })
  //       }
  //     }
  //   })

  loginAction:function(e){
    // wx.login({
    //   timeout: 600,
    //   success:function(res){
    //     console.log(res.code);
    //     wx.request({
    //       url: 'url',
    //     })
    //   }
    // })
   
  },
  test:function(e){
    //测试服务器用例：
    // wx.request({
    //   url: base_url+'/test',
    //   success:function(res) {
    //     wx.showToast({
    //       title:res.data,
    //     })
    //   },
    //   fail:function(res) {
    //     wx.showToast({
    //       title:res.errMsg,
    //       icon:"none"
    //     })
    //   }
    // })
    let openId = {
      openId :"myOpenId",
      expiredTime:null
    }
    wx.setStorage({
      data: openId,
      key: 'openId',
      success:function(res) {
        console.log("设置成功！");
      }
    })
  },

  onGetUserInfo: function(e) {
    let that = this;
    let userInfo = that.data.userInfo;
    if (!app.globalData.login_session && e.detail.userInfo) {
      userInfo.avatarUrl = e.detail.userInfo.avatarUrl;
      userInfo.nickName = e.detail.userInfo.nickName;
      this.setData({
        logged: true,
        userInfo,
      })
      wx.setStorage({
        data: this.data.userInfo,
        key: 'userInfo',
        success:function(e){
          console.log(e.errMsg,"成功加入userInfo缓存")
        }
      })
    };
  },
  send_welcome:function(e) {
    wx.showToast({
      icon:"none",
      title: '敬请期待！',
    })
  },
  toOrder:function(e) {
    wx.switchTab({
      url: '/pages/order/order',
    })
  },
})
