<template>
  <div id="detailContrainer" class="slider-enter-active" >
    <Header title="影视详情">
      <i class='iconfont icon-right' @touchstart='handleToBack' ></i>
    </Header>
    <Loding v-if="isLoding" />
    <div v-else id='content' class="contentDetail">
      <div class='detail_list'>
        <div class='detail_list_bg' :style="{'background-image' : 'url('+detailMovie.img.replace(/w\.h/,'148.208')+')' }" ></div>
        <div class='detila_list_filter'></div>
        <div class='detail_list_content'>
          <div class="detail_list_img">
            <img :src="detailMovie.img | setWH('148.208') " />
          </div>
          <div class='detail_list_info'>
            <h2>{{detailMovie.nm}}</h2>
            <p>{{detailMovie.enm}}</p>
            <p>{{detailMovie.sc}}</p>
            <p>{{detailMovie.cat}}</p>
            <p>{{detailMovie.src}} / {{detailMovie.dur}} 分钟</p>
            <p>{{detailMovie.pubDesc}}</p>
          </div>
        </div>
        <div class="detail_info">
          <p>{{detailMovie.dra}}</p>
        </div>
        <div class="detail_player   swiper-container " ref="detail_player" >
          <ul class="swiper-wrapper">
            <li v-for="(item,index) in detailMovie.photos " :key="index" class="swiper-slider">
              <div>
                <img :src="item| setWH('140.70') " alt='' />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "@/components/Header";
  export default{

    name:'Detail',
    data(){
      return [
        detailMovie:{},
        isLoding:true
      ]
    },
    components:{
      Header
    },
    props:['movieId']
    methods:{
      handleToBack(){
        this.$router.back();
      }
    },
    mounted(){
      // console.log(this.movied);
      this.axios.get('/api/detailmovie?movieId='+this.movieId).then((res)=>{
        var msg=res.data.msg;
        if(msg==='ok'){
          this.detailMovie=res.data.data.detailMovie;
          this.isLoding=false;
          // setTimeout(()=>{
          // },2000);
          this.$nextTick(()=>{
            new Swiper(this.$refs.detail_player,{
              slidesPerView:'auto',
              freeMode:true,
              freeModeSticky:true
            })
          });

        }
      })
    }
  }
</script>

<style scoped>
  #detailContrainer{ position:absolute;lef:0;top:0;z-index:100;width:100%;min-height:100%;background:wheat }
  #detailContrainer.slider-enter-active{ animation:.3s slideMove; }
  @keyframes slideMove{
    0%{ transform:translatex(100%); }
    100%{ transform: translatex(0); }
  }
</style>
