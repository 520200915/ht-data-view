<template>
  <div class='radar'>
    <div
      ref='radar'
      class='radar-canvas'
    ></div>
    <div class="radar-title">{{title}}</div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'Radar',
  data () {
    return {
      title: '',
      canvas: null
    }
  },
  props: {
    listData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isRowIndex: {
      type: Array,
      default: []
    }
  },
  mounted () {
    // this.draw(this.listData)
  },
  watch: {
    'listData' (n, o) {
      if (Object.keys(n).length > 0) this.draw(this.listData)
    }
  },
  methods: {
    draw (obj) {
      let data = obj.data
      let indicator = obj.indicator
      this.title = data[0].name
      this.canvas = echarts.init(this.$refs.radar)
      data[0].value.forEach((e, i) => {
        indicator[i].value = e
        indicator[i].index = i
      })
      let options = {
        tooltip: {
          show: true,
          trigger: 'item'
        },
        radar: {
          radius: '50%',
          splitNumber: 4,
          center: ['50%', '45%'],
          startAngle: 0,
          shape: "circle",
          name: {
            formatter: '{value}',
            textStyle: {
              fontSize: '14px',
              color: '#fff'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255, 255, 255, 0.2)"
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              width: 1,
              color: 'rgba(255, 255, 255, 0.2)'
            }
          },
          splitArea: false,
          indicator: indicator
        },
        series: [{
          type: 'radar',
          symbolSize: 0,
          areaStyle: {
            color: 'rgb(255,176,0)'
          },
          lineStyle: {
            color: 'rgb(255,176,0)'
          },
          data: data
        }]
      }
      this.canvas.setOption(options)
    }
  }
}
</script>

<style scoped lang='scss'>
.radar {
  width: 100%;
  height: 100%;
  position: relative;
  &-canvas {
    width: 100%;
    height: 100%;
  }
  &-title {
    position: absolute;
    left: 0;
    bottom: 0.1rem;
    width: 100%;
    text-align: center;
    font-size: 0.14rem;
    color: #8e99a6;
  }
}
</style>