<template>
  <div >
    <Nav></Nav>
    <div class="rename">
        <div style="padding: 25px">
          <!-- 只能输入英文和数字： -->
          <input id="seat"  type="text" v-model="seat" ref="seat" οnkeyup="value=value.replace(/[\W]/g,'') ">
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
        userInfo: '',
        newseat: '',
        seat: ''
      }
    },
    methods: {
      save () {
        this.seat = this.$route.query.seat
        // let id = this.$route.query.id
        this.newseat = this.$refs.seat.value
        let _this = this
        console.log(this.newseat) // input框接收一个传过来的座位号
        if (this.newseat !== '') {
          this.axios({
            method: 'post',
            url: '/api/user/update',
            params: {
              seatNo: _this.newseat,
              id: this.$route.query.id
            }
          }).then((res) => {
            console.log(res)
            if (res.data.status === 200) {
              this.$router.push('/account_center')
            }
          })
        } else {
          registryToast.showToast('座位号不能为空！')
        }
      }
    },
    created: function () {
      this.seat = this.$route.query.seat
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
