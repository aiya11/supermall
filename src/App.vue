<template>
  <div id="app">
    <router-view></router-view>
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
