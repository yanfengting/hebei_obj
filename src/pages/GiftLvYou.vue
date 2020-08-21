<template>
  <div style="box-sizing:border-box;">
    <Nav></Nav>
    <div class="gtype-3-type">
      <div class="gtype-item-type">
        <div class="gtype-icon-type">
          <template v-if="currStore.index === 1">
            <img src="../assets/images/xianhang.png"
                 alt>
          </template>
          <template v-if="currStore.index === 2">
            <img src="../assets/images/wenchuang.png"
                 alt>
          </template>
          <template v-if="currStore.index === 3">
            <img src="../assets/images/lvyou.png"
                 alt>
          </template>
        </div>
      </div>
      <div class="gtype-item-type-right">
        <div class="type-title">{{currStore.name}}</div>
        <div class="type-info">华夏云集(重庆)文化传媒有限公司于壹零壹陆年注册成立，主要经营设计、制作、代理、发布国内广告等。</div>

      </div>
    </div>
    <div class="gcontent">
      <div class="list-body">
        <!--<p class="gift-title">精品推荐</p>-->
        <a v-for="item in giftArr" @click="shopDetail(item)"
           class="list-item">
          <div class="list-img">
            <img v-bind:src="item.urlPoster">
          </div>
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
        </a>
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
        types: {
          '航鲜': {
            index: 1,
            icon: '../assets/images/xianhang.png',
            name: '华夏鲜航'
          },
          '文创': {
            index: 2,
            icon: '../assets/images/wenchuang.png',
            name: '华夏文创'
          },
          '旅游': {
            index: 3,
            icon: '../assets/images/lvyou.png',
            name: '华夏旅游'
          }
        },
        currStore: {}
      }
    },
    created: function () {
      let type = this.$route.query.type
      this.currStore = this.types[type]
      this.axios({
        method: 'get',
        url: '/api/item/list?type=' + type
      }).then((res) => {
        if (res.data.status === 200) {
          this.giftArr = res.data.data
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
          path: '/shopDetail',
          query: {
            "id": item.id
          }
        })
      }
    },
    components: {
      Nav
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
    padding: 10px 0 0;
    font-size: 13px;
  }

  .gtype-icon {
    height: 55px;
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
    padding: 14px 10px 0px 10px;
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
    font-size: 17px;
    line-height: 18px;
    font-weight: 200;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .list-price {
    font-size: 20px;
    color: red;
    font-weight: bold;
  }

  .list-price span {
    font-size: 15px;
    padding: 0px 3px;
    font-weight: bold;
  }
</style>
