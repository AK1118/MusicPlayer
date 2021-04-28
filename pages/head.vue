<template>
	<div class="content">
		<div class="top-bar">
			<div class="next_before-bar">
				<img src="../static/Image/black.png" />
				<img src="../static/Image/more.png" />
			</div>
			<div class="input-bar">
				<input type="text" @keydown.enter="searchGo" @input="searchInput" v-model="searchText" maxlength="99"
					placeholder="搜索音乐" placeholder-style="font-size:1px" />
				<div class="search_suggest-bar" v-show="isSuggestShow">
					<div class="item item-title">单曲</div>
					<div class="item" v-for="(item,index) in songs" :key="item.id"
						@click="chooseSrc(item.id,item.name,item.artists[0].img1v1Url)">{{item.name}}<font color="#e0e0e0" style="margin-left:8px;">({{item.artists[0].name}})</font></div>
					<div class="item item-title">歌手</div>
					<div class="item" v-for="(item,index) in artists" :key="item.id" @click="chooseArtists(item)">
						{{item.name}}<font></font>
					</div>
					<div class="item item-title">专辑</div>
					<div class="item" v-for="(item,index) in albums" :key="item.id"
						@click="chooseSrc(item.id,item.name,item.picUrl)">{{item.name}}</div>
					<div class="item item-title">歌单</div>
					<div class="item" v-for="(item,index) in playlists" :key="item.id"
						@click="Choose(item.id,item)">{{item.name}}</div>
				</div>
			</div>
			<div class="heade-bar" v-show="true">
				<div class="head" @click="signBarShow">
					<img :src="userinfo.avatarUrl" />
				</div>
				<font>{{userinfo.nickname}}</font>
				<div class="user_info_bar" v-if="user_info_bar_show"></div>
			</div>
		</div>
		<signup v-if="isSignup" 
				:getUserInfo="getUserInfo"
				@signBarshow="signBarShow"
				></signup>
	</div>
</template>

<script>
	import Cookies from 'js-cookie'
	import signup from "../pages/signup.vue"
	import {saveTodos,getTodos} from "../commons/js/localStorage.js"
	import {
		get,
		post
	} from "../commons/js/request.js"
	export default {
		data() {
			return {
				isSignup:false,
				userinfo: {//占位
						nickname: '点击登录',
						avatarUrl: "../static/Image/default_user_head.png",
				},
				user_info_bar_show:false,
				searchText: '',
				searchResult: [],
				songs: [],
				artists: [],
				albums: [],
				playlists: [],
			};
		},
		props: {
			setAudioSrc: Function,
			getSongerMusicAll: Function, //传出歌手全部歌曲
		},
		mounted() {//自动用户登录
					var account=Cookies.get('account')||0,
						 psw=Cookies.get('psd')||0;
						 
						 if(account==0||psw==0){
							 console.log("没有登陆")
							 return;
							 }
						//console.log(account);
						//console.log(psw);
				post('/api/login/cellphone',{
					phone:account,//that.account,
					passord:psw,
				}).then((response)=>{
/* 					if(response.data.code==502){
						alert("密码错误");
						this.signSuccessfully("密码错误",1);
						return;
						} */
					if(response.data.code==400)return;
						this.userinfo=response.data.profile;
						//console.log(response.data.profile)
				}).catch(error=>{
					console.log("Head___"+error);
				}); 
		},
		methods: {
			searchInput() { //监听搜索框输入
				if (!this.searchText)
					return;
				let that = this;
				that.songs = that.artists = that.albums = that.playlists = [];
				get("/api/search/suggest", {
						keywords: that.searchText,
					}).then(function(response) { 
						if (!response.data.code == 200)
							return;
						//console.log(response.data.result==null)
						that.songs = response.data.result.songs||that.songs;
						that.artists = response.data.result.artists||that.artists;
						that.albums = response.data.result.albums||that.albums;
						that.playlists = response.data.result.playlists||that.playlists;
					})
					.catch(function(error) {
						console.log("错" + error);
					});
			},
			searchGo() { //回车搜索音乐
				let that = this;
				get("/api/search", {
					keywords: that.searchText,
				}).then(function(response) {
					that.searchText = '';
					that.getSongerMusicAll(1,response.data);
					//console.log(response.data)
				});
			},
			signBarShow(){
				this.isSignup=!this.isSignup;
			},
			getUserInfo(info) { //登录传入函数
				this.userinfo = info.profile;
				console.log(this.userinfo)
			},
			chooseArtists(obj) { //当点击了歌手
				this.getSongerMusicAll(1,obj);
			},
			Choose(id, obj) { //点击了一个歌单,传入歌单id和歌单对象
				//console.log(id)
				get("api/playlist/detail", {
					id: id
				}).then((res) => {
					this.playlistAll={
						obj:res.data,
						itemobj:obj,
						isShowInfoBar:true,
					};
					this.getSongerMusicAll(2,this.playlistAll);
					this.searchText = '';
					//console.log(res.data)
				})
			},
			chooseSrc(id, name, imgsrc) { //当点击了搜索建议歌曲
				this.searchText = '';
				let list=[];
					list.push(id);
				this.setAudioSrc({
					id:id,
					list:list,//音乐列表
				});
			},
			signBarShow(){
				this.isSignup=!this.isSignup;
				//alert(this.isSignup);
			},
			signSuccessfully(mes,type){
				let types=['success','waring','error'];
				this.$message({
				          message: mes,
				          type: types[type]
				        });
			},
		},
		computed: {
			isSuggestShow() {
				return this.songs.length > 0 && this.searchText;
			},
		},
		components: {
			signup: signup,
		}
	}
</script>

<style scoped>
	.content {
		width: 100%;
		height: 86px;
		position: absolute;
		background-color: #f6f6f6;
		left: 0px;
/* 		margin-left: 230px;
		padding-left: 16px; */
		z-index: 9999;
		padding-left:16px;
	}

	.content .top-bar {
		margin-top: 16px;
		height: 33px;
		display: flex;
	}

	.content .top-bar .next_before-bar {
		width: 90px;
		height: 33px;
		display: flex;
		justify-content: space-around;
	}

	.content .top-bar .next_before-bar img {
		width: 16px;
		height: 16px;
		align-self: center;
		opacity: .6;
	}

	.content .top-bar .input-bar {
		height: 100%;
	}

	.content .top-bar .input-bar input {
		height: 100%;
		width: 260px;
		background-color: #e3e3e3;
		border: none;
		border-radius: 50px;
		padding-left: 23px;
		font-size: 9px;
		font-weight: 700;
	}

	.content .top-bar .input-bar input:focus {
		outline: none;
	}

	.content .top-bar .input-bar .search_suggest-bar {
		/* 搜索框  搜索建议*/
		overflow: hidden;
		padding-top: 16px;
		padding-bottom: 32px;
		height: auto;
		background-color: #fff;
		position: relative;
		border-radius: 20px;
		box-shadow: 3px 3px 9px 0px #ccc;
	}

	.content .top-bar .input-bar .search_suggest-bar .item {
		text-indent: 2em;
		padding-left: 16px;
		padding-right: 16px;
		width: 100%;
		height: 30px;
		line-height: 30px;
		color: #a8a8a8;
		font-size: 13px;
	}

	.content .top-bar .input-bar .search_suggest-bar .item-title {
		text-indent: 0em;
		color: #686868;
		font-size: 16px;
	}

	.content .top-bar .input-bar .search_suggest-bar .item:hover {
		background-color: #e3e3e3;
	}

	.content .top-bar .heade-bar {
		width: auto;
		height: 33px;
		position: relative;
		display: flex;
		align-items: center;
		flex-direction: row;
		border-radius: 50px;
		font-size: 9px;
		color: #787878;
		left: 30%;
	}

	.content .top-bar .heade-bar .head {
		width: 33px;
		height: 33px;
		border-radius: 100%;
		overflow: hidden;
		border: solid 1px #fff;
		box-shadow: 1px 1px 2px 0px #999;
		margin-right: 10px;
	}

	.content .top-bar .heade-bar .head img {
		width: 110%;
		height: auto;
	}
	.user_info_bar{
		width: 200px;
		height: 300px;
		background-color: orange;
		position: absolute;
		top:100%;
		border-radius: 10px;
	}
</style>
