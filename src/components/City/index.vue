<template>
  <div class='city_body'>
    <div class='city_list'>
      <Loding v-if="isLoading" />
      <Scroller v-else ref="city_list">
       <div>
          <div class='city_hot'>
            <h2>热门城市</h2>
            <ul class='clearfix'>
              <li v-for=" item in hotList " :key=" item.id " @tap="handleToCity(item.nm,item.id)" > {{item.nm}} </li>
            </ul>
          </div>
          <div class='city_sort' ref="city_sort">
            <div v-for="item in cityList " :key="item.index" >
              <h2>{{item.index}}</h2>
              <ul>
                <li v-for="itemList in item.list" :key="itemList.id" @tap="handleToCity(itemList.nm,itemList.id)" > {{itemList.nm}} </li>
              </ul>
            </div>
          </div>
      </div>
      </Scroller>
    </div>
    <div class='city_index'>
      <ul>
        <li v-for=" (item,index) in cityList " :key=" item.index " @touchstart="handleToIndex(index)" >{{item.index}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default{
    name:'City',
    data(){
      return {
        cityList:[],
        hotList:[],
        isLoading:true
      }
    },
    mounted(){
      var cityList=window.localStorage.getItem('cityList');
      var hotList=window.localStorage.getItem('hotList');
      if(cityList && hotList ){
        this.cityList=JSON.parse(cityList);
        this.hotList=JSON.parse(hotList);
        this.isLoading=false;
      }else{
        this.axios.get('/api/cityList').then((res)=>{
          // console.log(res);
          var msg=res.data.msg;
          if(msg==='ok'){
            this.isLoading=false;
            var data=res.data.data.cities;
            var { cityList,hotList } this.formatCityList(cities);
            this.cityList=cityList;
            this.hotList=hotList;
            // 本地存储
            window.localStorage.setItem('cityList', JSON.stringfy(cityList) );
            window.localStorage.setItem('hotList',Json.Stringify(hotList));
          }
        });
      }

    },
    methods:{
      formatCityList(cities){
        var cityList=[];
        var hotList=[];
        // 热点城市
        for(var i=0;i<cities.length;i++){
          if(cities[i].isHot===1){
            hotList.push(cities[i]);
          }
        }
        for(var i=0;i<cities.length;i++){
          var firstLetter=cities[i].py.substring(0,1).toUpperCase();
          if(toCom(firstLetter)){
            // 新添加的index
            cityList.push({ index:firstLetter,list:[ { nm:cities[i].nm,id:cities[i].id } ] });

          }else{
            // 添加到已有的index中
            for(var  j=0;j<cityList;j++ ){
              if(cityList[i].index===firstLetter){
                cityList[j].list.push({ nm:cities[i].nm,id:cities[i].id });
              }
            }
          }
        }
        // 排序
        cityList.sort((n1,n2)=>{
          if(n1.index>n2.index){
            return 1;
          }else if(n1.index<n2.index){
            return -1;
          }else{
            return 0;
          }
        })
        function toCom(firstLetter){
          for(var i=0;i<cityList.lenght;i++){
            if(cityList[i].index===firstLetter){
               return false;
            }
          }
          return true;
        }
        return {
          cityList,
          hotList
        };
      },
      handleToIndex(index){
        var h2=this.$refs.city_sort.getElementsByTagName('h2');
        // this.$refs.city_sort.parentNode.scorollTop=h2[index].offsetTop;
        this.$refs.city_list.toScrollTop(-h2[index].offsetTop);
      },
      handleToCity(nm,id){
        this.$store.commit('city/CITY_INFO',{nm,id});
        window.localStorage.setItem('nowNum',nm);
        window.localStorage.setItem('nowId',id);
        this.$router.push('/movie/nowPlaying');
      }
    }
  }
</script>

<style>
</style>
