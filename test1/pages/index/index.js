Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    student: {name: "laowang"}
  },

  /**
   *设置num的值 
   */
  setNum: function(){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      num: 100,
      student: { name: "laoliu" }
    });
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    setTimeout(()=>{
      wx.hideNavigationBarLoading()
    }, 1000)
    console.log("下拉刷新")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("我要下拉触底");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})