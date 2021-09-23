<template>
  <div id="home">
    <nav-bar class="home-nav-bar"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"/>
    <good-list :goods="showGoods"/>

    <ul>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
    </ul>
  </div>
</template>

<script>

import HomeSwiper from "./childComps/HomeSwiper.vue"
import RecommendView from "./childComps/RecommendView.vue"
import FeatureView from "./childComps/FeatureView.vue"

import NavBar from "components/common/navbar/NavBar.vue"
import TabControl from "components/contents/tabControl/TabControl"
import GoodList from "components/contents/goods/GoodsList.vue"

import {getHomeMultidata,getHomeGoods} from 'network/home'



export default {
name:"Home",
components:{
  HomeSwiper,
  RecommendView,
  FeatureView,
 
 NavBar,
 TabControl,
 GoodList,
},
data(){
return{
  banners:[],
  recommends:[],
  goods:{
    'pop':{page:0,list:[]},
    'new':{page:0,list:[]},
    'sell':{page:0,list:[]},
  },
  currentType:"pop"
}
},
computed:{
  showGoods(){
    return this.goods[this.currentType].list
  }
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
methods:{
  /* 事件监听相关的方法 */
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
  }
},

  /* 网络请求相关的方法 */
  getHomeMultidata(){
getHomeMultidata().then(res=>{
  // console.log(res);
  this.banners=res.data.banner.list;
  this.recommends=res.data.recommend.list
})
},
getHomeGoods(type){
  const page=this.goods[type].page + 1
  getHomeGoods(type , page).then(res => {
    this.goods[type].list.push(...res.data.list)
    this.goods[type].page += 1
  })
},
}
}
</script>

<style scoped>
#home{
  padding-top: 44px;
  
}

.home-nav-bar{
background-color: var(--color-tint);
color:#fff;

position: fixed;
left:0;
right: 0;
top:0;
z-index: 9;
}

.tab-control{
  position:sticky;
  top:44px;
  z-index:9
}
</style>