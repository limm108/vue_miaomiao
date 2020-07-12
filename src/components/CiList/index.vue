<template>
  <div>
    <Loding v-if="isLoading" />
    <Scroller v-else>
    <ul>
      <li v-for=" item in cinemaList " :key="item.id" >
        <div>
          <span>{{item.nm}}</span>
          <span class='q'> <span class='price'>{{item.sellPrice}}</span> 元起</span>
        </div>
        <div class="address">
          <span>{{item.addr}}</span>
          <span>{{item.distance}}</span>
        </div>
        <div class="card">
          <div v-for=" (num,key) in item.tag " v-if="num===1" :key="key">{{key | formatCard }}</div>
        </div>
      </li>
    </ul>
    </Scroller>

  </div>
</template>

<script>
  export default{
    name:'CiList',
    data(){
      return {
        cinemaList:[],
        isLoading:true,
        prevCityId:-1
      }
    },
    activated(){
      var cityId=this.$store.state.city.id;
      if(this.prevCityId===cityId){return}
      this.isLoading=true;
      this.axios.get('/api/cinemaList?cityId='+cityId).then((res)=>{
        var msg=res.data.msg;
        if(msg==='ok'){
          this.cinemaList=res.data.data.cinemas;
          this.isLoading=false;
          this.prevCityId=cityId;
        }
      })
    },
    filters:{
      formatCard(key){
        var card=[
          {key:'allowRefund', value:'改签' },
          { key:'endsore',value:'退' },
          { key:'sell',value:'折扣建' }

        ];
        for(var i=0;i<card.length;i++){
          if(card[i].key===key){
            return card[i].value;
          }
        }
       return '';
      },
      classCard(key){
        var card=[
            {key:'allowRefund', value:'or' },
            { key:'endsore',value:'or' },
            { key:'sell',value:'bl' }

          ];
          for(var i=0;i<card.length;i++){
            if(card[i].key===key){
              return card[i].value;
            }
          }
         return '';
        }
      }
    }
  }
</script>

<style>
</style>
