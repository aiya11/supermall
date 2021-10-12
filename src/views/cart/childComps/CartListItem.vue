<template>
  <div class="shop-item">
    <div class="item-selector">
      <CheckButton :is-checked="itemInfo.checked" @click.native="checkClick"/>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{itemInfo.price}}</div>
        <div class="item-count right">x{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
/* import CheckButton from "components/contents/checkbutton/CheckButton.vue" */
import CheckButton from '../../../components/contents/checkButton/CheckButton.vue';

export default {
name:"CartListItem",
components:{
  CheckButton
},
props:{
  itemInfo:{
    type:Object,
    default(){
      return {}
    }
  }
},
methods:{
 checkClick(){
   this.itemInfo.checked = !this.itemInfo.checked
 } 
}
}
</script>

<style scoped>
.shop-item{
  width:100%;
  display:flex;
  font-size:0;
  border-bottom:2px solid rgba(100,100,100,.2);
  padding:5px;
}
.item-selector{
  width:20px;
  display:flex;
  justify-content:center;
  align-items:center;
}
.item-img{
  padding:5px;
}
.item-img img{
  width:80px;
  height: 100px;;
  border-radius:5px;
  display:block
  }
.item-info{
  padding:5px 10px;
  overflow:hidden;
  font-size: 17px;
  position:relative
}
.item-desc ,.item-title{
  overflow:hidden;
  white-space:nowrap;
  text-overflow:elliPsis;
}
.item-info .item-desc{
  font-size:14px;
  color:#666;
  margin-top:15px;
}
.item-info .info-bottom{
  margin-top:10px;
  position:absolute;
  bottom:10px;
  left:10px;
  right:10px;
}
.item-info .info-bottom .item-price{
  color:var(--color-high-text);
  font-weight:bold;
}
.item-info .info-bottom .left{}
.item-info .info-bottom .item-count{}
.item-info .info-bottom .right{}
</style>





