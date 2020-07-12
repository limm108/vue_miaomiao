var {Email,Head  }=require('../untils/config.js');
var UserModel=require('../models/users.js');

var fs=require('fs');

var url=require('url');

var { setCrypto,createVerify }=require('../utils/base.js');

var login=async (req,res,next)=>{
	var {usrename,password}=req.body;

	if(verifyImg!==req.session.verifyImg){
		res.send({
			msg:"验证码错误",
			status:-3
		});
		return;
	}

	var result=await UserModel({
		username,
		password:setCrypto(password)
	});
	if(result){
		req.seesion.username=username;
		req.session.isAdmin=result.isAdmin;
		req.session.usreHead=result.userHead;
		if(result.isFreeze){
			res.send({
				msg:'账号冻结',
				status:-2
			});
		}else{
			res.send({
				msg:'登录成功',
				status:0
			});
		}
		
	}else{
		res.send({
			msg:'登录失败',
			status:-1
		});
	}
};
var register=async (req,res,next)=>{
	var { username,password,email,verify }=req.body;
	if(email!==req.sesssion.email || verify!==req.session.verify ){
		res.send({
			msg:'验证码错误',
			status:-1
		});
		return;
	}
	// 验正码过期
	if((Email.time - req.session.time)/1000>60 ){
		res.send({
			msg:'验证码过期',
			status:-3
		});
		return ;
	}
	var result=await UserModel.save({
		username,
		password:setCrypto(password),
		email
	});
	if(reqult){
		res.end({
			msg:'注册成功',
			status:0
		});
	}else{
		res.send({
			msg:'注册失败',
			status:-2
		});
	}

};
var verify=async (req,res,next)=>{
	var email=req.query.email;
	var verify=Email.verify;
	req.session.verify=verify;
	req.session.email=email;
	let mailOptions={
		from:'喵喵',
		to:email,
		subject:"miaomai ",
		text:"验证码："+Email.verify
	}
	Email.transporter.sendMail(mailOptions,(err)=>{
		if(info){
			res.send({
				msg:'发送失败',
				status:-1
			});
		}else{
			
			res.send({
				msg:'验证码发送成功',
				state:0
			});
		}
	});
	
};
var logout=async (req,res,next)=>{
	req.session.username='';
	res.send({
		msg:'退出成功',
		status:0
	});
};
var getUser=async (req,res,next)=>{
	if(req.session.username){
		res.send({
			msg:'获取用户信息成功',
			status:0,
			data:{
				username:req.seesion.username,
				isAdmin:req.session.isAdmin,
				userHead:req.session.userHead
			}
		});
	}else{
		res.send({
			msg:'获取失败',
			status:-1
		});
	}
};
var findPassword=async (req,res,next)=>{
	var { email,password,verify }=req.body;
	if(email===req.session.email  && verify===req.seesin.verify ){
		var result await UserModel.findPassword(email,setCrypto(password));
		if(result){
			res.sen({
				msg:'修改密码成功',
				status:0
			});
		}else{
			res.send({
				msg:'验证失败',
				status:-1
			});
		}
	}
};

var verifyImg=async (req,res,next)=>{
	var result=await createVerify(req,res);
	if(result){
		res.send(result);
	}
}

var uploadUserHead=async(req,res,next)=>{
	// await fs.rename(url.resolve(Head.baseUrl,req.file.filename),url.resolve(Head.baseUrl, req.session.username+'.jpg' ) )
	await fs.rename('public/uploads/'+ req.file.filename,'public/uploads'+req.session.username+'.jpg' );
	var result=await UserModel.updateUserHead(req.session.username,url.resolve(Head.baseUrl,req.session.usrename+'.jpg'));
	if(result){
		res.send({
			msg:'成功',
			status:0,
			data:{
				userHead:url.resolve(Head.baseUrl,req.session.username+'.jpg');
			}
		})
	}else{
		res.send({
			msg:'失败',
			status:-1
		});
	}
}

module.exports={
	login,
	register,
	verify,
	logout,
	getUser,
	findPassword,
	verifyImg,
	uploadUserHead
};