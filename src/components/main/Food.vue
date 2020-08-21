<template >
  <div class="cab-common ">
    <div class="item" @click="addCart">
      <div class="top-describe cab-food cab-common">

        <!--<p class="second">Restaurant</p>-->
      </div>
      <span class="first-font">餐食</span>
      <div v-if="is_sku" class="specification_mask2"  style="z-index: 11">
        <div class="specification_com2" @click.stop="is_sku==false" >
          <div class="productConten">
            <div class="product-delcom">
              <div class="header">
                <div class="img-wrap">
                  <img :src="thumbUrl" alt="">
                </div>
                <div class="main">
                  <div class="price-wrap">
                    <p class="food-price">￥{{price}}<span>/份</span></p>
                  </div>
                  <div class="product-delcom" style="margin-left:-10px;margin-left:-10px;position: absolute;bottom: 20px;">
                    <p >已选 <span v-if="i===-1">种类</span><span v-else>{{type}}</span></p>
                    <p v-if="i!==-1">{{description}}</p>
                  </div>
                </div>
                <a class="sku-close" @click="cancelMask" aria-label="关闭">
                </a>
              </div>
            </div>

            <div class="product-delcom" >
              <p>种类</p>
              <ul class="product-footerlist clearfix">
                <li
                  v-for="(l,index) in skuArr"
                  v-bind:key="index"
                  @click="specificationBtn(l,index)"
                  :class="{orange:i === index}"
                >{{l.type}}</li>
              </ul>
            </div>
          </div>

          <div type="flex" class="van-row--flex sku_specification2">
            <div class="van-col van-col--12" :span="12" >购买数量</div>
            <div class="van-col van-col--12" :span="12" style="text-align: right">
              <button class="van-stepper__plus" v-on:click="decrement">-</button>
              <input type="text" class="van-stepper__plus" size="1" v-model="num" ref="num">
              <button class="van-stepper__plus" @click="increment">+</button>
            </div>
          </div>
          <div type="flex" class="van-row--flex sku_specification3">
            <div class="van-col van-col--12" :span="12">总价</div>
            <div class="van-col van-col--12 number" style="text-align: right">
              <div id="number" class="number"  style="height: auto; border: 1px solid #fff;  text-align: right;">￥{{countPrice}}</div>
            </div>
          </div>
          <div type="flex" class="van-row--flex sku_specification3" >
            <div class="van-col van-col--12" :span="12" style="line-height: 45px;">您的座位号</div>
            <div class="van-col van-col--12 number" style="text-align: right">
              <input id="number" type="text" v-model="newseat" ref="input">
            </div>
          </div>
          <cube-button class="demandBtn" @click="sku_addCart" :primary="true" v-show="i!=-1">提交订单</cube-button>
          <cube-button class="demandBtn1"  :primary="true" v-show="i===-1">提交订单</cube-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    seat: {
      type: String
    },
    food_sku: {
      type: Boolean
    }
  },

  watch: {
    food_sku: function (val, oldVal) {
      this.is_sku = val
       }
  },
  data() {
    return {
      newseat: this.seat,
      price: null,
      type: null,
      thumbUrl: null,
      description: null,
      i: -1,
      skuArr: [],
      num: 1,
      is_sku: this.issku, // 规格弹窗
      countPrice: 0
    }
  },
  created: function() {
    // this.getParams()
    // 接收传给main页面的表单数据
    var userInfo = localStorage.getItem('userInfo')
    this.userInfo = JSON.parse(userInfo) // 转为JSON
    this.axios({
        method: 'get',
        url: '/api/food/list'
      }
    ).then((res) => {
      console.log(res)
      if (res.status === 200) {
        if (res.data.data != null) {
          this.skuArr = res.data.data
          this.price = res.data.data[0].price
          this.type = res.data.data[0].type
          // this.foodtype = res.data.data.type
          this.thumbUrl = res.data.data[0].thumbUrl
          this.name = res.data.data[0].type
          this.description = res.data.data[0].description
          this.i = -1
        } else {
          this.is_sku = false
        }
      } else {
        alert('数据获取失败，请刷新重试')
      }
    })
  },
  methods: {
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
    // 点餐食
    addCart() {
      // this.$parent.showwait()
      // return
      this.is_sku = true
      this.axios({
        method: 'get',
        url: '/api/food/list'
        }
      ).then((res) => {
        console.log(res)
        if (res.status === 200) {
          if (res.data.data != null) {
            this.is_sku = true
            this.skuArr = res.data.data
            this.price = res.data.data[0].price
            this.type = res.data.data[0].type
            // this.foodtype = res.data.data.type
            this.thumbUrl = res.data.data[0].thumbUrl
            this.name = res.data.data[0].type
            this.description = res.data.data[0].description
            this.i = -1
          } else {
            this.is_sku = false
            this.$parent.getRouterInfo({
              food_sku: false,
              demand_sku: false,
              upgrade_sku: false
            })
          }
        }else {
          alert('数据获取失败，请刷新重试')
        }
      })
    },
    // 点击蒙层取消
    cancelMask: function() {
      this.is_sku = false
      this.$parent.getRouterInfo({
        food_sku: false,
        demand_sku: false,
        upgrade_sku: false
      })
    },
    // 选择种类
    specificationBtn: function(item, index) {
      this.i = index // 点击选中
      this.price = item.price
      this.countPrice = this.price
      this.name = item.name
      this.type = item.type
      this.thumbUrl = item.thumbUrl
      this.num = 1
      // console.log(index)
      // console.log(item.name)
    },
    // 提交订单
    sku_addCart(item) {
      // this.seat = this.$refs.input.value // input框接收一个传过来的座位号，编辑以后获取
      console.log(this.newseat)
      this.$emit('getCalled', this.newseat)
      this.newnum = this.$refs.num.value
      console.log('价钱 ' + this.price)
      console.log('种类 ' + this.name)
      console.log('座位号 ' + this.seat)
      console.log('数量 ' + this.newnum)
      this.is_sku = false
      if (this.i === -1) {
      } else {
        this.axios({
          method: 'post',
          url: '/api/food/submit',
          params: {
            'seatNo': this.seat,
            'type': this.type,
            'num': this.newnum,
            'mobile': this.userInfo.tel
          }
        }).then((res) => {
            if (res.data.status === 200) {
              // 弹框提交成功
              this.$dialog('订单提交成功', 'my-order')
            } else {
              this.$dialog('网络或系统错误，请重新提交', 'my-error')
            }
          }
          , function (err) {
            alert(err)
          })
      }
    }
  }
}
</script>
<style lang="stylus">
.orange {
  /*background-color: #007fff;*/
  color: #fff;
  /*border: 1px solid #06f;*/
  background:#0088ff !important;
}

.productConten {
  /*margin-bottom: 10px;*/
}

.productConten p {
  text-align: left;
}

// header
.header {
  // padding: 10px 0 10px 126px;
  /*margin-top: 10px;*/
  position: relative;
  display: flex;
  border-radius 10px
  .img-wrap {
    width: 40%;
    height: 112px;
    // position: absolute;
    // top: -28px;
    // left: 10px;
    border-radius: 4px;
    overflow: hidden;
    padding: 1px;
    background-color: #fff;
    img {
      width 100%
    }
  }

  .main {
    width 60%
    color: #051b28;
    line-height: 18px;
    margin-top 10px
    /*padding-right: 20px;*/
    padding-left: 10px;
    .price-wrap {
      width: 210px;
      height: 30px;
      margin   20px 20px 0px 0px;
      font-size: 22px;
      color #ff5339
      span{
        font-size: 16px;
        /*color black*/
      }
    }
  }

  .sku-close {
    position: absolute;
    top: -10px;
    right: -15px;
  }
}

// 种类
.product-delcom {
  margin: 5px 10px 0px 10px ;
  color: #323232;
  font-size: 12px;
}

.product-footerlist {
  margin-top: 4px;
}

.product-footerlist li {
  /*border: 1px dashed #007fff;*/
  // border-radius: 5px;
  // color: orange;
  font-size 12px;
  text-align: center;
  padding: 2px 10px;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius 5px;
  background-color #f2f2f2;
  line-height 26px
}

.product-footerlist li.productActive {
  /*background-color: orange;*/
  color: #fffff;
  border: 1px solid #ffffff;
}

.product-footerlist li.noneActive {
  background-color: #ccc;
  opacity: 0.4;
  color: #000;
  pointer-events: none;
}

//
.item {
  width: 100%;
  text-align: center;
}

.specification_mask2 {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 111111;
}

.specification_com2 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  border-radius:10px 10px 0px 0px
}

.van-row--flex {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}

.van-col--12 {
  width: 50%;
}

.van-col {
  float: left;
  text-align: left;
  font-size: 14px;
  line-height: 30px;
  box-sizing: border-box;
}

.van-stepper__plus {
  text-align center
  width: 30px;
  height: 26px;
  box-sizing: border-box;
  background-color: #ebedf0;
  border: 1px solid #ffffff;
  position: relative;
  /*padding: 5px;*/
  vertical-align: middle;
}

.van-stepper__input {
  width: 30px;
  height: 23px;
  background #ebedf0
  /*padding: 1px;*/
  border-top: 1px solid #ebedf0;
  border-bottom: 1px solid #ebedf0;
  /*border-width: 1px 0;*/
  border-radius: 0;
  box-sizing: content-box;
  color: #7d7e80;
  font-size: 14px;
  vertical-align: middle;
  text-align: center;
  -webkit-appearance: none;
}

#number {
  height: 30px;
  width: 113px;
  border-radius: 3px;
  float: right;
  /*border: 1px solid #ebedf0;*/
  text-align: center;
  font-size: 20px;
}
.number {
  color: #ff5339;
  background: #fff;

}
.choose_sku2 {
  max-height: 300px;
  overflow: scroll;
}

.sku_specification2 {
  border-top: 1px solid #EEEEEE
  border-bottom 1px solid #EEEEEE
  box-sizing: border-box;
  padding: 5px 0px;
  margin auto 15px;
}
.sku-close {
  width: 30px;
  display: block;
  float: right;
  text-align: right;
  padding: 10px;
}

.sku_title2 {
  font-size: 14px;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: left;
}

.sku_ul2 {
  display: flex;
  flex-wrap: wrap;
}

ol, ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.sku_li2 {
  box-sizing: border-box;
  padding: 5px 10px;
  margin: 0 0.15rem 0.15rem 0;
  border-radius: 5px;
  font-size: 14px;
}

.productActive {
  background: #ffd100;
}
  .food-price{
    font-size 30px
  }
  .food-price>span{
    color:#333
  }
</style>
