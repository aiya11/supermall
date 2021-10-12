<template>
  <div class="bottom-bar">
    <div class="bar-item bar-let">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
name:"DetailBottomBar",
methods:{
  addToCart(){
    this.$emit('addCart')
  }
}
}
</script>

<style>
.bottom-bar{
  height:52px;
  
  /* 方式一 */
  position:relative;
  /* z-index:999; */
  /* 方式二 */
  /* position:fixed;
  left:0;
  right:0;
  bottom:0; */
  text-align: center;
  display:flex;
  background-color: #fff;
  
}
.bar-item {
  display:flex;
  flex:1;
}
.bar-item>div{
  flex: 1;
}
.bar-let{
  margin-top:5px;
}
.bar-let  .icon{
  display: block;
  width:22px;
  height:22px;
  margin:0 auto 3px;
  background:url('~assets/img/detail/detail_bottom.png') 0 0/100%;
  
}
.bar-let  .text{
  font-size: 12px;
}
.bar-let .service{
  background-position:0 -52px;
}
.bar-let .shop{
  background-position: 0 -98px;
}
.bar-right{
  line-height:52px;
}
.cart{
  background-color:yellow;
  font-size:15px;
}
.buy{
  background-color:#ff6699;
  color:white;
}
</style>