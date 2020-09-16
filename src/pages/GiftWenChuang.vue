<template>
  <div style="box-sizing:border-box;">
    <Nav></Nav>
    <swiper></swiper>
    <div class="gtype-3-type">
      <div class="gtype-item-type">
        <div class="gtype-icon-type">
          <img src="../assets/images/wenchuang.png"
               alt>
        </div>
      </div>
      <div class="gtype-item-type-right">
        <div class="type-title">文创</div>
        <div class="type-info">XXX云集(重庆)文化传媒有限公司于壹零壹陆年注册成立，主要经营设计、制作、代理、发布国内广告等。</div>

      </div>
    </div>
    <div class="gcontent">
      <!--<p class="gift-title">精品推荐</p>-->
      <article class="m-list list-theme2 clearfix" v-for="(item, index) in giftArr" :key="index">
        <a @click="shopDetail"
           class="list-item">
            <a class="f"  :style="{ 'background': 'url('+item.urlPoster+') no-repeat', 'background-size': '100% 100%'  }"></a>         
          <div class="list-mes">
            <li class="list-title">{{item.name}}</li>
            <div class="list-mes-item">
              <div>
                <span class="list-price" v-if="item.isfree === 0">
                  免费
                  <!--<em>¥</em>34.7-->
                </span>
                <span class="list-price" v-else>
                  <em>¥</em>34.7
                </span>
              </div>
            </div>
          </div>
        </a>
        <a @click="shopDetail"
           class="list-item">
          <div class="list-img">
            <img src="//img.alicdn.com/imgextra/i4/815569543/TB2.w2_dFXXXXbQXXXXXXXXXXXX_!!815569543.jpg_640x640q85s150_.webp"
                 data-url="http://img1.shikee.com/try/2016/06/19/09430120929215230041.jpg_220x220.jpg">
          </div>
          <div class="list-mes">
            <p class="list-title">新年礼物升辉飞机模型国航南航东航波音空客380仿真大客机模型</p>
            <div class="list-mes-item">
              <div>
                <span class="list-price">
                  <em>¥</em>34.7
                </span>
              </div>
            </div>
          </div>
        </a>
      </article>
    </div>
  </div>
</template>
<script>
import Nav from '../components/common/Nav.vue'
import Swiper from '../components/main/Swiper.vue'
export default {
  data() {
    return {
      giftArr: []
    }
  },
  created: function () {
    console.log('here')
    this.axios({
      method: 'get',
      url: '/api/item/list?type=文创'
    }).then((res) => {
      console.log(res)
      if (res.data.status === 200) {
        this.giftArr = res.data.data
        // console.log(this.skuArr)
        //   this.price = res.data.data[0].price
        //   this.thumbURL = res.data.data[0].thumbURL
        //   this.classType = res.data.data[0].classType
        //   this.description = res.data.data[0].description
        //   this.i = 0
      } else if (res.data.status === 401) {
        this.$router.replace('/')
      } else {
        console.log('数据获取失败，请刷新重试')
      }
    })
  },
  methods: {
    shopDetail () {
      this.$router.push({
        path: '/shopdetail',
        query: {
          seat: this.userInfo.seat
        }
      })
    }
  },
  components: {
    Nav,
    Swiper
  }
}
</script>
<style>
.gtype-3 {
  /*padding: 20px 0 0;*/
  display: flex;
  justify-content: space-between;
  /*padding-left: 25px;*/
  /*box-shadow: rgb(197, 196, 196) 0px 0px 10px;*/
}

/* .gtype-3 .gtype-item {
  width: 31%;
} */
.gtype-item {
  text-align: center;
  width: 33.33%;
  float: left;
  position: relative;
  z-index: 0;
  /* padding: 10px 0 0; */
  font-size: 13px;
}
.gtype-icon {
  /* height: 55px; */
  display: flex;
  align-items: center;
  justify-content: center;
}
.gtype-icon img {
  width: 100px;
}
.gtype-txt {
  word-wrap: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  color: #95a9bf;
  /* padding: 14px 10px 0px 10px; */
  line-height: 22px;
}

/* 精品推荐 */
p {
  padding: 0;
  margin: 0;
}

.gift-title {
  margin: 10px 0 10px 10px;
  font-size: 14px;
}
.m-list .list-theme2 {
  box-sizing: border-box;
}
.list-img {
  width: 100%;
  overflow: hidden;
}
.list-theme2 .list-item .list-mes {
  padding: 2px;
}
.list-theme2 .list-item .list-mes .list-title {
  color: black;
  display: -webkit-box;
  overflow: hidden;
  padding: 10px 0px;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
