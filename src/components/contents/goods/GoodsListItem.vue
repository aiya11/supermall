<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad"><!-- @load="imageLoad"监听每一张图片加载 -->
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
name:"GoodsListItem",
props:{
  goodsItem:{
    type:Object,
    default(){
      return {}
    }
  }
},
computed:{
  showImage(){
    return this.goodsItem.image || this.goodsItem.show.img
  }
},
methods:{
  imageLoad(){//这里是通过事件总线发出去的，在Home.vue中就可以拿到了 /* 默认情况下$bus是没有值的，所以这里需要给它赋值一个Vue实例，在main.js中赋值 */
    this.$bus.$emit("itemImageLoad")

  //问题：这个事件总线是传到Home.vue里，但是现在Detail.vue也在用，就需要修改一下
  //方式一 用路由的方式  -> 这个有问题
  // if(this.$router.path.indexOf('/home') !=-1){
  //   this.$bus.$emit("homeItemImageLoad")
  // }else if(this.$router.path.indexOf('detail')!=-1){
  //   this.$bus.$emit('detailItemImageLoad')
  // }
  },
  itemClick(){
    this.$router.push("/detail/" + this.goodsItem.iid)
  }
}
}
</script>

<style>
.goods-item{
  padding-bottom:40px;
  position:relative;
  width:48%;
}

.goods-item img{
  width: 100%;
  border-radius:5px
}

.goods-info{
  font-size:12px;
  position:absolute;
  bottom:5px;
  left:0;
  right:0;
  overflow:hidden;
  text-align:center
}
.goods-info p{
  overflow:hidden;
  text-overflow:ellipsis;/* 超出(剪切之后)的文字显示... */
  white-space:nowrap;
  margin-bottom:3px;
}
.goods-info .price{
  color:var(--color-high-text);
  margin-right:20px;
}
.goods-info .collect{
  position:relative;
}
.goods-info .collect:before{
  content:'';
  position:absolute;
  left:-15px;
  top:-1px;
  width:14px;
  height:14px;
  background:url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>