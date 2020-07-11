<template>
  <footer id='footer'>
    <ul>
      <router-link tag='li' to="/movie">
        <i class='iconfont icon-dianying'></i>
        <p>电影</p>
      </router-link>
      <router-link tag='li' to="/cinema">
        <i class='iconfont icon-yingyuan'></i>
        <p>影院</p>
      </router-link>
      <router-link tag='li' to="/mine">
        <i class='iconfont wode'></i>
        <p>我的</p>
      </router-link>
    </ul>
  </footer>
</template>

<script>
  export default{
    name:'Mine'
  }
</script>

<style scoped>
  #footer ul li.router-link-active {
    color:rosybrown;
  }
</style>
