
var UserModel=require('../models/user.js')

var index=async (req,res,next)=>{
	res.send({
		msg:'管理员权限',
		status:0
	});
}

var usersList=async (req,res,next)=>{
	var result=await UserMode.usersList();
	if(result){
		res.send({
			msg:'获取成功',
			status:0,
			data:{
				userList:result
			}
		});
	}else{
		res.send({
			msg:'获取失败',
			status:-1
		});
	}
}

var updateFreeze=async (req,res,next)=>{
	var {email,isFreeze}=req.body;
	var result=await UserMode.updateFreeze(email,isFreeze);
	if(result){
		res.send({
			msg:'成功',
			status:0
		});

	}else{
		res.send({
			msg:'失败',
			status:-1
		});
	}
}

var deleteUser=async (req,res,next)=>{
	var {email}=req.body;
	var result=await  UserMode.deleteUser(email);
	if(result){
		res.send({
			msg:'删除成功',
			status:0
		});

	}else{
		res.send({
			msg:'失败',
			status:-1
		})
	}
}

module.exports={
	index,
	userList,
	updateFreeze,
	deleteUser
}