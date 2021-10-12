<template>
  <div v-if="Object.keys(goods).length !==0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
name:"DetailBaseInof",
props:{
   goods:{
     type:Object,
     default(){
       return {}
     }
   }
}
}
</script>

<style scoped>
.base-info{/* 
  margin-top:15px; *//* 
  padding:0 8px; *//* 
  color:#999; */
  border-bottom:5px solid #f2f5f8
}
.info-title{
  font-size:14px;
  padding:0 4px;
  margin:10px 0;
  line-height:20px;
}
.info-price{
  border-bottom:1px solid #ededed;
  padding: 0 4px 10px;
  display: flex;
}
.n-price{
  font-size:24px;
  color:#FF5777;
}
.o-price{
  font-size:12px;
  margin:10px 4px;
  text-decoration: line-through;
  color:#999999;
}
.discount{
  background-color: #FF5777;
  color:white;
  border-radius:100px;
  font-size:8px;
  margin-top:2px;
  padding: 0 5px;
  height:18px;
  text-align:center;
  line-height:18px;
}
.info-other{
  display:flex;
  font-size:12px;
  justify-content: space-between;
  color:#999999;
  padding:10px 4px;
  border-bottom: 1px solid #ededed;
}
.info-service{
  display:flex;
justify-content:space-between;
font-size:12px;
padding:10px 4px;
}
.info-service img{
  width:12px;height:12px;
  vertical-align: middle;
  margin-right: 4px;
  border-bottom: 4px solid #ededed;
}
</style>