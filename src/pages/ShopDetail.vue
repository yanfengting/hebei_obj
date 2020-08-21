<template>
  <div>
    <Nav></Nav>
    <!-- 轮播图 -->
    <img :src="item.urlPoster">
    <div class="module-price">
      <div class="real-price">
        <span v-if="item.isfree === 1">
                  免费
        </span>
        <span v-else>
          <span class="icon">¥</span>{{item.price}}
        </span>
      </div>
    </div>

    <!-- <div class="module-price">
      <p>{{item.name}}</p>
    </div> -->

    <div class="module-price" >
      <p
        class="module-content">{{item.description}}</p>
    </div>

    <div class="module-price" v-for="(l,index) in item.thumbUrls" v-bind:key="index" style="padding-bottom: 55px;" >
      <!-- <p >{{l}}</p> -->
      <img :src="l" alt="">
    </div>

    <div class="marsk-qrcode" v-if = "is_save">
      <div style="position: absolute;left: 0px;right: 0px;top: 0px;bottom: 0px;"  @click="is_save = false"></div>
      <img :src="src" alt="" style="z-index: 1111" class="share-image">
      <div class="save-btn" style="z-index: 111">
        <button @click="saveImg" class="saveimg"></button>
      </div>
    </div>
    <vue-canvas-poster  class="poster"  :widthPixels="1000" :painting="painting" @success="success" @fail="fail"></vue-canvas-poster>
    <div style="position:fixed;width: 97%;margin: 0px auto;left: 0px;right: 0px;bottom: 0px">
      <button @click="saveLink" class="savegift"></button>
      <button @click="buyGoods" class="buygift"></button>
    </div>
    <!-- 弹框 -->
    <div v-if="is_sku" class="specification_mask2" style="z-index: 11">
      <div v-if="is_sku" class="specification_mask2" style="z-index: 11">
        <div class="specification_com2" @click.stop="is_sku==false">
          <div class="productConten">
            <div class="product-delcom">
              <div class="header">
                <div class="img-wrap">
                  <img :src="item.urlPoster" alt="">
                </div>
                <div class="main">
                  <div class="price-wrap">
                    <p class="food-price">￥{{price}}<span>/份</span></p>
                  </div>
                  <!-- <div class="product-delcom"
                       style="margin-left:-10px;margin-left:-10px;position: absolute;bottom: 20px;">
                    <p>已选 <span v-if="i===-1">种类</span><span v-else>{{type}}</span></p>
                    <p v-if="i!==-1">{{description}}</p>
                  </div> -->
                </div>
                <a class="sku-close" @click="cancelMask" aria-label="关闭">
                </a>
              </div>
            </div>
          </div>
          <div type="flex" class="van-row--flex sku_specification2">
            <div class="van-col van-col--12" :span="12">购买数量</div>
            <div class="van-col van-col--12" :span="12" style="text-align: right">
              <button class="van-stepper__plus" v-on:click="decrement">-</button>
              <input type="text" class="van-stepper__plus" size="1" v-model="num" ref="num">
              <button class="van-stepper__plus" @click="increment">+</button>
            </div>
          </div>
          <div type="flex" class="van-row--flex sku_specification3">
            <div class="van-col van-col--12" :span="12">总价</div>
            <div class="van-col van-col--12 number" style="text-align: right">
              <div id="number" class="number" style="height: auto; border: 1px solid #fff;  text-align: right;">
                ￥{{countPrice}}
              </div>
            </div>
          </div>
          <div type="flex" class="van-row--flex sku_specification3">
            <div class="van-col van-col--12" :span="12" style="line-height: 45px;">您的座位号</div>
            <div class="van-col van-col--12 number" style="text-align: right">
              <input id="number" type="text" v-model="newseat" ref="input">
            </div>
          </div>
          <cube-button class="demandBtn" @click="sku_addCart" :primary="true" v-show="i!=-1">提交订单</cube-button>
          <cube-button class="demandBtn1" :primary="true" v-show="i===-1">提交订单</cube-button>
        </div>
      </div>
      <!--<div class="specification_com2" @click.stop="is_sku==false">
        <div class="productConten">
          <div class="product-delcom">
            <div class="header">
              <div class="img-wrap">
                  <img src="//img.alicdn.com/imgextra/i1/3201286958/TB2IT6BX5CYBuNkHFCcXXcHtVXa_!!3201286958.jpg_640x640q85s150_.webp" alt="">
                &lt;!&ndash; <img :src="thumbURL" alt=""> &ndash;&gt;
              </div>
              <div class="main">
                <div class="price-wrap">
                  &lt;!&ndash; <p class="">￥{{price}}</p> &ndash;&gt;
                  <p>￥88</p>
                </div>
                <li>dsdvgfesdg</li>
              </div>
              <a class="sku-close" @click="cancelMask" aria-label="关闭">
                <i class="iconfont icon-chahao"></i>
              </a>
            </div>
          </div>

        </div>
        <div type="flex" class="van-row&#45;&#45;flex sku_specification2">
          <div class="van-col van-col&#45;&#45;12" :span="12">购买数量</div>
          <div class="van-col van-col&#45;&#45;12" :span="12" style="text-align: right">
            <button class="van-stepper__plus" v-on:click="decrement">-</button>
            <input type="text" class="van-stepper__input" size="1" v-model="num" ref="num">
            <button class="van-stepper__plus" @click="increment">+</button>
          </div>
        </div>
        <div type="flex" class="van-row&#45;&#45;flex sku_specification2">
          <div class="van-col van-col&#45;&#45;12" :span="12">您的座位号</div>
          <div class="van-col van-col&#45;&#45;12 number" style="text-align: right">
            <input id="number" type="text" v-model="newseat" ref="input">
          </div>
        </div>
        <cube-button @click="goods_addCart" :primary="true">提交订单</cube-button>
      </div>-->
    </div>
  </div>
</template>
<script>
  import Nav from '../components/common/Nav.vue'
  import {drawPoster} from '../painter'
  import registryToast from '../components/common/toast/index'
  export default {
    data() {
      return {
        is_sku: false, // 规格弹窗
        price: null,
        thumbURL: null,
        i: 0,
        num: 1,
        skuArr: [],
        countPrice:0,
        item: {},
        items: [],
        is_save: false,
        destArr: [],
        newseat: '',
        src: '',
        painting:{}
      }
    },
    mounted: function() {

       let userInfoStorage = localStorage.getItem('userInfo') // JSON.stringify 将JSON转为字符串存到变量里
       let userInfo = JSON.parse(userInfoStorage)
       this.newseat = userInfo.seat
       this.userInfo = userInfo
        let id = this.$route.query.id
        this.axios({
          method: 'get',
          url: '/api/item/' + id
        }).then((res) => {
          console.log(res.data.data)
          let item  = res.data.data;
          let href = window.location.href
          let baseUrl = href.split('#')[0]
          item.urlPoster =  baseUrl + item.urlPoster
          item.url = item.urlBuy
          this.item = item
          this.price = item.price
          this.countPrice = this.price
          const params={
            type:'pro', // 尝试换一下base,image
            item: item
          }
          drawPoster(params).then(res=>{
              this.painting = res
          })
        });
    },
    created: function () {
      // var item = localStorage.getItem('item')

    },
    methods: {
      saveLink() {
        this.is_save = true;
      },
      buyGoods() {
        this.is_sku = true
      },
      // 点击蒙层取消
      cancelMask: function () {
        this.is_sku = false
      },
       increment() {
        this.num++
        this.countPrice = Number(this.countPrice) + this.price
      },
      decrement() {
        if (this.num <= 1) {
          // alert('受不1了啦，宝贝不能再减少啦')
          this.num = 1
        } else {
          this.num--
          this.countPrice = this.Subtr(this.countPrice, this.price)
        }
      },
      Subtr(arg1, arg2) { // 减法
        var r1, r2, m, n
            try {
          r1 = arg1.toString().split('.')[1].length
        } catch (e) {
          r1 = 0
        }
        try {
          r2 = arg2.toString().split('.')[1].length
        } catch (e) {
            r2 = 0
          }
          m = Math.pow(10, Math.max(r1, r2))
          n = (r1 >= r2) ? r1 : r2
          return ((arg1 * m - arg2 * m) / m).toFixed(n)
     },
      goods_addCart() {
        this.is_sku = false
      },
      changePage(current) {
        console.log('当前轮播图序号为:' + current)
      },
      clickHandler(item, index) {
        console.log(item, index)
      },// 保存
      success(src) {
        this.src = src
      },
      fail(err) {
        console.log('fail', err)
      },      
      saveImg() {
        
        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // Android
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios
        if (isAndroid) {
            var link = document.createElement('a');
            link.href = this.src;
            link.download = this.item.urlPoster || 'default.jpg';
            link.click();
        }
        if (isIOS) {
           this.toast = this.$createToast({
            txt: '请长按图片保存图片',
            type: 'txt'
          })
          this.toast.show()
        }
      },sku_addCart() {
        let _this = this;
        // item/submit
         this.axios({
          method: 'get',
          url: '/api/item/submit',
          params: {
            'seatNo': this.newseat,
            'item': this.item.id,
            'num': this.num,
            'mobile': this.userInfo.tel
          }
        }).then((res) => {
            if (res.data.status === 200) {
              // 弹框提交成功
              _this.showSuccess()
            } else if (res.data.status === 400) {
              // _this.showError(res.data.msg)
              registryToast.showToast(res.data.msg)
              return
            } else {
              _this.showError()
            }
            this.is_sku = false
            
        });
      },
      showSuccess() {
        this.$dialog('订单提交成功', 'my-order')
      },
      showError(msg) {
        let msgStr = '网络或系统错误，请重新提交'
        if (msg) {
          msgStr = msg
        }
        this.$dialog(msg, 'my-error')
      }
    },
    components: {
      Nav
    }
  }
</script>
<style>

  .module-price {
    padding: 0px 20px;
  }

  .module-price .real-price {
    color: red;
    height: 30px;
    line-height: 35px;
    font-size: 24px;
    font-weight: bold;
  }

  .real-price .icon {
    font-size: 18px;
    padding: 0px 4px;
  }

  .module-price {
    line-height: 20px;
    font-size: 15px;
  }

  .module-content {
    font-size: 12px;
    line-height: 20px;
    margin: 10px 0px;
  }
  .marsk-qrcode{
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: rgba(8,22,61,0.6);
    top: 0px;
    bottom: 0px;
    left: 0px;
    right:0px;
  }
  .share-image{
    text-align: center;
    width: 80%;
  }

  .save-btn{
    background: #ffffff;
    text-align: center;
    width: 80%;
  }

  .savegift {
    width: 50%;
    height: 48px;
    border: none;
    background-image: url("../assets/images/save_icon.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .saveimg {
    width: 85%;
    height: 48px;
    border: none;
    color: white;
    background-image: url("../assets/images/save-img-btn.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }



  .buygift {
    width: 50%;
    height: 48px;
    border: none;
    color: white;
    background-image: url("../assets/images/buy_icon.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .blue {
    background-color: rgb(63, 160, 240);
  }

  /*.orange {*/
  /*background-color: #ffffff !important;*/
  /*}*/
</style>
