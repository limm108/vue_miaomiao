<template>
  <div class='password_body'>
    <div class='password_email'>
      邮箱：<input v-model='email' class='password_rtext' type='text' /><button @touchstart="handleToVerify"> 发送验码</button>
    </div>
    <div>
      新密码：<input v-model='password' class='password_rtext' type='text' />
    </div>
    <div>
      验证码：<input v-model='verify' class='password_rtext' type='text' />
    </div>
    <div class='password_btn'>
      <button @touchstart='handleToPassword'>修改</button>

    </div>
    <div class='register_link'>
      <router-link to="/mine/login" >立即登录</router-link>
      <router-link to="/mine/register" >立即注册</router-link>
    </div>
  </div>
</template>

<script>
  import {messageBox} from '@/compoents/JS';
  export default{
    name:'findPassword',
    data(){
      return [
        email:'',
        password:'',
        verify:''
      ];
    },
    methods:{
      handleToVerify(){
        this.axios.get('/api2/users/verify?email='+this.email).then((res)=>{
          var status=res.data.status;
          if(status===0){
            messageBox({
              title:'验证码',
              content:'已发送',
              ok:'确定'
            });
          }else{
            messageBox({
              title:'验证码',
              content:'发送失败',
              ok:'确定'
            });
          }
        })
      },
      handleToPassword(){
        this.axios.post('/api2/users/findPassword',{
          email:this.email,
          password:this.password,
          verify:this.verify
        }).then((res)=>{
          var status=res.data.status;
          var This=this;
          if(status===0){
            messageBox({
              title:'修改',
              content:'修改成功',
              ok:'确定',
              handleOk(){
                This.$router.push('/mine/login');
              }
            });
          }else{
            messageBox({
              title:'修改',
              content:'修改失败',
              ok:'确定'
            });
          }
        })
      }
  }
</script>

<style>
</style>
