// pages/bookShelf/bookShelf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shelf_array:[],
  },

  //跳转到帮助页面
  goToHelp: function(){
    wx.navigateTo({
      url: '/pages/help/help',
    });
  },

  //获取本地的存储书架的数组
  getStorageShelfArray(){
    wx.showLoading({
      title: '加载中...',
    })
    this.setData({
      shelf_array: wx.getStorageSync("shelf")
    })
    wx.hideLoading()
  },

  //跳转到书籍详情页
  goToBookDetail(event){
    console.log(event);
    wx.navigateTo({
      url: '../bookDetail/bookDetail?_id='+event.currentTarget.dataset._id,
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获取书架的信息
    this.getStorageShelfArray();
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