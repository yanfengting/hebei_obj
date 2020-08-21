<template>
  <div id="musicapp">
    <Nav></Nav>
    <div class="music-bak">
      <div class="music-title">{{this.$store.state.musicName}}</div>
      <!-- 歌词 -->
      <div class="lyric-content" v-if="this.$store.state.lyric && lines">
        <scrollyic class="lyric-wrapper" ref="lyricList" :data="this.$store.state.lyric && lines">
          <div>
            <div class="lyric">
              <p v-for="(line,index) in lines" ref="lyricLine"
                 :class="{'current':currentLineNum===index}"
                 class="text" v-bind:key="index">{{line.txt}}</p>
            </div>
          </div>
        </scrollyic>
      </div>
      <div class="lyric-content" v-else>
        暂无歌词
      </div>
      <!-- 进度条 -->
      <div id="musicPlayBtns">
        <div class="btn-op">
          <div class="progress">
            <span>{{this.$store.state.timeNow}}</span>
            <div class="progress-full" ref='progressContent'>
              <div class="progress-cur" ref="progress" :style="{'width': this.$store.state.intDfb}">
              </div>
              <span ref="thunk" class="progress-img" alt=""></span>
            </div>
            <span>{{this.$store.state.timeDuration}}</span>
          </div>
        </div>
        <div class="play-btn">
          <!--  1 循环播放 2 随机播放  3 单曲循环 -->
          <div class="play-style play-set" @click="changePlayType(2)" v-if="this.$store.state.playType === 1"></div>
          <div class="play-style play-sj" @click="changePlayType(3)" v-if="this.$store.state.playType === 2"></div>
          <div class="play-style play-cf" @click="changePlayType(1)" v-if="this.$store.state.playType === 3"
               style=""></div>
          <div class="music-btns">
            <div class="icon-img prev_" @click="preMusic"></div>
            <div @click="startPlayOrPause" class="icon-img center-play pause_" v-if="this.$store.state.playFlag"></div>
            <div @click="startPlayOrPause" class="icon-img center-play start_" v-else></div>
            <div @click="nextMusic" class="icon-img next_"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
  </div>
</template>
<script>
  import Nav from '../components/common/Nav.vue'
  import Scrollyic from '../components/scroll/Scrollyic.vue'
  import Lyric from 'lyric-parser'
  import 'swiper/dist/css/swiper.min.css' // 引用css

  export default {
    data() {
      return {
        progressContent: {},
        progress: {},
        thunk: {},
        salesArr: [],
        lines: [],
        value: 4,
        min: 0,
        max: 0,
        height: '',
        currentLineNum: 0,
        lyric: null
      }
    },
    created: function () {
      // let id = this.$route.query.id
    },
    mounted() {
      this.height = `${document.documentElement.clientHeight}` + 'px'
      this.max = this.$store.state.duration
      // let id = this.$route.query.id
      let keep = this.$route.query.keep
      // color="#00acec"
      let music = this.getPlayMusic()
      if (!keep) {
        this.$store.commit('playMusic', { 'src': music.src, 'musicName': music.name, 'duration': music.duration })
      }
      this.getLyric()
      this.progress = this.$refs.progress
      this.progressContent = this.$refs.progressContent
      this.thunk = this.$refs.thunk
      let _this = this
      let _left = this.progressContent.offsetLeft
      let _width = this.progressContent.offsetWidth
      let bl = 0
      let seek = false
      // 监听颜色进度条是否触摸拖动
      this.thunk.addEventListener('touchmove', (event) => {
        const events = event.targetTouches[0].pageX - _left // 获得触摸拖动的距离
        bl = (events / _width)
        this.progress.style.width = `${bl * 100}%` // 计算进度条所在比例宽度
        _this.pauseMusic()
        seek = true
      })

      // 监听颜色进度条是否触摸拖动结束
      this.thunk.addEventListener('touchend', () => {
        let pre = bl * _this.$store.state.duration
        _this.startMusic(pre, seek)
        seek = false
      })
      this.progressContent.addEventListener('touchstart', (event) => {
        console.log(event.targetTouches[0].pageX)
        const events = event.targetTouches[0].pageX - _left
        let bl = (events / _width)
        this.progress.style.width = `${bl * 100}%` // 计算进度条所在比例宽度
        let pre = bl * _this.$store.state.duration
        _this.startMusic(pre, true)
      })
    },
    methods: {
      getPlayMusic() {
        let musicStr = sessionStorage.getItem('curMusic')
        return JSON.parse(musicStr)
      },
      getLyric() {
        // 播放歌词play()
        // 暂停歌词stop()
        // 歌词跳转seek(startTime)
        // 切换播放/暂停状态 togglePlay()
        // const _this = this
        // debugger
        // if (this.$store.lyric) {
        //   this.$store.lyric.stop()
        // }
        // if (this.$store.state.lyric) {
        //   this.$store.state.lyric.stop()
        // }
        this.initLyric()
      },
      initLyric() {
        let _this = this
        let music = this.getPlayMusic()
        // music.lyrics = music.lyrics.replace('/cancrieasproxy/music', '')
        this.axios.get(music.lyrics).then(response => {
          if (response.status === 200) {
            // _this.$store.state.lyric = null
            _this.$store.state.lyric = this.instanceLyric(response.data, _this.handleLyric)
            // _this.$store.state.lyric.play()
          }
        })
      },
      instanceLyric(data, handle) {
        this.lyric = new Lyric(data, handle)
        // 调用this.lyric.play()方法时，进行歌词播放，引起Lyric实例对象（这里是this.lyric）的lineNum改变。当lineNum改变时，触发回调函数this.handleLyric。
         // 如果当前歌曲为播放状态，调用歌词对象的播放方法，播放歌词
        if (this.$store.state.playFlag === true) {
            this.lyric.play()
        }
        return this.lyric
      },
      changePlayType: function (type) {
        this.$store.state.playType = type
      },
      // 在回调函数中，我们需要得到当前播放的歌词行数（this.currentLineNum），并且实现歌词面板的滚动（使用Scroll组件实现滚动），使当前播放的歌词始终在屏幕中间位置。
      handleLyric({ lineNum, txt }) {
        let _this = this
        // setTimeout(function() {
          _this.currentLineNum = lineNum
          // 若当前行大于5,开始滚动,以保歌词显示于中间位置
          if (lineNum > 5) {
            let lineEl = _this.$refs.lyricLine[lineNum - 5]
            // 结合better-scroll，滚动歌词
            _this.$refs.lyricList.scrollToElement(lineEl, 1000)
          } else {
            _this.$refs.lyricList.scrollToElement(0, 0, 1000)
          }
        // }, 100)
      },
      pauseMusic() {
        this.$store.state.lyric.stop()
        let audio = document.getElementById('music')
        audio.pause()
        this.$store.state.playFlag = false
      },
      startMusic(pre, seek) {
        let audio = document.getElementById('music')
        // debugger
        if (seek) {
          audio.currentTime = pre
          this.$store.state.lyric.seek(parseInt(pre * 1000))
        } else {
          this.$store.state.lyric.togglePlay()
        }
        audio.play()
        this.$store.state.playFlag = true
      },
      startPlayOrPause() {
        
        let audio = document.getElementById('music')
        // debugger
        if (this.$store.state.playFlag) {
          // audio.currentTime = 0
          audio.pause()
          this.$store.state.playFlag = false
          this.$store.state.lyric.stop()
        } else {
          this.$store.state.playFlag = true
          audio.play()
        }
        if (this.$store.state.lyric) {
           // 歌曲暂停时，歌词暂停播放
          this.$store.state.lyric.togglePlay()
        }
        // audio.play();// 这个就是播放
        // this.$store.state.playFlag = false
        // this.$store.commit('playMusic', { 'src': this.$store.state.playMusic, 'musicName': this.$store.state.musicName })
      },
      preMusic() {
        if (this.$store.state.lyric) {
          this.$store.state.lyric.seek(0)
          // this.$store.state.lyric.stop()
        }
        this.$store.commit('prevMusic')
        this.getLyric()
      },
      nextMusic() {
        if (this.$store.state.lyric) {
          // 播放完成 重置歌词
          this.$store.state.lyric.seek(0)
          // this.$store.state.lyric.stop()
        }
        this.$store.commit('nextMusic')
        this.getLyric()
      }
    },

    computed: {
      isFollow() {
        return this.$store.state.lyric // 需要监听的数据
      }
    },
    // 解决bug:暂停歌曲之后，切换模式，歌曲会继续播放
    watch: {
      isFollow(newVal, oldVal) {
        // console.error('11111')
        if (newVal !== oldVal) {
          this.initLyric()
          this.lines = newVal.lines
        }
        // 解决歌词跳动的bug，因为new Lyric中定时器，切换歌曲时候，清除定时器
        // if (this.$store.state.lyric) {
        //   this.$store.state.lyric.stop()
        //   this.$store.state.lyric = null
        //   this.currentLineNum = 0
        //   this.currentTime = 0
        // }
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          // this.$refs.audio.play()
          this.initLyric()
        }, 1000)
      }
    },
    components: {
      Nav, Scrollyic
    }
  }
</script>
<style lang="stylus">
  .play-set
    background: url('../assets/images/play_set.png') no-repeat center center;
    background-size: 100% 100%

  .play-sj
    background: url('../assets/images/play_sj.png') no-repeat center center;
    background-size: 100% 100%

  .play-cf
    background: url('../assets/images/play_cf.png') no-repeat center center;
    background-size: 100% 100%

  .prev_
    background: url('../assets/images/prev_.png') no-repeat center center;
    background-size: 100% 100%

  .pause_
    background: url('../assets/images/pause_.png') no-repeat center center;
    background-size: 100% 100%

  .start_
    background: url('../assets/images/start_.png') no-repeat center center;
    background-size: 100% 100%

  .next_
    background: url('../assets/images/next_.png') no-repeat center center;
    background-size: 100% 100%

  #musicapp
    overflow hidden
    height: 100%

  .lyric-content
    height: 55%;
    display: flex;
    flex-direction row;
    justify-content: center;
    align-items: center;

  .progress-img
    width: 10px
    height: 10px;
    background: #fff
    border-radius: 10px

  #musicPlayBtns
    height: 200px;
    display: flex
    flex-direction column
    bottom 20px
    width 100%
    max-width: 720px;

  .play-style
    width: 30px;
    height: 20px;

  .btn-op
    width: 90%
    padding: 10px 0px;
    display: flex
    flex-direction row
    margin 0 auto;
    align-items center
    justify-content: space-between

  .progress
    display: flex
    flex-direction row
    width 100%
    justify-content: space-between
    align-items: center
    padding: 10px 0px
    color #5c81bc
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;

  .progress-full
    width: 100%
    height: 4px;
    background: #5c81bc
    margin: 0px 5px;
    border-radius: 4px;
    display flex
    align-items center

  .progress-cur
    height: 4px;
    background: #00acec
    border-radius: 4px;

  .music-title
    height: 5%
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

  .music-bak
    width: 100%
    max-width: 720px;
    /*padding-top 100px;*/
    color: #fff
    text-align center
    vertical-align middle
    height: 100%;
    background: url("../assets/images/music_bak.png") no-repeat 100% 100%
    -webkit-background-size: 100% 100%
    background-size: 100% 100%
    background-position-y: -40px
    display: flex
    flex-direction column
    justify-content: center
    align-items center

  .music-btns
    width: 60%;
    display flex;
    position: relative
    flex-direction row;
    justify-content space-between
    align-items center
    margin: 0 auto;

  .play-style
    position: absolute;
    width: 35px;
    height: 30px;
    bottom: 15px;
    left: 15px;

  .play-btn
    position: relative

  .icon-img
    width: 40px;
    height: 40px;

  .center-play
    width: 60px;
    height: 60px;

  .music-icon::before
    font-size 35px
    color #aaa

  .lyric-wrapper
    overflow hidden
    height: 95%;

  .current
    color #5c81bc
</style>
