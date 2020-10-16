//app.js

App({
  onLaunch: function () {
    
    this.globalData = {order:{
      No:"",
      customer:"",
      phonenumber:"",
      condition:"未接单",
      model_serve:"上门",
      time_serve:"选择时间",
      date_serve:"选择日期",
      position:{
        name:"点击选择联系地址",
        address:"",
        latitude:"",
        longitude:"",
        complete_address:""
      },
      equipInfo:{
        multiIndex:[0,0,0],
        equipName:"",
        equipBrand:"",
        equipNumber:0,
        equipProblem:"",
        description:"",
        pic:"",
      }
      },
      newOrder:[],
      count:1,
      base_url:"http://127.0.0.1",  //or https://mmpoem.cn(测试服务端)且要配置本地不校验合法域名；
      login_session:false,
    }
  },
  onShow:function() {
    let that = this;
    wx.getStorage({
      key: 'openId',
      success:function(res) {
        if(res.data.openId){
          that.globalData.login_session = true;
          console.log("已登录",res.data);
        }
      },
      fail:function(res) {
        wx.login({
          timeout: 5000,
          success:function(res){
            console.log(res.code);
            wx.request({
              url: that.globalData.base_url+'/login?js_code='+res.code,
              success:function(res){
                let openId = {
                  openId :"",
                  expiredTime:null
                }
                openId.openId = res.data.openId;
                wx.setStorage({
                  data: openId,
                  key: 'openId',
                  success:function() {
                    that.globalData.login_session = true;
                  }
                })
                console.log(res.data);
              },
              fail:function(e) {
                console.log("openId获取失败")
              }
            })
          }
        });

      }
    })
  }
})
