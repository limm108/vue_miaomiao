import Vue from 'Vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'


Vue.config.productionTip=false

new Vue({
	el:'#app',
	router,
	components:{APP},
	template:'<APP/>'
})
