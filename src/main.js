import Vue from "vue"
import App from "./App"
import router from "./router/index"
import store from "./store"

import FastClick from "fastclick" //fastclick减少点击延迟
import VueLazyLoad from "vue-lazyload" //图片懒加载

import toast from "./components/common/toast"

Vue.config.productionTip = false

/* 添加事件总线对象 默认情况下$bus是没有值的，所以这里需要给它赋值一个Vue实例 */
Vue.prototype.$bus = new Vue()

//安装toast插件
Vue.use(toast) //.fastclick减少点击延迟
Vue.use(VueLazyLoad, {
        loading: require('./assets/img/common/placeholder.png')
    }) //图片懒加载  

//解决移动端300ms的延迟
FastClick.attach(document.body) //.fastclick减少点击延迟


new Vue({
    el: "#app",
    router,
    store,
    FastClick,
    render: h => h(App)
})








//继承 -> 给类减少重复代码
// class Animal {
//     run() {}
// }

// class Person extends Animal {
//     //里面就不用写run()，也可以调用，这就是继承
// }

// class Dog extends Animal {
//     //里面就不用写run()，也可以调用，这就是继承
// }