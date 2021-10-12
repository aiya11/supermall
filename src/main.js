import Vue from "vue"
import App from "./App"
import router from "./router/index"
import store from "./store"

Vue.config.productionTip = false

/* 默认情况下$bus是没有值的，所以这里需要给它赋值一个Vue实例 */
Vue.prototype.$bus = new Vue()

new Vue({
    el: "#app",
    router,
    store,
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