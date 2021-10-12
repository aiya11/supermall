import { debounce } from "common/utils"
export const itemListenerMixin = {
    components: {},
    methods: {},

    // data() {
    //     return {
    //         itemImageListener: null
    //     }
    // },
    // mounted() {
    //     //1.监听item中图片加载完成
    //     const refresh = debounce(this.$refs.scroll.refresh, 500)
    //         /* 默认情况下$bus是没有值的，所以这里需要给它在main.js中赋值一个Vue实例 */

    //     //对监听的事件进行保存
    //     //这里主要是拿到itemImageListener，方便上面在deactivated中取消掉
    //     //主要是Detail.vue页面调用GoodsList.vue页面时，也会刷新Home.vue的页面，这里这样设置之后，当Detail.vue在调用之后，Home.vue就不会调用，因为它被取消掉了
    //     this.itemImageListener = () => {
    //         refresh()
    //     }

    //     this.$bus.$on('itemImageLoad', this.itemImageListener)
    //     console.log("我是混入中的内容")
    // },

    //对上面的优化
    data() {
        return {
            itemImageListener: null,
            refresh: null,
        }
    },
    mounted() {
        //1.监听item中图片加载完成
        this.refresh = debounce(this.$refs.scroll.refresh, 100)
            /* 默认情况下$bus是没有值的，所以这里需要给它在main.js中赋值一个Vue实例 */

        //对监听的事件进行保存
        //这里主要是拿到itemImageListener，方便上面在deactivated中取消掉
        //主要是Detail.vue页面调用GoodsList.vue页面时，也会刷新Home.vue的页面，这里这样设置之后，当Detail.vue在调用之后，Home.vue就不会调用，因为它被取消掉了
        this.itemImageListener = () => {
            this.refresh()
        }

        this.$bus.$on('itemImageLoad', this.itemImageListener)
    },

}

/* import BackTop from "components/contents/backTop/BackTop" */
import BackTop from "components/contents/backTop/BackTop"
export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 1000)
        },
        listenShowBackTop(position) {
            this.isShowBackTop = -position.y > 1000
        }
    }
}