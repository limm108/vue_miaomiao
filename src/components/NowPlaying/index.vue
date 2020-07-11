<template>
  <div class='movie_body'>
    <ul>
      <li>
        <div class='pic_show'>
          <img src='' />
        </div>
        <div class='info_list'>
          <h2>无名之辈</h2>
          <p>观众评<span class='grade'>  9.2</span> </p>
        </div>
        <div class='btn_mall'>
          购票
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default{
    name:'NowPalying'
  }
</script>

<style scoped>
  #content .movie_body{
    flex:1;
    overflow:auto;
  }
</style>
