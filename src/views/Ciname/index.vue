<temple>
  <div id='main' >
    <Header title="喵喵电影" />
      <div class='content'>

      </div>
      <CliList />
    <TabBar />
  </div>
</temple>
<script>
  import Header from '@/components/Header';
  import TabBar from '@/components/TabBar';
  import CiList from '@/components/CliList'
  export default{
    name:'Ciname',
    components:{
      Header,
      TabBar,
      CiList
    }
  }
</script>
