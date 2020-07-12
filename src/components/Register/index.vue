<template>

    <div class='reginster_body'>
      <div>
        邮箱:<input v-model='email' class='register_text' type='text' /><button :disabled='disabled' @touchstart='handleToVerify'> 发送验证</button>
      </div>
      <div>
        用户名:<input v-model="username" class='register_text' type='text' />
      </div>
      <div>
        密码:<input v-model='password' class='register_text' type="password" />
      </div>
      <div>
        确认密码:<input class='register_text' type="password" />
      </div>
      <div>
        验证码:<input v-model='verify' class='register_text' type='text' />
      </div>
      <div class='register_btn'>
        <button @touchstart='handleToRegister'>注册</button>
      </div>
      <div class='register_link'>
        <router-link to="/mine/login" >立即登录</router-link>
        <router-link to="/mine/findPassword" >找回密码</router-link>
      </div>
    </div>
</template>

<script>
  import {messageBox  } from '@/componets/JS';
  export default{
    name:'Register',
    data(){
      return [
        email:'',
        username:'',
        passeword:'',
        verify:''
      ]
    },
    methods:{
      handleToVerify(){
        this.axios.get('/api2/users/verify?email='+this.email).then((res)=>{
          var status=res.data.status;
          if(status===0){
            messageBox({
              title:'验证码',
              content:"验证码已发送",
              ok:'确定',
              handleOk(){
                This.countDown();
              }
            });
          }else{
            messageBox({
              title:'验证码',
              content:"验证码发送失败",
              ok:'确定'
            });
          }
        })
      },
      handleToRegister(){
        this.axios.post('/api2/users/register',{
          email:this.email,
          username:this.username,
          password:this.password,
          verify:this.verify
        }).then((res)=>{
          var status=res.data.status;
          var This=this;
          if(status===0){
            messageBox({
              title:'注册',
              content:"注册成功",
              ok:'确定',
              handleOk(){
                This.$router.push('/mine/login');
              }
            });
          }else{
            messageBox({
              title:'注册',
              content:res.data.msg+"注册失败",
              ok:'确定'
            });
          }
        })
      },
      countDown(){
        this.disabled=true;
        var count=60;
        var timer=setInterval(()=>{
          count--;
          this.verifyInfo='剩余'+count+'秒';
          if(count===0){
            this.disabled=false;
            this.verifyInfo='发送验证码';
            clearInterval(timer._id);
          }
        },1000)
      }
    }
  }
</script>

<style scoped>
  .reginster_body .reginster_email {position:relative;}
</style>
