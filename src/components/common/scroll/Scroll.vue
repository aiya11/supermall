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
    default:false
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
this.scroll.on("scroll",(position)=>{
  this.$emit("scroll",position)//传出去
})

  //3.监听上拉事件
this.scroll.on("pullingUp",() =>{
  this.$emit("pullingUp")
})

  /* this.scroll.scrollTo(0,0) */
},

methods:{
  scrollTo(x, y, time=3000){
    this.scroll.scrollTo(x, y, time)
  },
  finishPullUp(){
    this.scroll.finishPullUp()
  }
}
}
</script>

<style scoped>

</style>