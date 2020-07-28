<template>
  <div class='ht-line'>
    <div
      class="canvas-line"
      ref='canvas'
    ></div>
    <div class="title">{{title}}</div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'ht-line',
  data () {
    return {
      canvas: null
    }
  },
  props: {
    list: null,
    title: String,
    days: {
      type: Array,
      default: []
    }
  },
  watch: {
    'days' (newVal, oldVal) {
      if (newVal.length > 0) {
        this.createdCanvas()
      }
    }
  },
  mounted () {
    // this.createdCanvas()
  },
  methods: {
    createdCanvas () {
      if (this.canvas) this.canvas.clear()
      let { list, days } = this
      this.canvas = echarts.init(this.$refs.canvas)
      let options = {
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            let str = ''
            params.map((e, index) => {
              str += `${e.marker}\t${e.seriesName}:\t${e.value}${index === 0 ? '' : '%'}`
              if (index === 0) str += '<br/>'
            })
            return str
          }
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              color: 'rgba(153, 153, 153,0.5)'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(153, 153, 153,0.5)'
              }
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(153, 153, 153,0.5)'
              }
            },
            data: days
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: 'rgba(153, 153, 153,0.5)'
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(153, 153, 153,0.5)'
              }
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(153, 153, 153,0.5)'
              }
            },
          },
          {
            type: 'value',
            min: 0,
            max: 100,
            axisLabel: {
              formatter: '{value}%',
              textStyle: {
                color: 'rgba(153, 153, 153,0.5)'
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(153, 153, 153,0.5)'
              }
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(153, 153, 153,0.5)'
              }
            }
          }
        ],
        series: [
          {
            name: list[0].name,
            type: 'line',
            symbol: 'none',
            smooth: true,
            itemStyle: {
              normal: {
                color: 'rgb(255,176,0)',
                lineStyle: {
                  color: "rgb(255,176,0)",
                  width: 1
                },
                areaStyle: {
                  color: 'rgb(255,176,0)'
                }
              }
            },
            data: list[0].data,
            yAxisIndex: 0
          },
          {
            name: list[1].name,
            type: 'line',
            symbol: 'none',
            smooth: true,
            itemStyle: {
              normal: {
                color: 'rgb(255,136,0)',
                lineStyle: {
                  color: "rgb(255,136,0)",
                  width: 1
                },
                areaStyle: {
                  color: 'rgb(255,136,0)'
                }
              }
            },
            data: list[1].data,
            yAxisIndex: 1
          }
        ]
      }
      this.canvas.setOption(options)
    }
  },
}
</script>

<style scoped lang='scss'>
.ht-line {
  width: 100%;
  height: 100%;
  position: relative;
  .canvas-line {
    width: 100%;
    height: 100%;
  }
  .title {
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