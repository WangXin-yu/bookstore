// components/classification/classification.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    _class:{
      type: Array,
      value: ''
    },
    num:{
      type: Number,
      default: 0
    },
    name:{
      type: String,
      default: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },



  /**
   * 组件的方法列表
   */
  methods: {
    // //"https://api.zhuishushenqi.com/book/by-categories?gender=male&type=new&major=%E7%8E%84%E5%B9%BB&start=0&limit=20"
    // //跳转到分类详情页  gender type major=%E7%8E%84%E5%B9%BB start = 0 limit = 20
    goToClassDetail: function (event) {
      let gender = event.currentTarget.dataset.gender;
      let type = event.currentTarget.dataset.type;


      console.log(gender);
      console.log(type);
      wx.navigateTo({
        url: '/pages/classDetail/classDetail?gender='+gender+"&type="+type
      })
    },
    tapName: function(event){
      console.log(event)
    }
  },

  created: function(){
  },

  ready: function(){
  }
})
