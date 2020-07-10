import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'

Vue.use(Router)
const  router= new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login }
    { path: '/home', component: Home,
    redirect:'/welcome',
    children:
    [
      {path:'/welcome',component:welcome},
      {path:'/user',component:users}
      ] }
  ]
});

// 挂在路由守卫
router.beforEach(to,from,next)=>{
  /**
   * to 将要访问的路径
   * from 从哪个路径跳转而来
   * next 放行
   */
  if(to.path==='/login') return next();
  const tokenStr=windoow.sessionStorage.getItem('token');
  if(!tokenStr) return next('/login');
  next();
};

export default router
