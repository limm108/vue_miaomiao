var mongoose=require('mongoose');
var 
var Mongoose={
	url:'mongodb://localhost:27017/miaomiao',
	connect(){
		mongoose.connect(this.url,{useNewUrlParser:true},(err)=>{
			if(err){
				console.log('数据库款姐失败');
			}
			console.log("连接成功");
		});
	}
};

var Email={
	config:{
		host:'',
		port:587,
		auth:{
			user:'',
			pass:''
		}
	},
	get transporter(){
		return nodemailer.createTransport(this.config);
	},
	get verify(){
		return Math.random().toString().substring(2,6);
	}
}

var Head={
	baseUrl:'http://localhost:3000/uploads/'
}

module.exports={
	Mongoose,
	Email,
	Head
};