import Vue from 'Vue'
import App from './App.vue'
import router from './routers'
import Vant from './stores'



Vue.config.productionTip=false

new Vue({
  router,
  stores,
  render:h=>h(App)
}).$mount('#app')
