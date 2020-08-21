<template>
  <div class="header">
    <ul>
      <!-- 循环数据在点击调用changeli方法时将当前索引和本条数据传进去,并使用当前数据show的bool值添加或移除样式 -->
      <li :class="[{active:item.show}]" @click="changeli(index,item)" v-for="(item,index) in headerData" :key="index">
        <!-- 在这里打印出boll值方便查看 -->
        {{item.name}}
        <!-- 判断当前这条数据的bool值如果是true就打开二级菜单,如果是false就关闭二级菜单 -->
        <ul v-show="item.show">
          <!-- 循环二级菜单数据并使用.stop阻止冒泡 -->
          <li v-for="(a,index) in item.list" v-on:click.stop="doThis(index)" :key="index">{{a}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        num: 0,
        headerData: [{
          name: '客舱服务',
          list: ['机上升舱', '呼唤铃', '机上餐食', '我的行程', '安全须知'],
          show: true
        }, {
          name: '精彩华夏',
          list: ['品牌介绍', '华夏通程', '航线特惠', '华夏文化'],
          show: true
        }, {
          name: '娱乐',
          list: ['影视', '音乐', '游戏', '阅读'],
          show: true
        }]
      }
    },
    methods: {
      changeli: function (ind, item) {
        // 先循环数据中的show将其全部置为false,此时模板里的v-if判断生效关闭全部二级菜单,并移除样式
        this.headerData.forEach(i => {
          // 判断如果数据中的headerData[i]的show属性不等于当前数据的show属性那么headerData[i]等于false
          if (i.show !== this.headerData[ind].show) {
            i.show = false
          }
          ;
        })
        // 取反(true或false)
        item.show = !item.show
        console.log(item.name)
      },
      doThis: function (index) {
        alert(index)
      }
    }
  }
</script>
<style lang="less" scoped>

  input {
    text-align: center;
  }

  .header {
    width: 60%;
    /*background-color: rgb(3, 67, 150);*/
    color: #ffffff;
    background-color: #F7F9FC;
    text-align: left;

    > ul {
      width: 100%;
      // @include clearfix;
      font-size: 18px;

      > li {
        width: 100%;
        // border: 1px solid #ffffff;
        cursor: pointer; // float: left;
        color: 20px;
        // text-align: center;
        line-height: 50px;

        &:hover {
          background-color: rgb(20, 72, 141);
        }

        > ul {
          width: 100%;
          font-size: 15px;
          background: rgb(0, 50, 116);

          li {
            &:hover {
              background: rgb(0, 50, 116);
            }
          }
        }
      }

      .active {
        background-color: rgb(20, 72, 141);
      }
    }
  }
</style>
