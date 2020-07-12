import Vue from 'vue'
import MessageBox from './MessageBox'

export var messageBox=(function(){
  
  // 配置蚕食
  return function(opts){
    
    // 默认值
    var defaults={
      title:'',
      content:'',
      cancel:'',
      ok:'',
      handelCancel:null,
    };
    var myComponent=Vue.extend(MessageBox);
    
    for(var attr in opts){
      default[attr]=opts[attr];
    }

    var vm=new myComponent({
      el:document.createElement('div');
      data:{
        title:defaults.title,

        content:defaults.content,
        cancel:defaults.cancel,
        ok:defaults.ok
      },
      methods:{
        handleCancel(){
          defaults.handleCancel && defaults.handleCancel.call(this);
          document.body.removeChild(vm.$el);
        },
        handleOk(){
          defaults.handleOk && defaults.handleOk.call(this);
          document.body.removeChild(vm.$el);
        }
      }
    });
    document.body.appendChild(vm.$el);
  }
})
