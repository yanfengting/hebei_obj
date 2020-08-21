
<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>
<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'
    const DIRECTION_H = 'horizontal'
    const DIRECTION_V = 'vertical'
    export default {
        props: {
            // probeType: 1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件  
            probeType: {
                type: Number,
                default: 1
            },
             // click: true 是否派发click事件，通常判断浏览器派发的click还是betterscroll派发的click，可以用event._constructed，若是bs派发的则为true  
            click: {
                type: Boolean,
                default: false
            },
            listenScroll: {
                type: Boolean,
                default: false
            },
            data: {
                type: Array,
                default: null
            },
            pullup: {
                type: Boolean,
                default: false
            },
            beforeScroll: {
                type: Boolean,
                default: false
            },
            refreshDelay: {
                type: Number,
                default: 20
            },
            direction: {
                type: String,
                default: DIRECTION_V
            }
        },
        mounted() {
            // 页面数据渲染完毕后执行betterscroll
            setTimeout(() => {
                this._initScroll()
            }, 20)
        },
        methods: {
            _initScroll() {
                // 对于 Vue 组件，this.$refs.xxx 拿到的是 Vue 实例，所以需要再通过 $el 拿到真实的 dom
                // 如果这时候还没有数据，那么return掉，不要报错
                if (!this.$refs.wrapper) {
                    return
                }
                // 创建一个scroll属性，生成scroll实例
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click,
                    eventPassthrough: this.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V
                })
               console.log(this.scroll)
                if (this.listenScroll) {
                    this.scroll.on('scroll', (pos) => {
                        this.$emit('scroll', pos)
                    })
                }
                if (this.pullup) {
                    this.scroll.on('scrollEnd', () => {
                        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                            this.$emit('scrollToEnd')
                        }
                    })
                }
                if (this.beforeScroll) {
                    this.scroll.on('beforeScrollStart', () => {
                        this.$emit('beforeScroll')
                    })
                }
            },
            // disable如果不加，scroll的高度会高于内容的高度。
            disable() {
                this.scroll && this.scroll.disable()
            },
            enable() {
                // 启用better-scroll 默认开启 
                this.scroll && this.scroll.enable()
            },
            // 数据改变 强制刷新
            refresh() {
                // 强制 scroll 重新计算，当 better-scroll 中的元素发生变化的时候调用此方法  
                this.scroll && this.scroll.refresh()
            },
            scrollTo() {
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
            },
            scrollToElement() {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
            }
        },
        watch: {
            data() {
                setTimeout(() => {
                    this.refresh()
                }, this.refreshDelay)
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
