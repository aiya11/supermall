<template>
  <div v-if="Object.keys(detailInfo).length !==0" >
    <div class="info-text-wrap">
      <div class="text-top-style"></div>
      <div class="desc info-text-desc">{{detailInfo.desc}}</div>
      <div class="text-bot-style"></div>
    </div>

    <div class="img-list-wrap" v-for="(item,index) in detailInfo.detailImage" :key="index">
      <div class="desc">{{item.key}}</div>
      <div v-for="(item,index) in item.list" :key="index" >
        <img :src="item" class="img" @load="imgLoad" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
name:"DetailGoodsInfo",
props:{
  detailInfo:{
    type:Object,
    default(){
    return {}
  }
  }
},
data(){
  return{
    counter:0,
    imagesLength:0
  }
},
methods:{
  //方式一 
  // imgLoad(){
  //   this.$emit("imageLoad") //单独用这个也可以，但是会加重浏览器的负担
  // }
/* 方式二
判断，所有图片都加载完了，那么进行一次回调就可以了；方式一是加载一个图片，就回调一次
用方式二会报错，不知道怎么回事，找到原因了，这个写错了 -> this.imagesLength = this.detailInfo.detailImath[0].list.length
*/
  imgLoad(){
    if(++this.counter === this.imagesLength){//括号里的意思是，当图片都加载完了之后，(为true进去)才来这里调用
      this.$emit("imageLoad")
    }
  }
},
watch:{//用watch监听图片是否加载完成和图片的长度(length)/ 获取图片的个数
  detailInfo(){
    this.imagesLength = this.detailInfo.detailImage[0].list.length
  }
 }
}
</script>

<style scoped>
.info-text-wrap{
  position:relative;
}
.text-top-style{
width:60px;
height:1px;
background-color:#333;
margin-left:4px;
}
.text-top-style::before{
position:absolute;
left:4px;
top:-2px;
display: block;
content:'';
width:5px;
height:5px;
background-color:#333;
}
.text-bot-style{
width: 60px;
height:1px;
background-color:#333;
position:absolute;
right:4px;
bottom:0
}
.text-bot-style::after{
position:absolute;
right:0;
top:-2.5px;
display:block;
content:'';
width:5px;
height:5px;
background-color:#333
}
.info-text-desc{
padding:10px 4px;
}
.desc{
font-size:14px;
padding-bottom:6px;
line-height:20px;
margin:4px 0;
text-indent:10px;
}
.img{
width:100%
}
</style>