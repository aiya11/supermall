<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button 
      :is-checked="isSelectAll" 
      class="check-button"
      @click.native="checkClick"/>
      <div>全选</div>
    </div>

    <div class="price">
      合计:{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算:({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "components/contents/checkButton/CheckButton"

import {mapGetters} from "vuex"

export default {
name:"CartBottomBar",
components:{
  CheckButton
},
computed:{//合计
  ...mapGetters(['cartList']),
  totalPrice(){
    return '￥'+this.cartList.filter(item =>{
      return item.checked
    }).reduce((preValue,item) =>{
      return preValue+item.price*item.count
    },0).toFixed(2)
  },
  checkLength(){
  return this.cartList.filter(item=>item.checked).length
  },
  isSelectAll(){//全选代码
    //方式一 使用filter
    // if(this.cartList.length === 0) return false  -> 这个是必须加上的
    // return !this.cartList.filter(item => !item.checked).length
    //方式二 使用find
    // if(this.cartList.length === 0) return false
    // return !this.cartList.find(item=>!item.checked )//find->查找某个元素就直接返回  (item=>!item.checked)->查找不选中的
    //方式三 普通遍历
     if(this.cartList.length === 0) return false
     for(let item of this.cartList){
       if(!item.checked){
         return false
       }
     }
     return true
  }
},
methods:{
  checkClick(){
    if(this.isSelectAll){//全部选中变成全部不选中
      this.cartList.forEach(item =>item.checked = false)
    }else{//未选中变成全部选中
      this.cartList.forEach(item =>item.checked = true)
    }
  },
  calcClick(){
    if(!this.isSelectAll){
      this.$toast.show('请选择购买的商品',2000)
    }
  }
}
}
</script>

<style scoped>
.bottom-bar{
  position:relative;
  display:flex;

  height:40px;
  line-height: 40px;
  
  background-color:#eee;
}
.check-content{
  display: flex;
  align-items:center;
  margin-left:6px;

}
.check-button{
width:20px;
height:20px;
line-height: 20px;
margin-right:3px;
}
.price{
  margin-left:25px;
  flex:1
}
.calculate{
  text-align:center;
  width:90px;
  background-color:red;
  color:#fff
}
</style>