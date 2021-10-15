<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
       <detail-swiper :top-images="topImages"/>
       <detail-base-info :goods="goods"/>
       <detail-shop-info :shop="shop" />
       <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
       <detail-param-info ref="params" :param-info="paramInfo"/>
       <detail-comment-info ref="comment" :comment-info="commentInfo"/>
       <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <!-- <toast :message="message" :show="show"/> -->


   
  
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar"
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailShopInfo from "./childComps/DetailShopInfo"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailCommentInfo from "./childComps/DetailCommentInfo"
import DetailBottomBar from "./childComps/DeatilBottomBar"

import Scroll from "components/common/scroll/Scroll"
import GoodsList from "../../components/contents/goods/GoodsList.vue"
/* import BackTop from "components/contents/backTop/BackTop" 抽到混入里面去了 */
/* import Toast from "components/common/toast/Toast" */

import {getDetail ,Goods,Shop,GoodsParam,getRecommend} from "network/detail"
import {debounce} from "common/utils"
import {itemListenerMixin,backTopMixin} from "common/mixin"
import {mapActions} from "vuex"

export default {
name:"Detail",
components:{
  DetailNavBar,
  DetailSwiper,
  DetailBaseInfo,
  DetailShopInfo,
  DetailGoodsInfo,
  DetailParamInfo,
  DetailCommentInfo,
  DetailBottomBar,
  Scroll,
  GoodsList,
  /* Toast, */
  /* BackTop,抽到混入里面去了 */
  
},
mixins:[itemListenerMixin,backTopMixin],
data(){
  return{
    iid:null,
    topImages:[],
    goods:{},
    shop:{},
    detailInfo:{},
    paramInfo:{},
    commentInfo:{},
    recommends:[],
    themeTopYs:[],
    getThemeTopY:null,
    currentIndex:0,
    /* message:"",
    show:false, */
    /* isShowBackTop:false,  抽到混入里面去了*/
    //itemImageListener:null,// ->这个写在混入中了
  }
},
created(){
  //1.保存传入的iid
  this.iid = this.$route.params.iid

  //2.根据iid请求详情数据
  getDetail(this.iid).then(res=>{
    //1.获取顶部的图片轮播图数据  -> 对应的是子组件DetailSwiper.vue
    console.log(res)
    const data = res.result;
    this.topImages = data.itemInfo.topImages

    //2.获取商品信息  -> 对应的是子组件DetailBaseInfo.vue
    this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

    //3.创建店铺信息的对象
    this.shop = new Shop(data.shopInfo)

    //4.保存的商品的详情数据
    this.detailInfo = data.detailInfo

    //5.获取参数的信息
    this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      // this.itemParams=data.itemParams
    //6.取出评论的信息
    if(data.rate.cRate !== 0){
      this.commentInfo = data.rate.list[0]
    }


  //1.第一次获取，值不对
  //值不对的原因:this.$refs.params.$el压根没有渲染
    // this.themeTopYs=[]
    // this.themeTopYs.push(0)
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    // console.log(this.themeTopYs)

  //详情页跳转方式一 -> 推荐这个
  //  this.$nextTick(()=>{//$nextTick表示当数据全部出来，就会来回调一次，但是图片还未加载完
  //  //2.第二次获取: 值不对
  //  //值不对的原因: 图片没有计算在内
  //   //根据最新的数据，对应的DOM已经渲染出来了，但图片没有被渲染
  //   //但是图片依然没有加载完(目前获取到offsetTop不包含其中的图片)
  //   //offsetTop值不对的时候，都是因为图片的问题
  //   this.themeTopYs=[]
  //   this.themeTopYs.push(0)
  //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
  //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
  //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
  //   console.log(this.themeTopYs)
  //  })
  
     
  })

  //3.请求推荐数据
  getRecommend().then(res => {
    this.recommends = res.data.list
  })

  //4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
  //第四次获取 -> 标题与内容的联动效果
  this.getThemeTopY = debounce(() => {
    
    this.themeTopYs=[]
    this.themeTopYs.push(0)
    this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    this.themeTopYs.push(Number.MAX_VALUE)//这个值是contentScroll里要用的
    //console.log(this.themeTopYs)
  },50)
},

methods:{
  ...mapActions(['addCart']),
  imageLoad(){
     //this.$refs.scroll.refresh()
     this.refresh()

    //调用生命周期内的 ->解决刷新过于频繁
     this.getThemeTopY()

     //第三次获取，值对，但是刷新过于频繁
     //在created()生命周期函数中优化
    // this.themeTopYs=[]
    // this.themeTopYs.push(0)
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    // console.log(this.themeTopYs)
  },

  titleClick(index){
    this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
  },

  contentScroll(position){
   //1.获取y值
   const positoinY = -position.y

   //2.positionY和主题中值进行对比
   //[0,7938,9120,9452,Number.MAX_VALUE]
   //positionY 在 0 和 7938 之间，index = 0
   //positionY 在 7938 和 9120 之间，index = 1
   //positionY 在 9120 和 9542 之间，index = 2
   //positionY 超过 9542 值，index = 3/在 9542 和 非常大的值 之间  设置有一个最大的值
   let length = this.themeTopYs.length
    for(let i = 0;i < length-1; i++) {
    //  console.log(i);//str 3+1 =31 错误做法
    //  if(positionY >this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
    //    console.log(i)
    //  }

    //hack做法 ->推荐这个 需要去getThemeTopY里加一个数据
      if(this.currentIndex !==i && (positoinY >= this.themeTopYs[i] && positoinY < this.themeTopYs[i+1])){
      this.currentIndex = i;
      this.$refs.nav.currentIndex = this.currentIndex
      }
      //普通做法
      // if(this.currentIndex !== i && ((i<length - 1 && positoinY >= this.themeTopYs[i] && positoinY < this.themeTopYs[i+1])||(i===length - 1 && positoinY >= this.themeTopYs[i]))){
      //   this.currentIndex = i;
      //   this.$refs.nav.currentIndex = this.currentIndex
      // }

      //1.判断BackTop是否显示
      /* this.isShowBackTop = -position.y > 1000  这个也抽到混入里去了。但要下面来导入，并传入position*/
      
    }
    this.listenShowBackTop(position)
  },

    /* backClick(){
  this.$refs.scroll.scrollTo(0,0,1000)
  }, 抽到混入里去了*/

  addToCart(){
    //1.获取购物车需要展示的信息
     const product = {}
          product.image = this.topImages[0];
          product.title = this.goods.title;
          product.desc = this.goods.desc;
          product.price = this.goods.realPrice;
          product.iid = this.iid; //-> 这个必须传，作为商品的标识

    //2.将商品添加到购物车内 (1.Promise,2.mapActions) -> 用vuex  
    //this.$store.cartList.push(product)
    //this.$store.commit('addCart',product)

    this.addCart(product).then(res =>{
      // this.show = true;
      // this.message = res;

      // setTimeout(()=>{
      //   this.show = false;
      //   this.message = ''
      // },1500)

      //console.log(this.$toast)
      // this.$toast.show(res,2000)
      this.$toast.show(res)
      //this.$toast.show()
    })
    //上面是简洁的写法 ->效果
    // this.$store.dispatch('addCart',product).then(res=>{
    //   console.log(res)//重要
    // })
  }
},

mounted(){
  ////写在混入/mixin.js文件中了，类似于公共的
  // const refresh=debounce(this.$refs.scroll.refresh,500)
  // this.itemImageListener =()=>{
  //   refresh()
  // }
  // //这里是GoodsListItem.vue里的
  // this.$bus.$on("itemImageLoad",()=>{
  //   refresh()
  // })

  //详情页跳转方式一 -> 不能写在这里
  // this.themeTopYs.push(0)
  // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
  // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
  // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
  // console.log(this.themeTopYs)

},

destroyed(){
  this.$bus.$off('itemImageLoad',this.itemImageListener)
},

//详情页跳转方式一 ->这个更新太频繁了
// updated(){
//   this.themeTopYs=[]
//  this.themeTopYs.push(0)
//   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
//   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
//   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
//   console.log(this.themeTopYs)
// }
}
</script>

<style scoped>
#detail{
  position:relative;
  z-index: 9;
  background-color:#fff;
  height:100vh;
}
.detail-nav{
  position:relative;
  z-index:9;
  background-color:#fff;
}
.content{
  height:calc(100% - 96px);/* 设置这个属性，父元素必须有高，如 #detail里的height:100vh vh表示视口高度，这就是100%视口高度*/
}
</style>