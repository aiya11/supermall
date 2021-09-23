import { request } from './request'

export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}

export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}

//函数调用 -> 压入函数栈(保存函数调用过程中所有变量)
//函数调用结束 -> 弹出函数栈(释放函数所有的变量)
// function text() {
//     const names = ['why', 'sss']
// }

// text() //当执行这里的时候，上面function就没了，就会删除

//再调一次，上面的function text()就会重新创建
//text()

//把num1和num2传进totalnums中
// let totalnums = []

// const num1 = [11, 22, 33]
// const num2 = [44, 55, 66]

// //方式一
// // for(let n of num1){
// //     totalnums.push(n)
// // }
// //方式二
// totalnums.push(...num1, ...num2)