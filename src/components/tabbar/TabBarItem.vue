<template>
       <div class="tab-bar-item" @click="itemClick">
         <!-- 所有的item都展示同一个图片和文字 -->
         <!-- <img src="../../assets/img/tabbar/shouyeyuan.png" alt="">
         <div>首页</div> -->

         <div v-if="!isActive"><slot name="item-icon"></slot></div>
         <div v-else><slot name="item-icon-active"></slot></div>
         <!-- <div :class="{active:isActive}"><slot name="item-text"></slot></div> -->
         <div :style="activeStyle"><slot name="item-text"></slot></div>
         </div>
</template>

<script>
export default {
name:"TabBarItem",
props:{
  path:String,
  activeColor:{
    type:String,
    default:"red"
  }
},
data(){
  return{
    /* isActive:true, */
  }
},
computed:{
  isActive(){
    // /home -> item(/home) =true
    // /home -> item(/category) =false
    // /home -> item(/cart) =false
    // /home -> item(/profile) =false
    return this.$route.path.indexOf(this.path) !==  -1
  },
  activeStyle(){
    return this.isActive ? {color:this.activeColor} : {}
  }
},
methods:{
  itemClick(){
    //this.$router.replace(this.path) 单独这样的话点击多次会报错
    //this.$router.replace(this.path).catch(()=>{}) 跟下边效果一样
    this.$router.replace(this.path).catch((err)=>{err})
  }
}
}
</script>

<style>

.tab-bar-item {
    /* 水平平分 */
    flex: 1;
    /* 居中显示 */
    text-align: center;
    /* 开发高度 */
    height: 49px;
    font-size:14px;
}

.tab-bar-item img{
  width:24px;
  height:24px;
  margin-top:3px;
  vertical-align:middle;
  margin-bottom: 2px;
}

/* .active{
  color:red
} */
</style>