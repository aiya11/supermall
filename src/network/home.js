import { request } from './request'

export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
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