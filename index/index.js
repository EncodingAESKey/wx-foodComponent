// pages/better1/scroll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品列表
    goods: [],
    // 左侧菜单展示第一个
    activeMenu: 0,
    // 右侧商品滚动ID
    currentScrollId: '',
    zindex: 0,
    oneShow: true,
    // 右侧商品列表每个item的高度集合
    heightArr: [],
    // 左侧菜单第一个的高度
    left_item_height: 0,
    leftTop: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://www.zhihuifanqiechaodan.com:6060/goods',
      // data: data,
      // header: header,
      method: 'GET',
      success: res => {
        let goods = res.data.data
        for (let i = 0; i < goods.length; i++) {
          goods[i].id = 'cp' + i
        }
        this.setData({
          goods: goods
        })
        // 保存右侧商品列表每个item的高度的数组
        let heightArr = []
        // 初始高度
        let initHeight = 0
        // select会选择第一个类目的盒子, 获取左侧菜单栏第一个菜单的高度
        wx.createSelectorQuery().select('.app-comp-menuNav-item').boundingClientRect().exec(res => {
          this.setData({
            left_item_height: res[0].height
          })
        });
        //selectAll会选择所要含有该类名的盒子, 获取右侧商品列表每个item的高度
        wx.createSelectorQuery().selectAll('.app-comp-menuList-item').boundingClientRect().exec(res => {
          // 保存右侧商品列表item的高度
          res[0].forEach((item) => {
            initHeight += item.height;
            heightArr.push(initHeight);
          })
          this.setData({
            heightArr: heightArr
          })
        })
      },
      fail: err => {
        console.log(err)
      },
    })
  },
  // 左侧菜单栏点击
  menuTap(e) {
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    this.setData({
      activeMenu: index,
      currentScrollId: id
    })
  },
  // 右侧商品列表滑动
  foodScroll(e) {
    var zindex = this.data.zindex;
    var oneShow = this.data.oneShow;
    // 商品滑动距离顶部的距离
    let scrollTop = e.detail.scrollTop;
    // 高度数据
    let scrollArr = this.data.heightArr;
    for (let i = 0; i < scrollArr.length; i++) {
      if (scrollTop >= 0 && scrollTop < scrollArr[0]) {
        if (oneShow) {
          console.log('==============aaa' + scrollTop + "==" + scrollArr[0]);
          this.setData({
            activeMenu: 0,
            leftTop: 0,
            zindex: 0,
            oneShow: false
          })
          return
        }
      } else
        if (scrollTop >= (scrollArr[i - 1]) && scrollTop < scrollArr[i]) {
          if (i != zindex) {
            console.log('==============bbb' + i + scrollTop + "==" + scrollArr[i]);
            this.setData({
              oneShow: true,
              zindex: i,
              activeMenu: i,
              leftTop: i * this.data.left_item_height
            })

          }

        }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

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