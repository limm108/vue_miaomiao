import Vue from 'Vue'
import App from './App.vue'
import router from './routers'
import Vant from './stores'

import axios from 'axios'
Vue.prototype.axios=axios

// 图片路径处理
Vue.filter('setWH',(url,arg)=>{
  return url.reopace(/w\.h/,arg);
});
// 全局组件
import Scroller from '@/components/Scroller'
Vue.component('Scroller',Scroller);
// 加载效果
import Loading from '@/components/Loading'
Vue.component('Loading',Loading);

//组件引入
import Element form 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip=false

new Vue({
  router,
  stores,
  render:h=>h(App)
}).$mount('#app')
