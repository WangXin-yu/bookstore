// pages/search/search.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hot_words: [],        //存储所有的热词
    rand_hotwords: [],    //随机的6个热词
    search_key: "",       //搜索的关键字
    search_books: [
      
    ],     //存储搜索出来的书籍
  },
  //搜索
  searchBookInput:function(event){
    this.setData({
      search_key : event.detail.value
    })
    console.log(this.data.search_key);
    //调用接口，根据关键字请求搜索数据
    this.getSearchBooks();
  },
  //跳转到书籍的详情页
  goToBookDetail(event){
    console.log(event);
    wx.navigateTo({
      url: '../bookDetail/bookDetail?_id='+event.currentTarget.dataset._id,
    })
  },
  //根据关键字请求搜索数据
  getSearchBooks(){
    // ${ API_HOST } /book/fuzzy - search ? start = 0 & limit=50 & v=1 & query=${ content }
    app.globalData.fly.get("https://api.zhuishushenqi.com/book/fuzzy-search?start=0&limit=50&v=1&query="+this.data.search_key).then(res=>{
      this.setData({
        search_books: res.data.books
      })
      console.log(this.data.search_books)
    }).catch(err=>{
      console.log(err);
    })
  },

  //获取搜索热词 `${API_HOST}/book/fuzzy-search?start=0&limit=50&v=1&query=${content}`
  getSearchHotWords(){
    app.globalData.fly.get("https://api.zhuishushenqi.com/book/hot-word").then(res=>{
      this.setData({
        hot_words: res.data.newHotWords
      })
      //获取随机的6个热词
      this.getSixHotWords();
    }).catch(err=>{
      console.log(err);
    })
  },
  //随机获取6个热词
  getSixHotWords(){
    let rand_hotwords_arr = [];   //用来存储随机的6个热词
    let rand_index = 0;           //随机位置
    for(let i = 0; i < 6; i++){
      rand_index = Math.round(Math.random()*(this.data.hot_words.length-1)) //获取总长度下的一个随机的位置
      rand_hotwords_arr.push(this.data.hot_words[rand_index]);              //将得到的随机热词放到数组中
      this.data.hot_words.splice(rand_index, 1);                            //将随机位置删除，避免重复得到
    }
    
    this.setData({
      rand_hotwords:rand_hotwords_arr
    })
    console.log(this.data.rand_hotwords);
    //获取完后，重新获取热词，因为原数组中的一些热词已经被删除了
    app.globalData.fly.get("https://api.zhuishushenqi.com/book/hot-word").then(res => {
      this.setData({
        hot_words: res.data.newHotWords
      })
    }).catch(err => {
      console.log(err);
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSearchHotWords();
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