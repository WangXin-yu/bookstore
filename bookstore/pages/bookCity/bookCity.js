const app = new getApp();
// pages/bookCity/bookCity.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 分类部分的数据
    class_male: [], //存储男生类的小说
    class_female: [], //存储女生类
    class_press: [], //出版类
    status: 1,  //1->显示分类页面，2->显示排行
    // 排行部分用到的数据
    rank_male:[],   //男生排行榜
    rank_female: [], //女生排行榜
    rank_picture: [], //玄幻排行版
  },
  
  //显示分类部分的点击事件
  showClass(){
    this.setData({
      status: 1
    })
  },
  //显示排行部分的点击事件
   showRank() {
     this.setData({
       status: 2
     })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getClassData();
    this.getRankData();
    this.getLillteData();
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

  //获取分类的种类
  getClassData(){
    wx.showLoading({
      title: "加载中",
    })
    app.globalData.fly.get('https://api.zhuishushenqi.com/cats/lv2/statistics').then(res=>{
      wx.hideLoading();
      this.setData({
        class_male: res.data.male,
        class_female: res.data.female,
        class_press: res.data.press 
      }) 
    }).catch(err=>{
      console.log(err)
    })
  },
  //获取排行的数据
  getRankData(){
    app.globalData.fly.get("https://api.zhuishushenqi.com/ranking/gender").then(res=>{
      this.setData({
        rank_male: res.data.male,
        rank_female: res.data.female,
        rank_picture: res.data.picture
      })
    })
  },

  //获取小类数据
  getLillteData() {
    app.globalData.fly.get("https://api.zhuishushenqi.com/book/by-categories?gender=male&type=new&major=%E7%8E%84%E5%B9%BB&start=0&limit=20").
    then(res => {
    })
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