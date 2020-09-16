<template>
  <div >
    <Nav></Nav>
    <div class="rename">
        <div style="padding: 25px">
          <!-- 只能输入汉字 -->
          <input id="name"  type="text" v-model="name" ref="name" @change="changeEvent()" οnkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,'')">
        </div>
        <div style="padding: 20px 50px">
            <cube-button type="submit" style="background: linear-gradient(180deg,#349ffd,#027eea);" @click="save">保 存
            </cube-button>
        </div>
    </div>
  </div>
</template>
<script>
  import Nav from '../components/common/Nav.vue'
  import registryToast from '../components/common/toast/index'
  export default {
    data() {
      return {
        name: '',
        // newname: '',
        userInfo: '',
        orderNum: 0,
        verification: '',
        member: [] // 从数据库拿到的加入购物车的商品
      }
    },
    methods: {
      changeEvent () {
        // console.log(this.input)
      },
      save () {
          this.newname = this.$refs.name.value
          console.log(this.newname) // input框接收一个传过来的座位号，编辑以后获取
          let _this = this
          if (this.newseat !== '') {
            this.axios({
              method: 'post',
              url: '/api/user/update',
              params: {
                name: _this.newname,
                id: this.$route.query.id
              }
            }).then((res) => {
              console.log(res)
              if (res.data.status === 200) {
                this.$router.push('/account_center')
              }
            })
          } else {
            registryToast.showToast('姓名不能为空！')
          }
      }
    },
    created: function () {
      // this.id = this.$route.query.id
      this.name = this.$route.query.name
      // var userInfo = localStorage.getItem('userInfo')
      // this.userInfo = JSON.parse(userInfo)
      // // this.name = userInfo.name
      // console.log(this.userInfo)
     // 获取个人信息接口
      // this.axios.get('/api/user/userInfo?id=' + this.$route.query.id).then(res => {
      //   console.log(res)
      //   if (res.data.status === 200) {
      //     if (res.data.data !== null) {
      //       this.member = res.data.data
      //       this.id = res.data.data.id
      //       this.tel = res.data.data.mobile
      //       this.name = res.data.data.name
      //       this.seat = res.data.data.seatNo
      //     }
      //   } else {
      //     console.error('用户数据获取失败')
      //   }
      // })
    },
    components: {
      Nav
    }
  }
</script>
<style type="text/css">
  .rename input {
    border: 0;   /*去除未选中状态边框*/
    outline: none;  /* 去除选中状态边框 */
    background-color: rgba(0, 0, 0, 0); /* 透明背景 */
  }
</style>
<style lang="stylus" rel="stylesheet/stylus">
  .rename
    width 100%
  .rename #name
    width 100%
    height: 100%;
    display: inline-block
    padding 5px 0
    -moz-box-sizing:border-box;
    border-bottom 1px #f2f2f2 solid
    color rgb(58,58,58)
</style>
