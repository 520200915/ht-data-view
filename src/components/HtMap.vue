<template>
  <div
    class='map-box'
    ref="map"
  >
  </div>
</template>

<script type='text/ecmascript-6'>
import china from '@p/map/china.json'
import mapId from '@p/map/mapId.js'
const nanhai = {
  name: "南海诸岛",
  itemStyle: {
    opacity: 0
  },
  label: {
    show: false
  }
}
export default {
  name: 'HtMap',
  props: {

  },
  data () {
    return {
      mapName: 'china',
      cityName: null
    }
  },
  mounted () {
    this.chinaConfigure(this.mapName, china)
  },
  watch: {

  },
  methods: {
    chinaConfigure (mapName, data) {
      echarts.registerMap(mapName, data)
      const map = echarts.init(this.$refs.map)
      // window.onresize = map.resize
      let options = {
        geo: {
          show: true,
          label: {
            show: true,
            align: 'center',
            color: '#333',
            verticalAlign: 'top',
          },
          map: mapName,
          regions: [
            nanhai
          ],
          roam: 'move'
        },
        series: [
          {
            type: 'map',
            data: [
              {
                name: '四川省',
                value: 100
              },
              {
                name: '上海市',
                value: 10
              },
              {
                name: '北京市',
                value: 30
              }
            ]
          }
        ]
      }
      map.setOption(options)
      map.on('click', val => {
        this.cityName = this.cityName == val.name ? null : val.name
        let regions = [nanhai]
        let item = {
          name: val.name,
          selected: true
        }
        if (this.cityName) regions = [...regions, item]
        options.geo.regions = regions
        map.setOption(options)
        let adcode = null
        if (this.cityName) {
          try {
            china.features.forEach(e => {
              if (e.properties.name == val.name) {
                throw e.properties.adcode
              }
            })
          } catch (error) {
            adcode = error
          }
        }
        this.$emit('click', this.cityName ? adcode : null)
      })

    },

  }
}
</script>

<style scoped lang='scss'>
.map-box {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
</style>  