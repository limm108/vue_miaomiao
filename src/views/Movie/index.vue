<temple>
  <div id='main'>
    <Header title="喵喵电影" />
    <div class='content'>
      <div class='movie_menu'>
          <router-link  tag="div" to="/movie/city" class="city_name" >
            <span>{{$store.state.city.nm}}</span><i class='iconfont icon-lower-triangle'></i>
          </router-link>
        <div class='hot_switch'>
          <router-link tag="div" to="/movie/mowPlaying" class='hot_item active'>正在热映</router-link>
          <router-link tag="div" to="/movie/comingSoon" class='hot_item'>即将上演</router-link>
        </div>
        <router-link tag='div' to="/movie/search" class='search_entry'>
          <i class="iconfont icon-sousuo"></i>
        </router-link tag='div' to='"/movie/search'>
      </div>
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <TabBar />
    <router-view name="detail" />
  </div>
</temple>
<script>
  import Header from '@/components/Header';
  import TabBar from '@/components/TabBar';
  // 弹窗
  import {messageBox} from '@/components/JS'
  export default{
    name:'Movie',
    components:{
      Header,
      TabBar
    },
    mounted(){
      setTimeout(()=>{
        this.axios.get('/api/getLocation').then((res)=>{
          var msg=res.data.msg;
          if(msg==='ok'){
            var nm=res.data.data.nm;
            var id=res.dara.data.id;
            if(this.$store.state.city.id==id){return;}
            messageBox({
              title:'定位',
              'content':nm,
              cancel:'取消',
              ok:'切换定位',
              handleCancel(){
                console.log(1);
              },
              handleOk(){
                // console.log(2);
                window.localStorage.setItem('nowNum',nm);
                window.localStorage.setItem('nowId',id);
                window.location.reload();
              }
            });
          }
        });

      },3000)

    }
  }
</script>
<style scoped>
  .movie_menu .hot_item.active{
    color:#BC8F8F;
    border-bottom:2px #BC8F8F solid;
  }
  .movie_menu .hot_item.router-link-active{
    color:#BC8F8F;
    border-bottom:2px #BC8F8F solid;
  }
</style>
