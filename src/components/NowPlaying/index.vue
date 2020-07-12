<template>
  <div class='movie_body' ref="movie_body">
    <Loding v-if="isLoading" />
    <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
      <ul>
        <li class="pullDown">{{pullDownMsg}}</li>
        <li  v-for=" item in movieList " :key="item.id" >
          <div class='pic_show' @tap="handleToDetail(item.id)">
            <img :src=" item.img|setWH('128.180') " />
          </div>
          <div class='info_list'>
            <h2 @tap="handleToDetail(item.id)">{{item.nm}} <img v-if="item.version" src="@/assets/maxs.png" /> </h2>
            <p>观众评<span class='grade'>  {{item.sc}}</span> </p>
            <p>主演：{{item.star}}</p>
            <p>{{item.showInfo}}</p>
          </div>
          <div class='btn_mall'>
            购票
          </div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
  import Bsroll from 'better-scroll';
  export default{
    name:'NowPalying',
    data(){
      return {
        movieList:[],
        pullDownMsg:'',
        isLoading:true,
        // 上一次请求id
        preCityId:-1
      }
    },
    // mounted 第一次请求加载 activated 切换回来时加载
    activated(){
      var cityId=this.$store.state.city.id;
      if(this.prevCityId===cityId){return}
      this.isLoading=true;
      this.axios.get('api/movieOnInfoList?cityId='+cityId).then((res)=>{
        var msg=res.data.msg;
        if(msg==='ok'){
          this.movieList=res.data.data.movieList;
          this.isLoading=false;
          this.preCityId=cityId;
          // 渲染完毕后进行回调
          /*
          this.$nextTick(()=>{
            var scroll= new BScroll($this.$refs.movie_body,{
              tap:true,
              probeType:1
            });
            // 下滑事件
            scroll.on('scroll',(pos)=> {
              if(pos.y>30){
                this.pullDowning="正在更新中";
              }
              console.log('scroll');
            });
            // 滑动结束事件
            scroll.on('touchEnd',(pos)=>{
              if(pos.y>30){
                this.axios.get('/api/movieOnInfoList?cityId=10').then( (res)=>{
                  var msg=res.data.msg;
                  if(msg==='ok'){
                    this.pullDowning="更新成功";
                    setTimeout(()=>{
                      this.movieList=res.data.data.movieList;
                      this.pullDownMsg='';
                    })
                  }
                })

              }
              console.log('touchend');
            })
          })
        */
        }
      })
    },
    methods:{
      handleToDetail(movieId){
        // console.log("handleToDetail");
        this.$router.push('/movie/detail/'+movieId);
      },
      handleToScroll(pos){
        if(pos.y>30){
          this.pullDowning='正在更新中';
        }
      },
      handleToTouchEnd(pos){
        if(pos.y>30){
          this.axios.get('/api/movieOnInfoList?cityId=10').then( (res)=>{
            var msg=res.data.msg;
            if(msg==='ok'){
              this.pullDowning="更新成功";
              setTimeout(()=>{
                this.movieList=res.data.data.movieList;
                this.pullDownMsg='';
              })
            }
          })

        }
      }
    }
  }
</script>

<style scoped>
  #content .movie_body{
    flex:1;
    overflow:auto;
  }
</style>
