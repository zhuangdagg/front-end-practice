// miniprogram/pages/order.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:[{
      No:"GN20201013001",
      condition:"待上门",
      time_serve:"14:30",
      date_serve:"2020-10-13",
      position:{
        name: "遂八小",
        address: "广东省湛江市遂溪县遂城镇",
        latitude: "1242313",
        longitude: "154245",
        complete_address: "克山村"
      },
      equipInfo:{
        equipName: "空调",
        equipBrand: "",
        equipNumber: "两台",
        equipProblem: "故障",
        description: "我的剩宿舍"
      },
    },{
      No:"GN20201010002",
      condition:"已完成",
      time_serve:"15:00",
      date_serve:"2020-10-10",
      position:{
        name: "遂三小",
        address: "广东省湛江市遂溪县遂城镇",
        latitude: "1242313",
        longitude: "154245",
        complete_address: "克山村"
      },
      equipInfo:{
        equipName: "冰箱",
        equipBrand: "",
        equipNumber: "三台",
        equipProblem: "安装",
        description: "我的剩宿舍"
      },
 
    },{
      No:"GN202010100031",
      condition:"已完成",
      time_serve:"15:00",
      date_serve:"2020-10-10",
      position:{
        name: "遂三小",
        address: "广东省湛江市遂溪县遂城镇",
        latitude: "1242313",
        longitude: "154245",
        complete_address: "克山村"
      },
      equipInfo:{
        equipName: "冰箱",
        equipBrand: "",
        equipNumber: "三台",
        equipProblem: "安装",
        description: "我的剩宿舍"
      },
 
    },{
      No:"GN20201010004",
      condition:"已完成",
      time_serve:"15:00",
      date_serve:"2020-10-10",
      position:{
        name: "遂三小",
        address: "广东省湛江市遂溪县遂城镇",
        latitude: "1242313",
        longitude: "154245",
        complete_address: "克山村"
      },
      equipInfo:{
        equipName: "冰箱",
        equipBrand: "",
        equipNumber: "三台",
        equipProblem: "安装",
        description: "我的剩宿舍"
      },
 
    }],
    action_order:{
      "未接单":"取消",
      "待上门":"取消",
      "已完成":"评价"
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.removeTabBarBadge({
      index: 2,
    });
    while(app.globalData.newOrder.length >0){
      let tempOrder = app.globalData.newOrder.shift();
      let order = this.data.order;
      order.unshift(tempOrder);
      this.setData({order});
      console.log(app.globalData.newOrder.length);
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  order_control:function(e) {
    let that = this;
    let tempOrder = this.data.order;
    let index = e.target.id;
    console.log(e.target.id);
    if(this.data.order[index].condition == "已完成"){
      wx.showToast({
        title: '即将开放评价功能！',
        icon:"none"
      })
    }else{
      wx.showModal({
        title:"温馨提示：",
        content:"您确定要取消订单吗？",
        cancelText: "返回",
        confirmText:"取消",
        confirmColor:"#ff0000",
        success:function(res) {
          if(res.confirm){
            tempOrder.splice(index,1);
            that.setData({
              order:tempOrder,
            })
          }
        }
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})