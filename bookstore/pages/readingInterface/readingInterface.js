// pages/readingInterface/readingInterface.js
const app = new getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    book_source_id: "567c52c87072ee87599d5533",
    chapter: [],  //存储所有的章节信息，根据里面的link来获取章节内容
    current_chapter: 0,   //记录当前第几章
    current_chapter_content:{},  //记录当前章节的内容
  },
  //根据书源获取书籍章节
  getBookChapter() {
    // `${API_HOST}/atoc/${id}?view=chapters`
    app.globalData.fly.get("https://api.zhuishushenqi.com/atoc/" + this.data.book_source_id + "?view=chapters").then(res => {
      //获取到章节信息后开始获取首页章节的内容
      this.setData({
        chapter: res.data.chapters
      })
      this.getChapterDetail(this.data.chapter[this.data.current_chapter].link);
    }).catch(err => {
      console.log(err);
    })
  },
  //根据章节的链接获取章节内容
  //`https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(link)}`
  getChapterDetail(link){
    link = decodeURIComponent(link);    //将link进行解码  
    app.globalData.fly.get("https://chapter2.zhuishushenqi.com/chapter/"+link).then(res=>{
      this.setData({
        current_chapter_content : res.data.chapter
      })
    }).catch(err=>{
      console.log(err);
    })
  },

  // //跳转到上一章
  goToLastChapter(){
    let temp = this.data.current_chapter;
    temp--;
    if(temp < 0){ //当前页为第一章，不可以返回上一章了

    }else{
      this.setData({
        current_chapter:temp
      })
    }
    //重新获取章节的内容
    this.getChapterDetail(this.data.chapter[this.data.current_chapter].link);
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  //跳转到下一章
  goToNextChapter(){
    let temp = this.data.current_chapter;
    temp++;
    if (temp < 0) { //当前页为第一章，不可以返回上一章了

    } else {
      this.setData({
        current_chapter: temp
      })
    }
    //重新获取章节的内容
    this.getChapterDetail(this.data.chapter[this.data.current_chapter].link);
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if(options.source_id){
      this.setData({
        book_source_id:options.source_id
      })
    }
    this.getBookChapter();
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