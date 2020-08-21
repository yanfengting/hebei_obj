<template>
  <div>
    <Nav></Nav>
    <!-- 轮播图 -->
    <cube-slide :speed="200"
                ref="slide"
                :data="destArr"
                @change="changePage">
      <cube-slide-item v-for="(item, index) in destArr"
                       :key="index"
                       @click.native="clickHandler(item, index)">
        <!--<a :href="item.url">-->
        <img :src="item.titleImg">
        <!--</a>-->
      </cube-slide-item>
    </cube-slide>

    <div v-if="destArr.length <= 0" class="tishi">暂无目的地推荐</div>

    <!-- 游玩攻略 -->
    <a class="block-item " href="javascript:;">
    <div v-for="(item1 , index1) in destArr" :key="index1"
         @click="recommend_detail(item1.titleImg,item1.title,item1.content)" width="100%">
      <img width="100%"
           v-bind:src="item1.titleImg" style="box-shadow: 0 1.176vw 3.529vw rgba(0,0,0,.08);">
      <div class="item-text">
        <div class="title">{{item1.title}}</div>
        <!--<p class="intro" v-html="item1.content"></p>-->
      </div>
    </div>
    </a>
    <!--<a class="block-item ">-->
    <!--<div class="image-ctn"-->
    <!--width="100%">-->
    <!--<img width="100%"-->
    <!--src="http://img95.699pic.com/photo/50054/1457.jpg_wh300.jpg">-->
    <!--<div class="item-text">-->
    <!--<div class="title">特色美食</div>-->
    <!--<p class="intro">武汉户部巷美食一条街武汉户部巷美食一条街武汉户部巷美食一条街武汉户部巷美食一条街武汉户部巷美食一条街</p>-->
    <!--</div>-->
    <!--</div>-->
    <!--</a>-->
  </div>
</template>
<script>
  import Nav from '../components/common/Nav.vue'

  export default {
    data() {
      return {
        items: [
          {
            image:
              'http://img95.699pic.com/photo/50062/6085.jpg_wh300.jpg'
          },
          {
            image:
              'http://img95.699pic.com/photo/50121/7815.jpg_wh300.jpg'
          }
        ],
        destArr: []
      }
    },
    created: function () {

      // 参数：city mobile
      var userInfo = localStorage.getItem('userInfo')
      this.userInfo = JSON.parse(userInfo) // 转为JSON

      let flightStr = sessionStorage.getItem('flight')
      if (flightStr) {
        let flight = JSON.parse(flightStr)
        this.flightDetail = flight
        that.view(that.flightDetail.arriveDetail.city)
      } else {
        // sessionStorage.setItem('flight', JSON.stringify(this.flight))
        let that = this;
        this.axios({
          method: 'get',
          url: 'api/flightDetail/getUserFlight'
        }).then((res) => {
          if (res.status === 200) {
            this.flightDetail = res.data.data
            that.view(that.flightDetail.arriveDetail.city)
          } else {
            console.log('数据获取失败，请刷新重试')
          }
        })
      }


    },
    methods: {
      view(city) {
        this.axios({
          method: 'get',
          url: '/api/destination/view',
          params: {
            'city': city
          }
          // headers: { 'token': this.userInfo.token }
        }).then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            this.destArr = res.data.data.topic
            console.log(this.destArr)
          } else {
            console.log('数据获取失败，请刷新重试')
          }
        })
      },
      changePage(current) {
        console.log('当前轮播图序号为:' + current)
      },
      clickHandler(item, index) {
        console.log(item, index)
      },
      recommend_detail(titleImg, title, content) {
        this.$router.push({
          name: 'RecommendDetail',
          params: {
            'titleImg': titleImg,
            'title': title,
            'content': content
          }
        })
      }
    },
    components: {
      Nav
    }
  }
</script>
<style scoped>

  .block-item {
    /*display: block;*/
    /*margin: 14px;*/
    /*cursor: pointer;*/
    /*box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);*/
    /*border-radius: 2px 2px 5px 5px;*/
    /*margin-bottom: 10px;*/
  }

  .image-ctn {
    border: 1px #e2e2e2 solid;
    margin: 15px 20px;
    border-radius: 5px;
  }

  .image-ctn img {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  a {
    color: black;
  }

  .item-text {
    /* height:55px; */
    width: 100%;
  }

  .item-text .title {
    font-size: 15px;
    padding: 8px;
  }

  .item-text .intro {
    color: #999;
    text-indent: 20px;
    margin: 0 10px;
    font-size: 12px;
    padding-bottom: 10px;
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
  }

  .tishi {
    width: 100%;
    color: #999;
    margin-top: 100px;
    text-align: center;
    font-size: 36px;
  }
</style>
