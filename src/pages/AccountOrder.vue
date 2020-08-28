<template>
  <div class="accountOrder">
    <Nav></Nav>
    <!--<cube-scroll ref="actionScroll" :data="orderArr">-->
    <div class="orderContent" v-if="!this.orderArr.length" style="text-align:center;padding:50px 0;background-color:white !important;"> 您的订单空空如也，赶快去首页下单吧 </div>
    <div class="orderContent" v-else >
      <!--<div class="scroll-content">-->
      <div class="line1" v-for="(l,index) in orderArr" v-bind:key="index">
        <div class="order-img">
          <img src="../assets/images/item_img.png" alt="">
        </div>
        <!-- <div class="dpop" title="弹框" v-if="l.orderType === 'IT'" v-show="orderitem"> {{l.item}}</div> -->
        <div class="orderInfo">
          <div class="orderType">
            <span v-if="l.orderType === 'CB'">呼唤铃</span>
            <span v-else-if="l.orderType === 'FO'">机上餐食</span>
            <span v-else-if="l.orderType === 'GR'">机上升舱</span>
            <span v-else-if="l.orderType === 'IT'">空中商城</span>
          </div>
          <div class="orderDetail">
            <div class="place">{{l.item.substr(0, 8)}}&nbsp;&nbsp;￥{{l.price}}</div>
            <div class="orderNo"> 订单号{{l.orderNo}}</div>
          </div>
        </div>
        <div class="orderStatus">
          <div :class="{status:l.status != '待确认'}">{{l.status}}</div>
          <div class="op" v-if="l.status === '待确认'" @click="cancel(l.orderNo,l.orderType)">&nbsp; 取消 &nbsp;</div>
        </div>
      </div>
      <!--</div>-->
    </div>
    <div class="bottom-desp" style="background: #ffffff;" v-show="bottomshow">
      <hr>
      <span>我是有底线的哦</span>
      <hr>
    </div>
    <!--</cube-scroll>-->
    <div class="bottom" style="position: fixed;bottom: 0;" v-show="show">
      <div class="img" v-for="(l,index) in advList" v-bind:key="index"
           @click="showImgPrv(index)"
           :style="{'background-image': 'url('+l.src+')' , 'background-repeat': 'no-repeat' , 'background-size': '100% auto' , 'background-position': 'bottom center'}">
        <!--<a :href="l.src" >-->
        <!--<img v-bind:src="'http://118.178.84.155:5050'+l.src" alt="">-->
        <!--</a>-->
      </div>
      <!--<div class="img"></div>-->
    </div>
  </div>
</template>
<script>
  import Nav from '../components/common/Nav.vue'
  // import registryToast from '../components/common/toast/index'

  export default {
    data() {
      return {
        msg: '',
        orderArr: [],
        advList: [],
        bottomshow: false,
        initialIndex: 0,
        show: false
      }
    },
    created: function () {
      let _this = this

      this.axios({
        method: 'get',
        url: '/api/adv/list',
        params: {
          'position': 5
        }
      }).then((res) => {
        console.log(res)
        if (res.data.status === 200) {
          this.advList = res.data.data
        } else {
        }
      })

      var userInfo = localStorage.getItem('userInfo')
      this.userInfo = JSON.parse(userInfo) // 转为JSON
      this.axios({
        method: 'get',
        url: '/api/order/list'
      }).then((res) => {
        console.log(res)
        if (res.data.status === 200) {
          _this.orderArr = res.data.data
          console.log(_this.orderArr)
          if (_this.orderArr.length <= 0) {
            // registryToast.showToast('您还没有下单')
          }
        } else {
        }
        this.bottomshow = true
        setTimeout(function () {
          _this.show = true
        }, 1000)
      })
      // let name = this.$route.params.paramsName // 获取传入参数的值 不是router 而是route
      console.log(name)
    },
    methods: {
      showImgPrv(index) {
        let imgs = []
        this.advList.forEach(function (item) {
          imgs.push(item.src)
        })
        this.initialIndex = index
        const params = {
          $props: {
            imgs: imgs,
            initialIndex: 'initialIndex', // 响应式数据的key名
            loop: false
          },
          $events: {
            change: (i) => {
              // 必须更新 initialIndex
              this.initialIndex = i
            }
          }
        }
        this.$createImagePreview({ ...params }).show()
      },
      cancel(orderNo, orderType) {
        this.axios({
          method: 'post',
          url: '/api/order/cancel',
          params: {
            'orderNo': orderNo,
            'orderType': orderType
          }
        }).then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            this.showSuccess()
            this.axios({
              method: 'get',
              url: '/api/order/list'
            }).then((res) => {
              console.log(res)
              if (res.data.status === 200) {
                this.orderArr = res.data.data
              } else {
              }
            })
          } else {
            this.$dialog('取消失败', 'my-error')
          }
        })
      },
      showSuccess() {
        this.$dialog('订单取消成功', 'my-order')
      }
    },
    components: {
      Nav
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .dpop{
    position:absolute;
    margin:65px 0 0 15px;
    z-index:3;
    padding:3px;
    border: 1px solid #aaa;
    border-radius :5px;
  }

  .orderContent
    font-size 14px
    /*margin 15px 0px;*/
    display: flex
    flex-direction column

   .line1 .order-img
    height: 100%
    width: 30%;
  .order-img img
    width: 70px;
    border-radius 5px
    margin 10px
    // background-size 100%
    background-position:50% 50%;
  .title
    margin-bottom 10px;
    height 20px;
    text-align center

  .bottom-white
    height: 100px;

  .scroll-content
    height: 80%
    overflow scroll

  .line1
    width 100%
    height: 90px
    /*padding 10px 0;*/
    color #323232;
    font-size 15px;
    border-bottom 1px solid rgb(219,228,240);
    display flex;
    flex-direction row;
    font-size 14px;
    background-color #fff;
    cursor: pointer;
    box-shadow: 0 0 5px rgb(231,237,245);
    /*border-radius: 2px 2px 5px 5px;*/
    margin 5px auto
    align-items center
    position relative

  .line1 p
    width 16%
    line-height 50px

  .orderInfo
    width 40%
    font-size 10px;
    display: flex
    flex-direction column

  .orderType span
    font-size 14px;
    font-weight 900;

  .orderDetail
    width 100%;
    display flex
    flex-direction column
    padding: 4px 0px;
    padding-bottom: 0px;
    font-size: 10px;
    color: #BAC2CC

  .orderDetail > div
    padding: 2px 0px;

  .orderStatus
    width 30%
    height 100%
    display flex
    flex-direction row
    font-size 11px
    text-align center
    // line-height 50%
    justify-content: center;// 文字垂直水平居中
    align-items: center;

  .status
    width 90% !important
    text-align right

  .orderStatus > div
    width 50%
    /*margin-top:4px*/
    /*padding-top 4px*/
    /*margin-right 5px*/
    color #ABABAB
    font-weight bold

  .orderStatus .op
    height 100%
    width 50px
    // /*border-radius 2px*/
    background linear-gradient(to bottom, rgb(84, 173, 251), rgb(0, 127, 238))
    color #fff
    // // padding-right 2px;
    // // padding-left 2px;
    display flex
    justify-content: center;// 文字垂直水平居中
    align-items: center;

  /*background #ff00ff*/
  .bottom
    width 100%
    height 100px;
    /*border 1px red solid*/
    display flex
    flex-direction row
    position fixed
    bottom 0px
    z-index: 1

  .orderContent
     background: rgba(247, 249, 252, 1);

  .accountOrder
     background: rgba(247, 249, 252, 1);

  .accountOrder .bottom-desp
    margin-bottom: 90px;

  .img
    width 50%
    height 100px

  .img a
    display block

  width 100%
  heigth 100px
  .img a img
    height 100px
</style>
