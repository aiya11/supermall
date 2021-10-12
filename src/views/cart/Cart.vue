<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <!-- <scroll ref="scroll"> -->
      <cart-list></cart-list>
    <!-- </scroll> -->
    <!-- 底部汇总 -->
    <cart-bottom-bar/>

  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import CartList from "./childComps/CartList.vue"
import CartBottomBar from "./childComps/CartBottomBar"
/* import Scroll from "components/common/scroll/Scroll" */

import {mapGetters} from "vuex"

export default {
name:"Cart",
components:{
  NavBar,
  CartList,
  CartBottomBar,
  /* Scroll */
},
computed:{
  // cartLength(){//这个太繁琐了，需要去vuex里在创建一个getters文件，想办法getters里的可以直接拿过来用，就用vuex中的mapGetters
  //   return this.$store.getters.cartLength
  // }
  //两种语法 ->对上面的优化
  //...mapGetters(['cartLength','cartList'])
  ...mapGetters({
    length:'cartLength',
    cart:'cartList'
  })

},

/* activated () {
      this.$refs.scroll.refresh()
    }, */
}
</script>

<style scoped>
.cart{
  height:100vh;
  background-color:white;
}
  .nav-bar{
    background-color:var(--color-tint);
    color:#fff;
  }
</style>