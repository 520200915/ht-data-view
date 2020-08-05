<template>
  <div class='scroll-view'>
    <div class='olt'>
      <div class="scroll-title">
        <template v-for='(i,ind) in listData.title'>
          <div
            :key='ind'
            :style="{flex:`${listData.width[ind] || 1}`}"
          >{{i}}</div>
        </template>
      </div>
      <div
        class='olt-box'
        ref='box'
      >
        <div
          class='scroll-box'
          :style="{top:[`${viewTop}px`]}"
        >
          <div
            class="view-item"
            v-for='(i,index) in listData.data'
            :key='index'
            :style="{height:`${itemHeight}px`,lineHeight:`${itemHeight}px`}"
          >
            <template v-for='(k,ind) in listData.keys'>
              <a
                :key='ind'
                :style="{color:`${listData.color[ind]}`,flex:`${listData.width[ind] || 1}`}"
                :title='i[k]'
              >
                <span :class='{"font-animation":listData.hasAnimation[ind] && i[k].length > 5}'>{{i[k]}}</span>
              </a>

            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="title">{{title}}</div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'scroll-view',
  data () {
    return {
      listData: [],
      viewTop: 0,
      count: 0,
      itemHeight: 0,
      timer: null
    }
  },
  props: {
    list: Object,
    showNumber: {
      type: Number,
      default: 7
    },
    speed: {
      type: Number,
      default: 3
    },
    title: String
  },
  watch: {
    'list' (n, o) {
      if (n) this.setData()
    }
  },
  mounted () {
  },
  methods: {
    setData () {
      if (this.timer) clearInterval(this.timer)
      this.listData = JSON.parse(JSON.stringify(this.list))
      let { clientHeight, offsetHeight } = this.$refs.box
      let boxHeight = clientHeight || offsetHeight
      let { data } = this.listData
      this.itemHeight = parseInt(boxHeight / 7)
      if (data.length > this.showNumber) {
        this.timer = setInterval(() => {
          this.silderMove()
        }, this.speed * 1000)
      }
    },
    silderMove () {
      // this.viewTop = -this.itemHeight * this.count
      if (this.count == this.list.data.length) this.count = 0
      this.listData.data.push(this.list.data[this.count])
      this.listData.data.splice(0, 1)
      this.count++
    }
  }
}
</script>

<style scoped lang='scss'>
@keyframes move {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.scroll-view {
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  .scroll-box {
    position: relative;
    width: 100%;
    transition: all 1s;
  }
  .title {
    font-size: 0.14rem;
    text-align: center;
    color: #8e99a6;
    margin-top: 0.1rem;
  }
  .view-item {
    font-size: 0.18rem;
    box-sizing: border-box;
    position: relative;
    animation: move 0.5s forwards;
    div {
      float: left;
      width: calc(100% - 2.32rem);
      margin-right: 0.47rem;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    a {
      float: left;
      text-indent: 0;
      color: #038fb5;
    }
  }
  .view-item:nth-of-type(even) {
    background: rgba(255, 255, 255, 0.07);
  }
  .view-item::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 0.16rem;
    height: 0.18rem;
    background-size: 100% 100%;
  }
  .scroll-title {
    height: 0.55rem;
    line-height: 0.55rem;
    display: flex;
    position: relative;
    z-index: 2;
    > div {
      flex: 1;
      text-align: center;
      color: #fff;
      font-size: 0.18rem;
    }
  }
  .olt {
    width: 100%;
    height: calc(100% - 0.3rem);
  }
  .olt-box {
    width: 100%;
    height: calc(100% - 0.55rem);
    overflow: hidden;
    .view-item {
      display: flex;
      height: 0.36rem;
      line-height: 0.36rem;
      a {
        flex: 1;
        text-align: center;
        overflow: hidden;
      }
      .font-animation {
        white-space: nowrap;
        display: block;
        animation: 10s wordsLoop linear infinite normal;
      }
    }
    .view-item::before {
      content: "";
      display: none;
    }
  }
}
@keyframes wordsLoop {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>