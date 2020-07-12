import Vue form 'vue'
import Router form 'vue-router'
import movieRouter from './movie'
import cinameRouter from './ciname'
import mineRouter from './mine'
import adminRouter from './admin'

Vue.use(Router)

export default new Router({
  mode :'history',
  // base:process.env.BASE_URL,
  base:'miaomiao',
  routes:[
    movieRouter,
    cinameRouter,
    mineRouter,
    adminRouter,
    {
      path:'/*',
      redirect:'/movie'
    }
  ]
})
