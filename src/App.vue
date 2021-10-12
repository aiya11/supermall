<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tar-bar/>
  </div>
</template>

<script>
import MainTarBar from "./components/contents/mainTarBar/MainTarBar.vue"

export default{
  name:'App',
  components:{
    MainTarBar
  }
}

</script>

<style>
@import "./assets/css/base.css";
@import "./assets/css/normalize.css";
</style>
