<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"/>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll"//让内容可以滚动
import CartListItem from "./CartListItem"

import {mapGetters} from "vuex"


export default {
name:"CartList",
components:{
  Scroll,
  CartListItem
},
computed:{
  ...mapGetters(['cartList'])
},
activated(){
  this.$refs.scroll.refresh()
}
}
</script>

<style scoped>
.cart-list{
  /* 去掉鼠标滚动 1 */
  height:calc(100% - 44px - 49px - 40px);
  }
.content{
  /* 去掉鼠标滚动 2 */
  height:100%;
  /* 去掉鼠标滚动 3 */
  overflow:hidden
}
</style>