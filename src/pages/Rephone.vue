<template>
  <div >
    <Nav></Nav>
    <div class="rename">
        <div style="padding: 25px">
          <!-- 11位的数字 -->
          <input id="tel"  type="text" v-model="tel" ref="tel" maxlength="11" onkeyup="value=value.replace(/[^\d]/g,'')">
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
        tel: '',
        orderNum: 0,
        member: [] // 从数据库拿到的加入购物车的商品
      }
    },
    methods: {
      save () {
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/ // 验证是不是以13,15,18,17开头的数字
        // let id = this.$route.query.id
        this.newphone = this.$refs.tel.value
        let _this = this
        if (myreg.test(this.tel)) {
          this.axios({
            method: 'post',
            url: '/api/user/update',
            params: {
              mobile: _this.newphone,
              id: this.$route.query.id
            }
          }).then((res) => {
            console.log(res)
            if (res.data.status === 200) {
              this.$router.push('/account_center')
            }
          })
        } else {
          registryToast.showToast('请输入有效的手机号码！')
        }
      }
    },
    created: function () {
     this.tel = this.$route.query.tel
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
  .rename #tel
    width 100%
    height: 100%;
    display: inline-block
    padding 5px 0
    -moz-box-sizing:border-box;
    border-bottom 1px #f2f2f2 solid
    color rgb(58,58,58)
</style>
