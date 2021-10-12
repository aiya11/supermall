import {
    ADD_COUNTER,
    ADD_TO_CART
} from "./mutation-type"

export default {
    //这里面可以被跟踪
    //mutations唯一的目的就是修改state中状态
    //mutations中的每一个方法尽可能完成的事件比较单一

    /* addCart(state, payload) {  //->这个要写在actions里
          //payload新加载的商品
          //数组常用的方法? push/pop/unshift/shift/sort/severse/map/filter/reduce/join/...
          //方式一
          //     let oldProduct = null;
          //     for (let item of state.cartList) {
          //         if (item.iid === payload.iid) {
          //             oldProduct
          //         }
          //     }

          //     if (oldProduct) {
          //         oldProduct.count += 1
          //     } else {
          //         payload.count = 1
          //         state.cartList.push(payload)
          //     }

          //     state.cartList.push(payload)


          //方式二
          //查找之前数组中是否有该商品
          let oldProduct = state.cartList.find((item) => item.iid === payload.iid)

          //2.判断oldProduct
          if (oldProduct) {
              oldProduct.count += 1
          } else {
              payload.count = 1
              state.cartList.push(payload)
          }
      } */
    //放在这里主要是为了好监控
    [ADD_COUNTER](state, payload) {
        payload.count++
    },
    [ADD_TO_CART](state, payload) {
        payload.checked = true
        state.cartList.push(payload)
    }

}