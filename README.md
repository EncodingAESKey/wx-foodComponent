 ## 小程序商品菜单， 实现左右联动
> 简易餐饮系统根据不同需求，样式稍加更改即可直接使用

> 在小程序中，我们经常需要一个功能，就是点击左边的列表选项，右边对应的内容滚动，而滑动右边的内容，左边对应的改变状态及位置，特别是商城站基本都涉及到，那么我们该怎么实现呢，这里我们就需要用到小程序的scroll-view这个组件；

## 实现原理
- 设置scroll-view组件的scroll-top属性，scroll-into-view属性
- 通过 wx.createSelectorQuery().select('类名').boundingClientRect().exec(res => {console.log(res)}); 
select选择第一个类目的盒子, 获取左侧菜单栏第一个菜单的高度
- 通过 wx.createSelectorQuery().selectAll('.app-comp-menuList-item').boundingClientRect().exec(res => {console.log(res)})
selectAll会选择所要含有该类名的盒子, 获取右侧商品列表每个item的高度

## 点击左侧，右侧商品滑动到相依位置
利用scroll-view的属性scroll-into-view="",当我们点击左侧列表子项时，就把子项的id赋值给右侧scroll-view的croll-into-view属性，并且右侧商品列表每一项需要设置id且值为对应右侧菜单的id,就可以实现点击左侧，右侧滚动了，

## 滑动右侧，左侧高亮且滚动到可见区域
思路是：scroll-view 有监听事件bindscroll,我们在监听事件里监听右侧内容滚动的高度，进而判断当前是属于那一块区域。在bindscroll事件里我们可以直接得到scrollTop当前滚动的高度，但是我怎么判断这个高度输入第几类商品呢，这个就需要得到右侧每一类商品的高度，然而每一类商品的高度不是写死的，由数据渲染的，有的数据多一点，高度就多一点，通过小程序的另一个api wx.createSelectorQuery()获取

## 注意
* 右侧第一个商品开始设oneShow=true,当它执行一次的时候就赋值为false,所以在第一类商品高度区域内只执行一次，如果到达第二类以上，就让oneShow=true回来，这样回滚的时候它又能执行
* 右侧第一个商品以后，设置初始值zindex=0;如果不等于当前i值就让它执行，然后让它=i;第二次及而二次以上就不再执行，当它=i+1时又执行一次，然后在这个阶段就不再执行，以此类推

## 效果图
![](https://github.com/zhihuifanqiechaodan/gif-demo/blob/master/gif/food.gif)
