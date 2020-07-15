import Box from './Box.vue'
import HtMap from './HtMap.vue'
import HtLine from './HtLine.vue'
import Radar from './Radar.vue'

const components = [
  Box,
  HtMap,
  HtLine,
  Radar
]
const GlsxVueComponents = {}
GlsxVueComponents.install = Vue => {
  components.map(component => Vue.component(component.name, component))
}
if (typeof window !== 'undefined' && window.Vue) GlsxVueComponents.install(window.Vue)
export default GlsxVueComponents