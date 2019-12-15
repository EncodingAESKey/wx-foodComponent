// component/bottom-dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 当前点击菜品的信息
    foodDetail: {
      type: Object,
      value: {},
      observers: (newVal, oldVal) => {
        console.log(newVal)
        console.log(oldVal)
      }
    },
    // 当前点击菜品的口味
    tasteList: {
      type: Array,
      value: [],
      observers: (newVal, oldVal) => {
        console.log(newVal)
        console.log(oldVal)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hideModal: true, //模态框的状态  true-隐藏  false-显示
    animationData: {},
    activeTaste: 0 // 默认选中第一个口味
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 显示遮罩层
    showModal: function() {
      var that = this;
      that.setData({
        hideModal: false,
        activeTaste: 0
      })
      var animation = wx.createAnimation({
        duration: 400, //动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
        timingFunction: 'ease', //动画的效果 默认值是linear
      })
      this.animation = animation
      setTimeout(function() {
        that.fadeIn(); //调用显示动画
      }, 200)
    },

    // 隐藏遮罩层
    hideModal: function() {
      var that = this;
      var animation = wx.createAnimation({
        duration: 400, //动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
        timingFunction: 'ease', //动画的效果 默认值是linear
      })
      this.animation = animation
      that.fadeDown(); //调用隐藏动画   
      setTimeout(function() {
        that.setData({
          hideModal: true
        })
      }, 0) //先执行下滑动画，再隐藏模块

    },

    //动画集
    fadeIn: function() {
      this.animation.translateY(0).step()
      this.setData({
        animationData: this.animation.export() //动画实例的export方法导出动画数据传递给组件的animation属性
      })
    },
    fadeDown: function() {
      this.animation.translateY(700).step()
      this.setData({
        animationData: this.animation.export(),
      })
    },
    // 口味选择
    tasteTap(e) {
      console.log(e)
      var index = e.currentTarget.dataset.index;
      this.setData({
        activeTaste: index
      })
    },
    comfirmTastes() {
      // 重组菜品信息
      let data = {
        food: this.data.foodDetail,
        taste: this.data.tasteList[this.data.activeTaste]
      }
      // 将菜品信息传递给父组件
      this.triggerEvent('comfirmTastes', data)
      // 关闭口味dialog
      this.hideModal()
    }
  }
})