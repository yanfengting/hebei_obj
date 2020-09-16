<template>
  <div style="box-sizing:border-box;">
    <Nav></Nav>
    <swiper></swiper>
    <div class="gtype-3 clearfix" >
      <li class="gtype-item" @click="toShopList('航鲜')">
        <div class="gtype-icon gift1">
          <!-- <img class="gift1" alt> -->
        </div>
        <div class="gtype-txt">华夏航鲜</div>
      </li>
      <li class="gtype-item" @click="toShopList('文创')">
        <div class="gtype-icon gift2">
          <!-- <img class="gift2"  alt> -->
        </div>
        <div class="gtype-txt">华夏文创</div>
      </li>
      <li class="gtype-item" @click="toShopList('旅游')">
        <div class="gtype-icon gift3">
          <!-- <img class=""  alt> -->
        </div>
        <div class="gtype-txt">华夏旅游</div>
      </li>
    </div>
    <div class="gcontent">
      <p class="gift-title">精品推荐</p>
      <div class="list-body">
        <!--        <article class="m-list list-theme2 clearfix" v-for="(item, index) in giftArr" :key="index">-->
        <div v-for="(item, index) in giftArr" :key="index" @click="shopDetail(item)"
             class="list-item">
          <a class="f" :style="{'background': 'url('+item.urlPoster+') no-repeat','background-size': '100% 100%' }">
            <!-- <img v-bind:src="item.urlPoster"
                 data-url="http://img1.shikee.com/try/2016/06/19/09430120929215230041.jpg_220x220.jpg"> -->
          </a>
          <div class="list-mes">
            <li class="list-title">{{item.name}}</li>
            <div class="list-mes-item">
              <div>
                <span class="list-price" v-if="item.isfree === 1">
                  免费
                  <!--<em>¥</em>34.7-->
                </span>
                <span class="list-price" v-else>
                  <span>¥</span>{{item.price}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Nav from '../components/common/Nav.vue'
  import Swiper from '../components/main/Swiper.vue'

  export default {
    data() {
      return {
        giftArr: [],
        types: [
          '航鲜',
          '文创',
          '旅游'
        ]
      }
    },
    created: function () {
      console.log('here')
      var index = Math.floor(Math.random() * 3)
      var type = this.types[index]
      this.axios({
        method: 'get',
        url: '/api/item/list?type=' + type
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
      shopDetail(item) {
        // localStorage.setItem('item', JSON.stringify(item))
        this.$router.push({
          path: '/shopdetail',
          query: {"id":item.id}
        })
      },
      toShopList(type) {
        this.$router.push({
          path: '/giftLvYou',
          query: {
            type: type
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
.f {
  width: 150px;
  height: 150px;
  background-size: 100% 100%;
}
  .gtype-item{
    margin: 0 auto;
  }
  .gift1 {
    height: 90px;
    /* width: 150px; */
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('../assets/images/xianhang.png');
  }
  .gift2 {
    height: 90px;
    /* width: 150px; */
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('../assets/images/wenchuang.png');
  }
  .gift3 {
    height: 90px;
    /* width: 150px; */
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('../assets/images/lvyou.png');
  }
  .gtype-3 {
    padding: 20px 10px 0;
    display: flex;
    justify-content: space-between;
    /*padding-left: 25px;*/
    /*box-shadow: rgb(197, 196, 196) 0px 0px 10px;*/
  }

  .gtype-icon {
    /* height: 55px; */
    display: flex;
    align-items: center;
    justify-content: center;
    /* margin: 10px; */
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
    /* padding: 10px; */
    line-height: 22px;
  }

  /* 精品推荐 */
  p {
    padding: 0;
    margin: 0;
  }

  .gcontent {
    padding: 5px 5px 5px 7px;
    box-sizing: border-box;
    color: #95a9bf;
  }

  .list-body {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .gift-title {
    margin: 10px 0 10px 10px;
    font-size: 14px;
  }

  .m-list .list-theme2 {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .list-img {
    width: 100%;
    overflow: hidden;
  }

  .list-img img {
    width: 150px;
    height: 150px;
    /* margin-top: -50%; */
    background-color: #fff;
    border: none;
  }

  .list-item {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    width: 46%;
    margin: 10px 3px;
    /* box-shadow: 1.176vw 0.588vw 1.176vw #eef0f3; */
    box-shadow: 0px 3px 8px rgba(0, 45, 128, 0.2);
    border-radius: 2.059vw;
  }

  .list-item .list-mes {
    padding: 10px;
    text-align: left;
  }

  .list-item .list-mes .list-title {
    /* width: 450px; */
    margin: 0 auto;
    /* height: 150px; */
    color: black;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    padding-bottom: 10px;
    -webkit-line-clamp: 2;
  }

</style>
