<template>
	<div class="content" v-loading="can_set">
		<div class="form">
			<div class="cancelButton el-icon-circle-close" @click="closeBar"></div>
			<div class="input-bar">
				<h5><font color="#0080FF">手机号码</font>作为账号登录</h5>
				<input type="tel" v-model="account" placeholder="输入账号" maxlength="11"/>
				<input type="password" v-model="password" placeholder="输入密码"/>
				<font v-show="isOk" color="#F06431" size="1" style="padding-left:20px;padding-top: 6px;">账号或者密码输入错误</font>
			<div class="switch-bar">
				<el-switch class="switch_button"
				  v-model="is_save_psd"
				  active-text="记住密码"
				  >
				</el-switch>
			</div>
			</div>
			<div class="submit" @click="go">
				登录
			</div>
		</div>
	</div>
</template>

<script>
	import Cookies from 'js-cookie'
	import {post} from "../commons/js/request.js"
	import {saveTodos,getTodos} from "../commons/js/localStorage.js"
	export default{
		data(){
			return{
				value1: true,
				account:'',
				password:'',
				user_id:0,
				isOk:false,
				isShow:true,
				is_save_psd:true,
				can_set:false,
			};
		},
		props:{
			getUserInfo:Function,
		},
		methods:{
			go(){
					this.can_set=true;
					        // 可下次登录时间长度，单位毫米，此处为1个星期   
					post('/api/login/cellphone',{
						phone:this.account,//that.account,
						password:this.password,
					}).then((res)=>{
						if(res.data.code==502){
							this.isOk=true;
							return;
						}
						if(res.data.code!=200){
							//alert(res.data.code)
							this.signSuccessfully("登陆失败,刷新后再试试叭",1);
							return;
						}
						let my_cookie=res.data.cookie;
							this.user_id=res.data.account.id;
							toString(this.user_id);
							console.log(res.data.account)
						if(this.is_save_psd){
							Cookies.set('account',this.account,{ expires: 7 });
							Cookies.set('psd',this.password,{ expires: 7 });
							Cookies.set('my_cookie',my_cookie,{ expires: 7 });
							Cookies.set('my_id',this.user_id,{ expires: 7 });
						}
						this.closeBar();
						this.getUserInfo(res.data);
						this.signSuccessfully("登录成功",0);
						this.can_set=false;
					});
			},
			closeBar(){
				this.$emit('signBarshow');
			},
			signSuccessfully(mes,type){
				let types=['success','waring','error'];
				this.$message({
				          message: mes,
				          type: types[type]
				        });
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

		background:	#fff;
		position: absolute;
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
		border-radius: 0px 0px 10px 10px;
	}
	.switch-bar{
		top:10px;
		right: 10px;
		position: relative;
		width: 100%;
	}
	.switch_button{
		float: right;
	}
	.cancelButton{
		text-align: center;
		line-height:36px;
		width: 36px;
		height: 36px;
		background-color:rgba(255,255,255,.3);
		position:absolute;
		left:280px;
		top:-18px;
		text-align: center;
		border-radius: 100%;
		z-index: 999;
	}
</style>
