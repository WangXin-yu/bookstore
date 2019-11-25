// components/rank/rank.js
const app = new getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    _rank: {
      type: Array,
      default: []
    },
    gender:{
      type:String,
      value: ''  
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    num: 1,
    rank_id_array: [],

  },

  ready: function(){
    this.getRankData();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //获取排行榜的数据
    getRankData: function () {
      app.globalData.fly.get("https://api.zhuishushenqi.com/ranking/gender").then(res => {
        if(this.data.gender === "male"){
          this.setData({
            rank_id_array: res.data.male,
          })
        }else if(this.data.gender === "female"){
          this.setData({
            rank_id_array: res.data.female,
          })
        } else if (this.data.gender === "picture") {
          this.setData({
            rank_id_array: res.data.picture,
          })
        }
        console.log(this.data.rank_id_array);
      }).catch(err => {
        console.log(err)
      })
    },
    //跳转到排行榜详情页面
    goToRankDetail(event){
      let _id = event.currentTarget.dataset._id;
      _id = JSON.stringify(_id);

      wx.navigateTo({
        url: '../../pages/rank/rank?_id=' + _id,
      })
    } 
  }
})
