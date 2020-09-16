<template>
  <div class="account-center">
    <Nav></Nav>
    <div class="account-center-top" >
      <div class='person' ></div>
      <div>您好，{{name}}</div>
      <div v-if="member != 0"
           style="font-size:13px;color:rgb(255,203,0);margin-top:5px; line-height: 5vw;">
        <div>会员 {{grade}}</div>
        <div>积分 {{integral}}</div>
      </div>
      <div v-else
           style="font-size:13px;color:rgb(149,198,251);margin-top:5px; line-height: 5vw;">
        <div>游客</div>
      </div>
    </div>
    <!-- v-if="token=0" -->
    <div class="b-bo">
      <div class="t-content">
        <div class="line"><span>姓名</span>
          <input id="name" readonly type="text" v-model="name">
          <a class="mui-action-back mui-icon mui-icon-back" v-if="!online"   @click="rename">
            <div class="line_img"></div> 
          </a>
        </div>
        <div class="line line-centet"><span>座位号</span>
          <input id="seat" readonly v-model="seat" type="text">
            <a class="mui-action-back mui-icon mui-icon-back" v-if="!online" @click="reseat">
              <div class="line_img"></div>
            </a>
        </div>

        <div class="line"><span>联系方式</span>
          <input id="tel" readonly type="text" v-model="tel">
          <a class="mui-action-back mui-icon mui-icon-back" v-if="!online" @click="rephone">
            <div class="line_img"></div>
          </a>
        </div>
      </div>
    </div>
    <div class="b-bo-b">
      <div class="b-center">
        <div @click="accountOrder" class="line left15" >
          <span>我的订单
          <img v-if="orderNum>0" class="logo-right" style="width: 8px; height: 8px;margin-top: 16px;"
              src="../assets/images/hongdian.png">
          </span>
          <input type="text" value="" disabled="disabled">
          <a class="mui-action-back mui-icon mui-icon-back">
            <div class="line_img"></div>
          </a>
        </div>
      </div>
    </div>
    <div><img v-if="member == 0"
           @click="registeredMember"
           src="../assets/images/registered_member.jpg"
           alt=""></div>
  </div>
</template>
<script>
  import Nav from '../components/common/Nav.vue'
  import registryToast from '../components/common/toast/index'

  export default {
    data() {
      return {
        grade: 0,
        integral: 0,
        msg: '',
        userInfo: '',
        orderNum: 0,
        member: [], // 从数据库拿到的加入购物车的商品
        online: true,
        id: '',
        tel: '',
        name: '',
        seat: ''
      }
    },
    methods: {
      rename () {
        this.$router.push({ path: '/rename', query: {'id': this.id, 'name': this.name} })
      },
      reseat () {
        this.$router.push({ path: '/reseat', query: {'id': this.id, 'seat': this.seat} })
      },
      rephone () {
        this.$router.push({ path: '/rephone', query: {'id': this.id, 'tel': this.tel} })
      },
      accountOrder: function () {
        // console.log('我的订单')
        this.$router.push('/account_order')
      },
      registeredMember () {
        if (this.online === true) {
          this.$router.push('/registered_member')
        } else {
          registryToast.showToast('离线状态下不能注册会员哦')
        }
      }
    },
    created: function () {
      var userInfo = localStorage.getItem('userInfo')
      this.userInfo = JSON.parse(userInfo)
      // let name = this.$route.params.paramsName // 获取传入参数的值 不是router 而是route
      // console.log(name)
      // console.log(this.userInfo)
      // 判断在线状态/离线状态
      let _this = this
      this.axios.get('/api/4g/status', { emulateJSON: true })
        .then(function (res) {
          // console.log(res)
          // 登录后跳转的页面
          if (res.data.status === 200) {
            // registryToast.showToast('网络连接成功')
            _this.online = true
          } else {
            // registryToast.showToast('离线状态')
            _this.online = false
          }
        }, function (error) {
          console.error('请求失败', error)
        })

      // 请求订单数据
      this.axios({ method: 'post', url: 'api/order/unfinished' }).then((res) => {
        // console.log(res)
        if (res.status === 200) {
          this.orderNum = res.data.data
          // this.giftArr = res.data.data
        } else {
          console.error('订单数据获取失败，请刷新重试')
        }
      })
      // 请求会员数据 判断如果手机号存在于数据库，提示已经注册会员
      this.axios.get('/api/member/get?phone=' + this.userInfo.tel).then(res => {
        // console.log(res)
        if (res.data.status === 200) {
          if (res.data.data !== null) {
            this.member = res.data.data
            this.grade = res.data.data.grade
            this.integral = res.data.data.integral
          }
        } else {
          console.error('会员数据获取失败')
        }
      })
      // 获取个人信息接口
      this.axios.get('/api/user/userInfo?id=' + this.userInfo.token).then(res => {
        console.log(res)
        if (res.data.status === 200) {
          if (res.data.data !== null) {
            this.member = res.data.data
            this.id = res.data.data.id
            this.tel = res.data.data.mobile
            this.name = res.data.data.name
            this.seat = res.data.data.seatNo
          }
        } else {
          console.error('用户数据获取失败')
        }
      })
    },
    components: {
      Nav
    }
  }
</script>
<style type="text/css">
  .account-center input {
    border: none;
  }
</style>
<style lang="stylus" rel="stylesheet/stylus">

  .person
    height: 100px;
    width: 100px;
    margin: 10px auto;
    // margin-top: 20%;
    background-image url(../assets/images/avatar.png)
    background-repeat no-repeat
    background-size cover

  .account-center
    background-color #f7f9fc
    height: 100%;

  .account-center-top
    width 100%;
    text-align center
    color #fff
    padding: 50px 0;
    // height 37%;
    background-image url("../assets/images/center.png")
    background-repeat no-repeat
    background-size cover
    // 把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。
    // 背景图像的某些部分也许无法显示在背景定位区域中。
  .account-center-top img
    width: 100px;
    margin-top: 45px;

  .b-bo
    width 100%
    border-top 1px #f2f2f2 solid
    border-bottom 1px #f2f2f2 solid
    background #fefefe

  .b-bo-b
    width 100%
    margin-top 10px
    border-top 1px #f2f2f2 solid
    border-bottom 1px #f2f2f2 solid
    background-color #fff

  .b-content
    background #fefefe
    padding-left 20px;
    margin-left 15px

  .t-content
    background #fefefe
    margin-left 15px
  .left15
    margin-left: 15px
  .line-centet {
    border-top 1px #f2f2f2 solid
    border-bottom 1px #f2f2f2 solid
  }

  .line
    padding 10px auto;
    color #323232;
    font-size 15px;
    line-height 45px
    display flex;
    flex-direction row
    align-items: center;
  .line_img
    height: 100%;
    width: 100%;
    background-repeat no-repeat
    background-image url('../assets/images/right.png')
    // background-size cover
    margin-top: 3px;
    background-size: 13px 18px;

  .line .line_img
    // width: 7px;
    // height: 13px;
    // position relative
    // right 15px
    // // top 16px

  .line > span {
    display flex
    flex-direction row
    width 40%
  }

  .line > span div
    width 13px
    height 13px
    background-color red
    border-radius 10px
    text-align center
    font-size 12px
    color #fff
    padding-top 1px

  .line > a
    color #c1c1c1;
    margin-right 10px

  .line input {
    width 60%;
    text-align right;
    color #c1c1c1;
    background #fff;
    margin-right: 15px
  }
</style>
