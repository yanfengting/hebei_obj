<template>
  <div >
    <Nav></Nav>
    <div class="rename">
        <div style="padding: 25px">
          <input id="name"  type="text" v-model="userInfo.name" ref="name" @change="changeEvent()">
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
          this.axios({
            method: 'post',
            url: '/api/user/login',
            data: {
            'name': _this.newname
            }
        }).then((res) => {
            console.log(res)
            // this.verification = res.verification
            // if (res.data.status === 200) {
            //   this.loginForm.token = res.data.data
            //   localStorage.setItem('userInfo', JSON.stringify(this.loginForm)) // JSON.stringify 将JSON转为字符串存到变量里
            //   this.$router.push({ path: '/main' })
            //   registryToast.showToast('登录成功')
            // }
            this.$router.push('/account_center')
            })
      }

    },
    created: function () {
      var userInfo = localStorage.getItem('userInfo')
      this.userInfo = JSON.parse(userInfo)
      this.name = userInfo.name
      console.log(this.userInfo)
      // let name = this.$route.params.paramsName // 获取传入参数的值 不是router 而是route
      // console.log(name)
      this.axios({
        method: 'post',
        url: '/api/user/login',
        params: {
          'name': this.userInfo.name
        }
      }).then((res) => {
        console.log(res)
        this.verification = res.verification
        // if (res.data.status === 200) {
        //   this.loginForm.token = res.data.data
        //   localStorage.setItem('userInfo', JSON.stringify(this.loginForm)) // JSON.stringify 将JSON转为字符串存到变量里
        //   this.$router.push({ path: '/main' })
        //   registryToast.showToast('登录成功')
        // }
        })
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
