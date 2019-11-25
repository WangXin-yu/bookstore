const app = new getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    gender: "male", //大分类 男生 女生 出版
    major: "玄幻", //从分类表格页点进来传的关键字
    minor_index: 0, //控制书籍类型的点击后变红
    minor : "",   //小分类获取的值
    type: "hot",  //值有热门 新书 好评 完结 VIP
    type_index: 0, //type值对应的index值, 用来给添加点击后颜色变红的逻辑
    books: [],    //展示的图书的数据
    start: 0,   //从第一篇文章开始获取
    limit: 20,  //第一次获取20章
    //顶部导航栏
    typeList: [{
      id: 'hot',
      name: '热门'
    }, {
      id: 'new',
      name: '新书'
    }, {
      id: 'reputation',
      name: '好评'
    }, {
      id: 'over',
      name: '完结'
    }, {
      id: 'monthly',
      name: 'VIP'
    }
    ],
    //页面数据导航
    topClassArray: [],
  },

  //点击顶部的热门 新书 好评 完结 VIP，改变type类型来切换展示的图书
  clickTopTypeToChangeBooks(index){
    this.setData({
      books: []
    })
    index = index.currentTarget.dataset.type;
    this.setData({
      type_index: index
    })
    switch(index){
      case 0: this.setData({ type:"hot"});break;
      case 1: this.setData({ type:"new"});break;
      case 2: this.setData({ type:"reputation"});break;
      case 3: this.setData({ type:"over"});break;
      case 4: this.setData({ type:"VIP"});break;
      default: this.setData({ type: "hot" });break;
    }
    this.getBooksData();
  },
  //点击顶部的热门 新书 好评 完结 VIP，改变type类型来切换展示的图书
  clickTopClassToChangeBooks(event) {
    this.setData({
      books: []
    })
    let index = event.currentTarget.dataset.minor_index;
    let temp_minor;
    if (event.currentTarget.dataset.minor==="全部"){
      temp_minor = "";
    }else{
      temp_minor = event.currentTarget.dataset.minor;
    }
    this.setData({
      minor_index: index,
      minor: temp_minor
    })
    this.getBooksData();
  },
  //跳转到图书详情界面
  goToBookDetail(event){
    console.log(event);
    let _id = event.currentTarget.dataset._id;
    wx.navigateTo({
      url: '../bookDetail/bookDetail?_id=' + _id,
    })
  },

  //获取图书分类的数组
  getTopClassArray(){
    app.globalData.fly.get("https://api.zhuishushenqi.com/cats/lv2").then(res=>{
      let obj = res.data[this.data.gender].filter(item => {
        return item.major === this.data.major;
      })
      obj = obj[0].mins;
      obj.unshift("全部");
      this.setData({
        topClassArray: obj
      })
      //获取展示的图书的数据
      this.getBooksData();
    }).catch(err=>{
      console.log(err);
    })
  },

  //获取展示的数据
  getBooksData(){
    wx.showLoading({
      title: '加载中...',
    })
    app.globalData.fly.get("https://api.zhuishushenqi.com/book/by-categories?gender=" + this.data.gender + "&type=" + this.data.type + "&minor=" + this.data.minor+"&major="+this.data.major+"&start="+this.data.start+"&limit="+this.data.limit).then(res=>{
      wx.hideLoading();
      console.log(res);
      let temp = res.data.books;
      temp.map(item => {
        if (item.tags.length > 3) {
          let tags = item.tags;
          let deletion_tags = [];
          for(let i = 0; i < 3; i++){
            let rand_index = Math.round(Math.random() * (tags.length - 1));
            deletion_tags.push(tags[rand_index]);
            let item1 = tags.splice(rand_index, 1);
          }
          item.tags = deletion_tags;
        }
      })
      temp = this.data.books.concat(temp);
      this.setData({
        books: temp
      })
    }).catch(err=>{
      console.log(err);
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type){
      this.setData({
        major: options.type,
        gender: options.gender,
      })
    }
    this.getTopClassArray();
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
    let start = this.data.start + 20;
    this.setData({
      start: start
    })
    this.getBooksData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})