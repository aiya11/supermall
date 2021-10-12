//防抖->解决页面加载完，图片还未加载完，造成的滑动页面BUG
export function debounce(func, delay) {
    let timer = null
    return function(...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}