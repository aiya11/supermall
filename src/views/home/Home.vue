<template>
  <div id="home">
    <nav-bar class="home-nav-bar"><div slot="center">购物街</div></nav-bar>
      <tab-control :titles="['流行','新款','精选']" 
                    @tabClick="tabClick"
                    ref="tabControl1" 
                    class="tab-control"
                    v-show="isTabFixed"/>
   <scroll class="content" 
           ref="scroll" 
           :probe-type="3" 
           @scroll="contentScroll"
           :pull-up-load="true"
           @pullingUp="loadMore"
          >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']" 
                    @tabClick="tabClick"
                    ref="tabControl2"/>
      <good-list :goods="showGoods"/>
   </scroll>

   <!-- 组件是不能直接监听点击的 -->
   <back-top @click.native="backClick" v-show="isShowBackTop"/><!-- nactiv监听组件点击 -->

  </div>
</template>

<script>

import HomeSwiper from "./childComps/HomeSwiper.vue"
import RecommendView from "./childComps/RecommendView.vue"
import FeatureView from "./childComps/FeatureView.vue"

import NavBar from "components/common/navbar/NavBar.vue"
import TabControl from "components/contents/tabControl/TabControl"
import GoodList from "components/contents/goods/GoodsList.vue"
import Scroll from "components/common/scroll/Scroll"/* 
import BackTop from "components/contents/backTop/BackTop" */

import {getHomeMultidata,getHomeGoods} from 'network/home'
// import {debounce} from "common/utils"
import {itemListenerMixin,backTopMixin} from "common/mixin"



export default {
name:"Home",
components:{
  HomeSwiper,
  RecommendView,
  FeatureView,
 
  NavBar,
  TabControl,
  GoodList,
  Scroll,
  /* BackTop, */
  
},
mixins:[itemListenerMixin,backTopMixin],
data(){
return{
  banners:[],
  recommends:[],
  goods:{
    'pop':{page:0,list:[]},
    'new':{page:0,list:[]},
    'sell':{page:0,list:[]},
  },
  currentType:"pop",/* 
  isShowBackTop:false, */
  tabOffsetTop:0,
  isTabFixed:false,
  saveY:0, /* 这个不用也可以，Better-Scroll更新了 */
  // itemImageListener:null //->这个写在混入中了
}
},
computed:{
  showGoods(){
    return this.goods[this.currentType].list
  }
},


//Better-Scroll更新了，这不用也可以返回离开位置的页面
//activated、deactivated不用也可以,还是要用，有其它用处
// destroyed(){  //可以查看是否被销毁
//   console.log("aaa")
// },
/*当页面活跃执行函数*/
activated(){//
  this.$refs.scroll.scrollTo(0,this.saveY,0)
  // this.$refs.scroll.refresh()-> 下面的是mixin.js文件里
  this.refresh()
},
/*不活跃页面执行函数*/
deactivated(){//这个是有缓存才可以调用这个
  //1.保存Y值
   this.saveY = this.$refs.scroll.getScrollY()
   //console.log(this.saveY)//可以记录下滑到什么位置了

   //2.取消全局事件的监听
   this.$bus.$off('itemImageLoad',this.itemImageListener)
},


// 组件创建完成之后，立即发送网络请求,通过生命周期函数发送
created(){//生命周期函数
//1.请求多个数据
this.getHomeMultidata()

//2.请求商品数据
this.getHomeGoods('pop')
this.getHomeGoods('new')
this.getHomeGoods('sell')

},
mounted(){
//写在混入/mixin.js文件中了，类似于公共的
//   //1.监听item中图片加载完成
// const refresh=debounce(this.$refs.scroll.refresh,500)
// /* 默认情况下$bus是没有值的，所以这里需要给它在main.js中赋值一个Vue实例 */

// //对监听的事件进行保存
// //这里主要是拿到itemImageListener，方便上面在deactivated中取消掉
// //主要是Detail.vue页面调用GoodsList.vue页面时，也会刷新Home.vue的页面，这里这样设置之后，当Detail.vue在调用之后，Home.vue就不会调用，因为它被取消掉了
// this.itemImageListener=()=>{
//   refresh()
// }

// this.$bus.$on('itemImageLoad',this.itemImageListener)

//以前的
// this.$bus.$on("itemImageLoad",()=>{
//  refresh()
// })

  
  
},

methods:{
  /* 事件监听相关的方法 */

// debounce(func,delay){
//   let timer=null
//   return function(...args){
//     if (timer)clearTimeout(timer)
//     timer=setTimeout(()=>{
//       func.apply(this,args)
//     },delay)
//   }
// },

tabClick(index){
  switch(index){
    case 0:
      this.currentType='pop'
      break
    case 1:
      this.currentType='new'
      break
    case 2:
      this.currentType='sell'
      break
  }
  this.$refs.tabControl1.currentIndex = index;
  this.$refs.tabControl2.currentIndex = index;
},

/* backClick(){
this.$refs.scroll.scrollTo(0,0,1000)
}, */

contentScroll(position){
  //1.判断BackTop是否显示
 /* this.isShowBackTop = -position.y > 1000 */
 this.listenShowBackTop(position)

 //2.决定tabControl是否吸顶(position:fixed)
 this.isTabFixed=(-position.y)>this.tabOffsetTop
},

//这里是上拉加载更多，但是只加载一次，需要去getHomeGoods里设置一个参数
loadMore(){
  this.getHomeGoods(this.currentType)
},

  //获取tabControl的offsetTop
  //所有的组件都有一个属性$el:用于获取组件中的元素
swiperImageLoad(){
 this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
},

  /* 网络请求相关的方法 */
  getHomeMultidata(){
getHomeMultidata().then(res=>{
  this.banners=res.data.banner.list;
  this.recommends=res.data.recommend.list
})
},
getHomeGoods(type){
  const page=this.goods[type].page + 1
  getHomeGoods(type , page).then(res => {
    this.goods[type].list.push(...res.data.list)
    this.goods[type].page += 1


    //完成上拉加载更多，可以上拉加载多次
    this.$refs.scroll.finishPullUp()
  })
},
}
}
</script>

<style scoped>/* 不加scoped的话，要是class名字有重复，会都生效 */
#home{
  position:relative;
  height:100vh;/* vh：viewport height 视口高，不是正真的高，而是屏幕可视高  意思是100%的视口 50vh ->50%*/
}

.home-nav-bar{
background-color: var(--color-tint);
color:#fff;

/* 没有用的，是在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
/* position: fixed;
left:0;
right: 0;
top:0;
z-index: 9; */
}


/* 方式一 */
.content{/* 
  height:300px; */
  overflow: hidden;
  position: absolute;
  top:44px;
  bottom:49px;
  left:0;
  right:0;
}

.tab-control{
  position: relative;
  z-index:9;/* 要想z-index生效，需要设置定位 */
}

/* 不要的 */
/* .fixed{
  position:fixed;
  left:0;
  right:0;
  top:44px;
} */

/* 方式二 */
/* .content{
  height:calc(100% - 93px);
} */
</style>