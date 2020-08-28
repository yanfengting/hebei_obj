<template>
  <div >
    <Nav></Nav>
    <div class="rename">
        <div style="padding: 25px">
          <input id="seat"  type="text" v-model="userInfo.seat" ref="name" >
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
        userInfo: ''
      }
    },
    methods: {
      save () {
        this.$router.push('/account_center')
      }
    },
    created: function () {
      var userInfo = localStorage.getItem('userInfo')
      console.log(userInfo)
      this.userInfo = JSON.parse(userInfo)
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
  .rename #seat
    width 100%
    height: 100%;
    display: inline-block
    padding 5px 0
    -moz-box-sizing:border-box;
    border-bottom 1px #f2f2f2 solid
    color rgb(58,58,58)
</style>
