<template>
<!-- ref -> 明确的拿到某一个组件 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"

export default {
name:"Scroll",
props:{
  probeType:{
    type:Number,//类型
    default:0//默认
  },
  
  pullUpLoad:{
    type:Boolean,
    defailt:false
  }

},
data(){
  return{
    scroll:null
  }
},

mounted(){
  //1.创建BScroll对象
  this.scroll=new BScroll(this.$refs.wrapper,{
    click:true,
    probeType:this.probeType,
    pullUpLoad:this.pullUpLoad,
  })
  
  //2.监听滚动位置
if(this.probeType ===2||this.probeType===3){
  this.scroll.on("scroll",(position)=>{
  this.$emit("scroll",position)//传出去
})
}

/* console.log(this.scroll.scrollerHeight) *///可滚动的高度


  //监听scroll滚动到底部
  if(this.pullUpLoad){
    this.scroll.on("pullingUp",()=>{
      this.$emit("pullingUp")
    })
  }

  /* this.scroll.scrollTo(0,0) */
},

methods:{
  scrollTo(x, y, time=3000){
    this.scroll && this.scroll.scrollTo(x, y, time)
  },
  refresh(){//解决滚动区域的问题->防抖
    this.scroll &&  this.scroll.refresh()
  },
  finishPullUp(){
    this.scroll && this.scroll.finishPullUp()
  },
  getScrollY(){//这个不用也可以，这个的作用是当首页切换到分类之类别的页面时，返回时，页面会重新加载，切换时首页会被销毁，但是现在Better-Scroll好像更新了，切换页面不会销毁
    return this.scroll ? this.scroll.y : 0
  }
}
}
</script>

<style scoped>

</style>