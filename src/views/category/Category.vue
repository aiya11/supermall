<template>
 <div class="wrapper" ref="wrapper">
   <!-- 1.无论是否设置click:true,buttom都可以点击 -->
  <button @click="btnClick">按钮</button>

  <!-- 2.必须设置click:true, -->
  <div @click="divClick">按钮--</div>

   <ul class="content">
     <button @click="btnClick">按钮</button>
   <li>分类列表1</li>
   <li>分类列表2</li>
   <li>分类列表3</li>
   <li>分类列表4</li>
   <li>分类列表5</li>
   <li>分类列表6</li>
   <li>分类列表7</li>
   <li>分类列表8</li>
   <li>分类列表9</li>
   <li>分类列表10</li>
   <li>分类列表11</li>
   <li>分类列表12</li>
   <li>分类列表13</li>
   <li>分类列表14</li>
   <li>分类列表15</li>
   <li>分类列表16</li>
   <li>分类列表17</li>
   <li>分类列表18</li>
   <li>分类列表19</li>
   <li>分类列表20</li>
   <li>分类列表21</li>
   <li>分类列表22</li>
   <li>分类列表23</li>
   <li>分类列表24</li>
   <li>分类列表25</li>
   <li>分类列表26</li>
   <li>分类列表27</li>
   <li>分类列表28</li>
   <li>分类列表29</li>
   <li>分类列表30</li>
   <li>分类列表31</li>
   <li>分类列表32</li>
   <li>分类列表33</li>
   <li>分类列表34</li>
   <li>分类列表35</li>
   <li>分类列表36</li>
   <li>分类列表37</li>
   <li>分类列表38</li>
   <li>分类列表39</li>
   <li>分类列表40</li>
   <li>分类列表41</li>
   <li>分类列表42</li>
   <li>分类列表43</li>
   <li>分类列表44</li>
   <li>分类列表45</li>
   <li>分类列表46</li>
   <li>分类列表47</li>
   <li>分类列表48</li>
   <li>分类列表49</li>
   <li>分类列表50</li>
   <li>分类列表51</li>
   <li>分类列表52</li>
   <li>分类列表53</li>
   <li>分类列表54</li>
   <li>分类列表55</li>
   <li>分类列表56</li>
   <li>分类列表57</li>
   <li>分类列表58</li>
   <li>分类列表59</li>
   <li>分类列表60</li>
   <li>分类列表61</li>
   <li>分类列表62</li>
   <li>分类列表63</li>
   <li>分类列表64</li>
   <li>分类列表65</li>
   <li>分类列表66</li>
   <li>分类列表67</li>
   <li>分类列表68</li>
   <li>分类列表69</li>
   <li>分类列表70</li>
   <li>分类列表71</li>
   <li>分类列表72</li>
   <li>分类列表73</li>
   <li>分类列表74</li>
   <li>分类列表75</li>
   <li>分类列表76</li>
   <li>分类列表77</li>
   <li>分类列表78</li>
   <li>分类列表79</li>
   <li>分类列表80</li>
   <li>分类列表81</li>
   <li>分类列表82</li>
   <li>分类列表83</li>
   <li>分类列表84</li>
   <li>分类列表85</li>
   <li>分类列表86</li>
   <li>分类列表87</li>
   <li>分类列表88</li>
   <li>分类列表89</li>
   <li>分类列表90</li>
   <li>分类列表91</li>
   <li>分类列表92</li>
   <li>分类列表93</li>
   <li>分类列表94</li>
   <li>分类列表95</li>
   <li>分类列表96</li>
   <li>分类列表97</li>
   <li>分类列表98</li>
   <li>分类列表99</li>
   <li>分类列表100</li>
 </ul>
 </div>
</template>

<script>
import BScroll from "better-scroll"

export default {
name:"Category",
data(){
  return{
    scroll:null
  }
},
//组件创建完调用，当没有挂载的时候就不会生效
created(){},

//使滚动变得丝滑
mounted(){
//  this.scroll=new BScroll(document.querySelector('.wrapper'),{
//    probeType:1,
//    pullUpLoad:true,
//    click:true /* 这个，如果用按钮之类的可点击的标签来用就不用加click:true，但是要是用div之类的本身是不可以点击的，就需要加上click:true */
//  });

/* const bscroll = new BScroll(document.querySelector(".content"), {
            probeType: false, //想实时监听传入这个属性
            click: true, //想让内部可以点击，可以传入这个属性
            pullUpLoad: true, //想做上拉加载更多的时候传入这个属性  这个为true，下面调"pullingUp"才会生效

        }); */

this.scroll=new BScroll(this.$refs.wrapper,{
   probeType:3,
   click:true,
   pullUpLoad:true,
 });

 /* this.scroll.on("scroll",position=>{
   console.log(position)
 }); */

this.scroll.on("pullingUp",()=>{ 
  console.log("上拉加载更多")

  setTimeout(()=>{
    this.scroll.finishPullUp()
  },2000)
})
},
methods:{
  btnClick(){
      console.log("button可点击,不用加click:true")
  },
  divClick(){
    console.log("div可点击,必须加上click:true")
  }
}

}
</script>

<style scoped>
.wrapper{
  height:150px;
  background-color:aquamarine;

  overflow:hidden;
  /* overflow-y:scroll; 用这个在移动端滑动时非常卡顿*/
}
</style>