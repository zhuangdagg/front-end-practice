// miniprogram/pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url_show_image:["/images/swiper/swiper1.jpg","/images/swiper/swiper4.jpg","/images/swiper/swiper2.jpg","/images/swiper/swiper3.jpg"]
  },

  serve_build: function(e) {
    wx.navigateTo({
      url: '/pages/build/build',
    })
  },
  serve_telphone: function(e) {
    wx.makePhoneCall({
      phoneNumber:"18824789624",
      fail: function(e) {
        wx.showToast({
          title: '线路繁忙，请稍后再拨！',
          icon:"none"
        })
      }
    })
  },
  phonenumber_add: function(e) {
    wx.addPhoneContact({
      firstName:"广南（家电维修）",
      nickName:"陈师傅",
      lastName:"陈",
      remark:"家电安装，维修，清洗服务",
      mobilePhoneNumber:"18824789624",
      weChatNumber:"weixiu18824789624",
      addressCountry:"中国",
      addressState:"广东省",
      addressCity:"廉江市",
      addressStreet:"广场路永福·御景城旁",
      addressPostalCode:"524400",
      organization:"廉江市广南维修部",
      title:"家电维修",
      fail: function(e) {
        wx.showToast({
          title: '添加失败！',
          icon:"none"
        })
      }


      
    })
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})