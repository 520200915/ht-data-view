import Vue from 'vue'
import App from './App.vue'
import components from '@c/index.js'
import '@u/rem.js'

import { format } from '@u/util.js'
import { request } from '@u/request.js'
Array.prototype.max = function() {
  return Math.max.apply({}, this)
}
const time = Date
time.prototype.format = format
Vue.prototype.Request = request
Vue.config.productionTip = false
Vue.use(components)

new Vue({
  render: h => h(App),
}).$mount('#app')