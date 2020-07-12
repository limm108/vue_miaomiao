<template>
  <div class='wrapper' ref='wrapper'>
    <slot></slot>
  </div>
</template>
<script>
  export default{
    name:'Scroller',
    props:{
      handleToScroll:{
        type:Function,
        default:function(){}
      },
      handleToTuchEnd:{
        type:Function,
        default:function( ){}
      }
    },
    mounted(){
      var scroll=new BScroll(this.$refs.wra
      pper,{
        tap:true,
        probeType:1
      });
      this.scroll=scroll;
      // 滑动中
      scroll.on('scroll',(pos)=>{
        this.handleToScroll(pos);
      });
      scroll.on('touchEnd',(pos)=>{
        this.handleToTuchEndP(pos);
      });
    },
    methods:{
      toScrollTop(y){
        this.scrollTo(y){
          this.scroll.scrollTo(0,y);
        }
      }
    }
  }
</script>
<style scoped>
   .wrapper{
     height:100%;
   }
</style>
