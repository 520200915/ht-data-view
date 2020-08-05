<template>
  <div
    class='map-box'
    ref="map"
  >
  </div>
</template>

<script type='text/ecmascript-6'>
import china from '@p/map/china.json'
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
      let options = {
        geo: {
          show: true,
          label: {
            show: true,
            align: 'center',
            color: '#333',
            verticalAlign: 'top',
            fontSize: 8,
          },
          map: mapName,
          regions: [
            nanhai
          ],
          roam: 'move',
          zoom: 1.22
        },
        series: [],
      }
      map.setOption(options)
      map.on('click', val => {
        let {
          name
        } = val
        this.cityName = this.cityName == name ? null : name
        let regions = [nanhai]
        let item = {
          name: name,
          selected: true
        }
        if (this.cityName) regions = [...regions, item]
        options.geo.regions = regions
        map.setOption(options)
        let adcode = null
        if (this.cityName) {
          try {
            china.features.forEach(e => {
              if (e.properties.name == name) {
                throw e.properties.adcode
              }
            })
          } catch (error) {
            adcode = error
          }
        }
        this.$emit('click', adcode)
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