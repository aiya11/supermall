module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-px-to-viewport": {
            viewportWidth: 375, //视窗的宽度，对应的是我们设计稿的宽度(750)
            viewportHeight: 667, //视窗的高度，对应的是我们设计稿的高度(也可以不配置)
            unitPrecision: 5, //指定'px'转换为视窗单位值的小数数位(很多时候不能整除)
            viewportUnit: 'vw', //指定需要转换的视窗单位，建议用vw
            selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], //指定不需要转换的类；可以指定一个类，不需要的直接把这个类赋值给它
            minPixelValue: 1, //小于或等于'1px'不转换为视窗单位
            mediaQuery: false, //是否允许在媒体查询中转换'p'
            exclude: [/TabBar/], //必须是正则，匹配文件的  这个也是指定某些转化了单位的文件不要转化
        },
    }
}

//1.在js中使用正则:/郑泽相关规则/
//2.exclude中存放的元素必须是正则表达式
//3.按照排除的文件写对应的正则
//正则的规则:
//1> ^abc: 表示匹配的内容，必须以什么内容开头(以abc开头)
//1> abc$: 表示匹配的内容，必须以什么内容结尾(以abc结尾)