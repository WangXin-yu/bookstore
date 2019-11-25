// pages/bookDetail/bookDetail.js
const app = new getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    _id: "542a5838a5ae10f815039a7f",
    book_data: {},
    book_recommand_data: [],    //存储推荐的所有小说
    book_recommand_show:[],       //存储界面上显示的3条推荐的小说
    book_comment_data: [],      //存储书籍的评论
    toggle: "detail",  //detail 展示详情部分 comment 展示评价部分
    rating: 0,       //星级评分 
    book_source_id: "567c52c87072ee87599d5533",//书源id，用来获取书籍的章节
  },

  //toggle的点击事件 开始阅读 和 加入书架
  toggleEvent(toggle){
    this.setData({
      toggle: toggle.currentTarget.dataset.toggle
    })
  },
  //获取推荐详情
  getRecommand(){
    app.globalData.fly.get("https://api.zhuishushenqi.com/book/" + this.data._id +"/recommend").then(res=>{
      this.setData({
        book_recommand_data: res.data.books
      })
    }).catch(err=>{
      console.log(err);
    })
  },
  //换一换推荐的文章
  changeRecommand(){
    app.globalData.fly.get("https://api.zhuishushenqi.com/book/" + this.data._id + "/recommend").then(res => {
      this.setData({
        book_recommand_data: res.data.books
      })

      let rand_index = 0;             //用来存储随机位置的索引
      let temp_book_recommand_data = this.data.book_recommand_data;//备份原数组
      let show_arr = [];              //用来存储三个随机值
      for (let i = 0; i < 3; i++) {     //循环三次，每次获取一个随机值
        //获取推荐数组长度的随机索引
        rand_index = Math.round(Math.random() * (temp_book_recommand_data.length - 1));
        // console.log(temp_book_recommand_data[rand_index]);
        //将得到的随机值存储到show_arr中
        show_arr.push(temp_book_recommand_data[rand_index]);
        //将已经得到的随机索引从备份数组中删除，避免得到相同的随机值
        temp_book_recommand_data.splice(rand_index, 1);
      }
      //将得到的随机数组赋值给data中的数组
      this.setData({
        book_recommand_show: show_arr
      })

    }).catch(err => {
      console.log(err);
    })


  },
  //获取书籍的详细数据
  getBookData(){
    app.globalData.fly.get('https://api.zhuishushenqi.com'+'/book/'+this.data._id).then(res=>{
      //页面初始化时得到推荐内容
      this.changeRecommand();
      let rating = Math.floor(res.data.rating.score)/2;
      this.setData({
        book_data : res.data,
        rating : rating
      })
    }).catch(err=>{
        console.log(err);
    })
  },

  //获取评价
  getCommentData(){
    app.globalData.fly.get("https://api.zhuishushenqi.com/post/short-review?book="+this.data._id+"&total=true&sortType=newest").then(res=>{
      this.setData({
        book_comment_data: res.data.docs
      })
    }).catch(err=>{
      console.log(err);
    })
  },

  //获取书源
  getBookSource(){
    app.globalData.fly.get("https://api.zhuishushenqi.com/atoc?view=summary&book="+this.data._id).then(res=>{
      this.setData({
        book_source_id : res.data[0]._id
      }) 
    }).catch(err=>{
      console.log(err);
    })
  },

  //跳转到阅读界面
  goToReadingInterface(event){
    wx.navigateTo({
      url: '../readingInterface/readingInterface?source_id='+event.currentTarget.dataset.source_id,
    })
    console.log(event);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    if(options._id){
      this.setData({
        _id: options._id
      })
    }
    //获取图书的详细数据
    this.getBookData();
    //获取评论
    this.getCommentData();
    //获取书源
    this.getBookSource();

  },
  // 加入书架 将图书信息存储到本地
  addToBookShelf(){
    //如果本地没有 那么新建数组存储书架的信息
    if(!wx.getStorageSync("shelf")){
      wx.setStorageSync("shelf", []);
    }
    //得到本地存储书架数组的数组
    // wx.setStorageSync("shelf", []);
    let shelf_arr = wx.getStorageSync("shelf");
    //将本书的信息存储到临时数组  存之前判断即将加入书架的书是否已经存在书架中
    let exit = false; //false->没有加入书架 true->已经加入书架
    shelf_arr.forEach(item=>{
      if(item._id === this.data._id){ //已经加入书架了
        exit = true;
      }
    })
    if(!exit){                        //没有加入书架则加入到书架
      shelf_arr.push(this.data.book_data);
      wx.setStorageSync("shelf", shelf_arr);
    }
    wx.showToast({
      title: '加入书架成功',
    })
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