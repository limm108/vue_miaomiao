<temple>
  <div id='main' >
    <Header title="喵喵电影" />
    <div id="content">
      <router-view />
    </div>
    <TabBar />
  </div>
</temple>
<script>
  import Header from '@/components/Header';
  import TabBar from '@/components/TabBar';
  export default{
    name:'Mine',
    components:{
      Header,
      TabBar,
      Login
    }
  }
</script>
<style scoped>

</style>
