<template>
  <div
    class='ht-line'
    ref='canvas'
  >
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'ht-line',
  data () {
    return {

    }
  },
  props: {
    data: null,
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
    this.createdCanvas()
  },
  methods: {
    createdCanvas () {
      if (this.canvas) {
        this.labels = []
        this.values = []
        this.canvas.clear()
      }
      this.canvas = echarts.init(this.$refs.canvas)
      let options = {
        tooltip: {
          trigger: 'axis'
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
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: 1000,
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
            }
          },
          {
            type: 'value',
            min: 0,
            max: 1000,
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
            }
          }
        ],
        series: [
          {
            name: '已采纳',
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
                  // color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  //   offset: 0,
                  //   color: 'rgba(7,44,90,0.3)'
                  // }, {
                  //   offset: 1,
                  //   color: 'rgba(0,146,246,0.9)'
                  // }]),
                }
              }
            },
            markPoint: {
              itemStyle: {
                normal: {
                  color: 'red'
                }
              }
            },
            data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330]
          },
          {
            name: '浏览量',
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
                  // color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  //   offset: 0,
                  //   color: 'rgba(7,44,90,0.3)'
                  // }, {
                  //   offset: 1,
                  //   color: 'rgba(114,144,89,0.9)'
                  // }]),
                }
              }
            },
            data: [150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190]
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
}
</style>