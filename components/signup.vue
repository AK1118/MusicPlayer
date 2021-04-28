<template>
	<div class="content">
		<div class="form">
			<div class="input-bar">
				<h5><font color="#0080FF">手机号码</font>作为账号登录</h5>
				<input type="tel" v-model="account" placeholder="输入账号" maxlength="11"/>
				<input type="password" v-model="password" placeholder="输入密码"/>
				<font v-show="isOk" color="#F06431" size="1" style="padding-left:20px;padding-top: 6px;">账号或者密码输入错误</font>
			</div>
			<div class="submit" @click="go">
				登录
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios"
	export default{
		data(){
			return{
				account:'',
				password:'',
				isOk:false,
			};
		},
		props:{
			getUserInfo:Function,
		},
		methods:{
			go(){
				let that=this;
				axios({
					url:'/api/login/cellphone',
					method:'post',
					data:{
						phone:'17378399325',//that.account,
						password:that.password,
					},
					withCredentials: true,
				}).then(function(response) {
						if(response.data.code==502){
							alert("密码错误");
							return;
							}
						if(!response.data.code==200)
							return;
						let profile=response.data.profile,
							account=response.data.account,
							bindings=response.data.bindings,
							cookie=response.data.cookie;
							console.log("cookie"+cookie);
							that.Setcookie('test',cookie);
						that.getUserInfo({
							profile:profile,
							account:account,
							bindings:bindings,
						});
						console.log(response.data);
					})
					.catch(function(error) {
						console.log("错" + error);
					});
			},
			Setcookie (name, value){ 
			    //设置名称为name,值为value的Cookie
			    var expdate = new Date();   //初始化时间
			    expdate.setTime(expdate.getTime() + 30 * 60 * 1000);   //时间单位毫秒
			    document.cookie = name+"="+value+";expires="+expdate.toGMTString()+";path=/";
			},
			getCookie(c_name){
			//判断document.cookie对象里面是否存有cookie
				if (document.cookie.length>0){
				var c_start=document.cookie.indexOf(c_name + "=")
				//如果document.cookie对象里面有cookie则查找是否有指定的cookie，如果有则返回指定的cookie值，如果没有则返回空字符串
				if (c_start!=-1){ 
					c_start=c_start + c_name.length+1 
					var c_end=document.cookie.indexOf(";",c_start)
				if (c_end==-1) c_end=document.cookie.length
					return unescape(document.cookie.substring(c_start,c_end))
					} 
				}
				return ""
			},
		}
	}
</script>

<style scoped>
	.content{
		width:100%;
		height:100%;
		position: fixed;
		top: 0px;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
		margin: 0 auto;
		background: rgba(0,0,0,.1);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.form{
		width: 300px;
		height: 390px;
		background-color: #fff;
		border-radius: 6px;
		overflow: hidden;
		background:	#fff;
	}
	.form .input-bar{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 330px;
	}
	.form .input-bar h5{
		text-align: center;
		flex: none;
	}
	.form .input-bar input{
		align-self: center;
		border: none;
		background-color: #e3e3e3;
		margin-top:16px;
		width: 80%;
		height: 36px;
		border-radius: 6px;
		outline: none;
		padding-left:16px;
	}
	.form .submit{
		width: 100%;
		height: 60px;
		background:#fff;
		line-height: 60px;
		text-align: center;
		box-shadow: -1px -1px 3px 0px #eee;
		opacity: .8;
	}
</style>
