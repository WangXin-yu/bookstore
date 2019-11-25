const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //如果有总榜 周榜 月榜 
    rank_type: 0, //0->周榜 1->月榜 2->总榜 
    rank_receive_data: {}, //存储路由接收的参数
    exit_rank_type: false,  //是否存在其他榜
    week_rank_arr: [], //周榜
    month_rank_arr: [], //月榜
    total_rank_arr: [], //总榜 
    _id: "54d42d92321052167dfb75e3"
  },
  //根据传过来的ID信息获取详细的排行榜的信息
  getRankDetailData() {
    app.globalData.fly.get("https://api.zhuishushenqi.com/ranking/" + this.data.rank_receive_data._id).then(res => {
      if(res.data.ranking.monthRank){
        this.setData({
          exit_rank_type: true
        })
      
      }
      this.setData({
        week_rank_arr: res.data.ranking.books
      })
      this.getTypeRankData("month", res.data.ranking.monthRank);
      this.getTypeRankData("total", res.data.ranking.totalRank);
    }).catch(err => {
      console.log(err);
    })
  },

  //如果存在周榜月榜总榜的情况下
  rankToggle(event) {
    this.setData({
      rank_type: event.currentTarget.dataset.type
    })
  },

  //获取周榜， 月榜 ，总榜
  getTypeRankData(type, id) {
    app.globalData.fly.get("https://api.zhuishushenqi.com/ranking/" + id).then(res => {
      if (type === "month") {
        this.setData({
          month_rank_arr: res.data.ranking.books
        })
      } else if (type === "total") {
        this.setData({
          total_rank_arr: res.data.ranking.books
        })
      }
    }).catch(err => {
      console.log(err);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options._id){
      this.setData({
        rank_receive_data: JSON.parse(options._id)
      })
    }
    this.getRankDetailData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})