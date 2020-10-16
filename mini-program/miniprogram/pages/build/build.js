// miniprogram/pages/home/build/build.js
var app = getApp();

//生成订单号：
var no_create = function(){
  let no = "GN";
  let count = app.globalData.count;
  let no_end = "";
  if (count/10 < 1){
    no_end = "00"+count;
  }else if(count/100 < 1){
    no_end = "0"+count;
  }else{
    no_end = count;
  }
  let timeStamp = new Date();
  // console.log(timeStamp.getFullYear());
  let month = timeStamp.getMonth() + 1;
  no += timeStamp.getFullYear().toString() + month.toString() +timeStamp.getDate().toString() +no_end;
  app.globalData.count++;
  return no;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customer:"",
    phonenumber:"",
    position_name:"点击选择联系地址",
    position_address:"",
    complete_address:"",
    date_choose:"选择日期",
    time_choose:"选择时间",
    model_serve:"上门",

    index:0,
    equipArray:["空调","冰箱","冷库","电磁炉"],
    multiIndex:[0,0,0],
    multiEquipArray:[
      ["空调","冰箱","冷库","电磁炉","电视","洗衣机","其他电器"],
      ["故障","安装","清洗","其他"],
      ["一台","两台","三台","三台以上"]
    ],
    description:"",
  },

  set_customer: function(e) {
    app.globalData.order.customer = e.detail.value;
  },
  set_phonenumber: function(e){
    app.globalData.order.phonenumber = e.detail.value;
  },
  set_position: function(e) {
    let that = this;
    wx.getLocation({
      type:"gcj02",
      success:function(res) {
        wx.chooseLocation({
          latitude: res.latitude,
          longitude:res.longitude,
          success:function(res) {
            console.log(res);
            let info = {
              name:"",
              address:"",
              latitude:"",
              longitude:""
            };
            info.name = res.name;
            info.address = res.address;
            info.latitude = res.latitude;
            info.longitude = res.longitude;
            app.globalData.order.position = info;
          }
        })
      },
      fail:function(e) {
        wx.showToast({
          icon:"none",
          title: '检查定位是否打开？',
        })
      }
    })
  },
  set_complete_address:function(e) {
    app.globalData.order.position.complete_address = e.detail.value;
    this.setData({
      complete_address:e.detail.value,
    })
  },
  date_selector: function(e) {

    app.globalData.order.date_serve = e.detail.value;
    this.setData({
      date_choose:e.detail.value
    })
  },
  time_selector: function(e) {
    app.globalData.order.time_serve = e.detail.value;
    this.setData({
      time_choose:e.detail.value,
    })
  },
  model_selector: function(e) {
    if (e.detail.value =="0") {
      app.globalData.order.model_serve = "上门";
      this.setData({
        model_serve:"上门"
      }) 
    }
    else{
      app.globalData.order.model_serve = "到店";
      this.setData({
        model_serve:"到店"
      })      
    }
  },
  equipInfo_selector: function(e) {
    app.globalData.order.equipInfo.multiIndex = e.detail.value;
    app.globalData.order.equipInfo.equipName = this.data.multiEquipArray[0][e.detail.value[0]];
    app.globalData.order.equipInfo.equipProblem = this.data.multiEquipArray[1][e.detail.value[1]];
    app.globalData.order.equipInfo.equipNumber = this.data.multiEquipArray[2][e.detail.value[2]];
    this.setData({
      multiIndex:e.detail.value,
    })
  },
  description_write: function(e) {
    console.log(e.detail.value);
    app.globalData.order.equipInfo.description = e.detail.value;
  },
//建立newOrder:


  order_submit: function(e) {
    console.log(app.globalData.order);
    if(!app.globalData.order.phonenumber) {
      wx.showToast({
        title: '请提供手机号方便联系！',
        icon:"none",
      })
      return;
    }
     wx.showModal({
       title:"提示",
       content:"信息无误，确认提交？",
       success:function(res) {
         if(res.confirm){
          //提交订单信息到服务器
          
          app.globalData.order.No = no_create();
          // let tempObject = Object.assign({},app.globalData.order);
          let tempObject = JSON.parse(JSON.stringify(app.globalData.order));
          app.globalData.newOrder.push(tempObject);
          // app.globalData.newOrder = {};
          console.log(app.globalData.newOrder);
          wx.showToast({
            title: '订单提交成功！',
          });
          setTimeout(function(){
            wx.switchTab({
              url: '/pages/home/home',
              success:(res)=>{
                wx.showTabBarRedDot({
                  index: 2,
                })
              }
            })
          },1500)
          
         }
       }
     })
  },

// 切换到其他页面时，触发
  onUnload:function (e) {

  },

//初建或回到页面时触发
  onShow: function (e) {
    console.log("预约页显示globaldata:",app.globalData.order);
    this.setData({
      customer:app.globalData.order.customer,
      phonenumber:app.globalData.order.phonenumber,
      date_choose:app.globalData.order.date_serve,
      time_choose:app.globalData.order.time_serve,
      position_address:app.globalData.order.position.address,
      position_name:app.globalData.order.position.name,
      model_serve:app.globalData.order.model_serve,
      complete_address:app.globalData.order.position.complete_address,
      multiIndex:app.globalData.order.equipInfo.multiIndex,
      description:app.globalData.order.equipInfo.description,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})