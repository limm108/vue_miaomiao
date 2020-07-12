
<template>
  <div class='search_body'>
    <div class='search_input'>
      <div class="search_input_wrapper">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" v-mode="message" />
      </div>
    </div>
    <div class="search_result">
      <h3>电视剧</h3>
      <ul>
        <li v-for=" item in moviesList " :key="item.id" >
          <div class='img'> <img :src="item.img | setWH('128.180') " /> </div>

          <div class="info">
            <p> <span>  {{item.nm}}</span>{{item.sc}} </p>
            <p> {{item.enm}}  </p>
            <p> {{item.cat}}  </p>
            <p> {{item.rt}}  </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default{
    name:'Search',
    data(){
      return{
        message:'',
        moviesList:[]
      }
    },
    methods:{
      cancelRequest(){
        if(typeof this.source==='function'){
          this.source('终止请求');
        }
      }
    }
    watch:{
      message(newVal){
        var that=this;
        var cityId=this.$store.state.city.id;
        this.cancelRequest();
        this.axios.get('/api/searchList?cityId='+cityId+'&kw='+newVal,{
          cancelToken: new this.axios.CancelToken(function executor(c){
            that.source=c;
          })
        }).then((res)=>{
          var msg=res.data.msg;
          var movies=res.data.data.movies;
          if( msg&& movies ){
            this.moviesList=res.data.data.movie.list;
          }
        }).catch((err)=>{
          if(this.axios.isCannel(err)){
            console.log(err.message);
          }else{
            console.log(err);
          }
        });
      }
    }
  }
</script>

<style>
</style>
