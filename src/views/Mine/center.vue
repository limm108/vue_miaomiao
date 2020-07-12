<template>
  <div>
    <div>个人中心</div>
    <div> 当前用户:{{$store.state.username}} <a href="javascript:;" @touchstart='handleToLogout'>退出</a></div>
    <div v-if="$store.state.user.isAdmin">用户身份 ：管理员<a href='/admin'>进入管理后台</a> </div>
    <div v-else>用户身份：普通身份</div>
    <div>
      <input type="file" name='file' value="上传图像"  @change="handleToUpload" />
      <img class='userHead' :src="$store.state.user.userHead" />
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {messageBox} from '@/components/JS';
  export default{
    name:'center',
    motheds:{
      handleToLogout(){
        this.axios.get('/api2/users/logout').then((res)=>{
          var status=res.data.status;
          if(status===0){
            localStorage.removeItem('name');
            localStorage.removeItem('isAdmin');
            this.$store.commit('user/USER_NAME',{name:'',isAdmin:false,userHead:''});
            this.$router.push('/mine/login');
          }
        })
      },
      handleToUpload(){
        var file=ev.target.files(0);
        var param=new FormData();
        param.append('file',file,file.name);
        var config={
          header:{
            'Content-Type':'multipart/form-data'
          }

        }
        this.axios.post('/api2/users/uploadUserHead',params,config).then((res)=>{
          var status=res.data.data.status;
          var This=this;
          if(status===0){
            messageBox({
              title:'信息',
              content:'上传成功',
              ok:'确定',
              handleOk(){
                This.$store.commit('user/USER_NAME',{
                  name:This.$stores.status.user.name,
                  isAdmin:This.$stores.status.user.isAdmin,
                  userHead:res.data.data.userHead+'?'+Math.random()
                })
              }
            })
          }else{
            messageBox({
              title:'信息',
              content:'上传失败',
              ok:'确定'
            })
          }
        })
      },
      beforeRouterEnter(to,from,next){
        axios.get('/api2/users/getUser').then((res)=>{
          var status=res.data.status;
          if(status===0){
            next(vm=>{
              localStorage.setItem('name',res.data.data.username);
              localStorage.setItem('isAdmin',res.data.data.isAdmin);
              vm.$store.commit('user/USER_NAME',{
                name:res.data.data.username,
                isAdmin:res.data.data.isAdmin,
                userHead:res.data.data.userHead
              })
            });
          }else{
            next('/mine/login');
          }
        })
      }
    }
  }
</script>

<style scoped>
  .userHead{ width:100px;height:100px;border-radius:50%;overflow:hidden; }
</style>
