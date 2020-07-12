<template>
  <div class='login_body'>
    <div>
      <input v-mode='username' class='login_text' placeholder="账号" />
    </div>
    <div>
      <input v-model='password' class='login_text' placeholder="密码" />
    </div>
    <div>
      验证码：<input type='text' class='login_text' v-model='verifyImg' /><img @touchstart='handleToVerifyImg' src="/api2/users/verifyImg" />
    </div>
    <div class='login_btn'>
      <input type='submit' value='登录' @touchstart="handleToLogin" />
    </div>
    <div class='login_link'>
      <router-link to="/mine/register">立即注册</router-link>
      <router-link  to="/mine/findPassord"  >找回密码</router-link>
    </div>
  </div>
</template>

<script>
  import {messageBox} from '@/componets/JS';
  export default{
    name:'Login',
    data(){
      return [
        username:'',
        password:'',
        verifyImg:''
      ]
    },
    mounted:{
      handleToLogin(){
        this.axios.post('/api2/users/login',{
          username:this.username,
          password:this.password
        }).then((res)=>{
          var msg=res.data.status;
          var This=this;
          if(msg===0){
            messageBox({
              title:'登录',
              content:'登录成功',
              ok:'确定',
              handleOk(){
                This.$router.push('/mine/center');
              }
            });
          }else{
            messageBox({
              title:'登录',
              content:'登录失败'+res.data.msg,
              ok:'确定'
            });
          }
        })
      },
      handleToVerifyImg(ev){
        ev.target.src='/api2/users/verifyImg?'+Math.random();
      }
    }
  }
</script>

<style>
</style>
