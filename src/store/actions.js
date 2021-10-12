import {
    ADD_COUNTER,
    ADD_TO_CART
} from "./mutation-type"

export default { //这里不可以被跟踪
    addCart(context, payload) {
        return new Promise((resolve, reject) => {

            //1.查找之前数组中是否有该商品
            let oldProduct = context.state.cartList.find((item) => item.iid === payload.iid)

            //2.判断oldProduct
            if (oldProduct) {
                //oldProduct.count += 1//-> 这个应该放在mutations里
                context.commit(ADD_COUNTER, oldProduct)
                resolve('当前商品数量加一') //重要
            } else {
                payload.count = 1

                //context.state.cartList.push(payload)//-> 这个应该放在mutations里
                context.commit(ADD_TO_CART, payload)
                resolve("添加了新的商品") //重要
            }
        })
    }
}