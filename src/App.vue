<template>
	<div id="app"  v-loading.fullscreen.lock="loading">
		<div>
			<!--  <el-button @click="startHacking">Start</el-button> -->
			<!-- <myhead :setAudioSrc="setAudioSrc" :getSongerMusicAll="getSongerMusicAll"></myhead> -->
			<visual v-if="ShowbarHandler.pages.visual"></visual>
			<mymain v-show="true" :setAudioSrc="setAudioSrc" :handlerOfAudio="handlerOfAudio" :musicInfo="musicInfo"
					:ShowbarHandler="ShowbarHandler" 
					:searchMusicAll="searchMusicAll"
					:getSongerMusicAll="getSongerMusicAll"
					:playListAll="playListAll"
					:auel="auel">
					</mymain>
			<left v-show="true" :choosePage="choosePage"></left>
			<audio id="Audio" src=""></audio>
		</div>
	</div>
</template>

<script>
	import left from "../pages/Left.vue"
	import myhead from "../pages/head.vue"
	import mymain from "../pages/main.vue"
	import visualmusic from "../pages/musicvisualbar.vue"
	import {
		get
	} from "../commons/js/request.js"
	export default {
		data() {
			return {
				loading: true,
				auel: null,
				musicInfo: {
					obj:{
						id: 0,
						name: 'MusicName',
						img: '../static/Image/head.png',
						currentTime: 0,
						duration: 0,
						isplay: true,
						asrc:'../static/music/butterflies.mp3',
					},
					list:null,
				},
				timer: null,
				ShowbarHandler: { //控制main窗口显示哪些页面
					pages: {
						index: true,
						list: false, //搜索结果音乐列表
						playlist: false, //歌单音乐列表
						singer: false,
						mv: false,
						ilike:false,
						diantai:false,
						myplaylist:false,
						collectplaylist:false,
						visual:true,
						rest: function() {
							this.list = this.singer = this.mv = this.index = 
							this.playlist = this.ilike=this.diantai=this.myplaylist=this.collectplaylist
							=this.visual=false;
						},
					},
				},
				searchMusicAll: null,
				playListAll:null,
			};
		},
		mounted() {
			this.auel = document.querySelector("audio");
			this.loading=false;
			/* this.auel.addEventListener('canplay', () => {
				this.loading = false;
				this.setAudioSrc(this.musicInfo);
			}); */
		},
		methods: {
			play() {
				this.auel.play();
			},
			pause() {
				this.auel.pause();
			},
			handlerOfAudio(type) {
				/* if (type.type == 1) this.play();
					else
				if (type.type == 2) this.pause(); */
			},
			setAudioSrc(obj) { //传入搜索建议对象
				this.musicInfo=obj;
			},
			getSongerMusicAll(type,obj) { //获取搜索歌曲页面的信息并传入main里面的mainMusicList
				if(type==1){
					this.choosePage(10);
					this.searchMusicAll = obj;//搜索列表
					//console.log(obj)
				}
				if(type==2){
					this.choosePage(11);//歌单列表
					//console.log(obj)
					this.playListAll= obj;
				}
			},
			choosePage(index) { //改变main的页面显示
				let pages = this.ShowbarHandler.pages;
				pages.rest();
				if (index == 0) {
					this.ShowbarHandler.pages.index = true;
				} else if (index == 1) {
					this.ShowbarHandler.pages.mv = true;
				} else if(index==2){
					this.ShowbarHandler.pages.diantai=true;
				} else if(index==3){
					this.ShowbarHandler.pages.ilike=true;
				}else if(index==4){
					this.ShowbarHandler.pages.myplaylist=true;
				}else if(index==5){
					this.ShowbarHandler.pages.collectplaylist=true;
				}
				else if (index == 10)
					this.ShowbarHandler.pages.list = true;
				else if (index == 11)
					this.ShowbarHandler.pages.playlist = true;
			},
		},
		components: {
			left: left,
			myhead: myhead,
			mymain: mymain,
			visual:visualmusic,
		}
	}
</script>

<style>
	body{
		background-color: #f6f6f6;
		overflow: hidden;
		justify-content: center;
	}
	#app {
		background-color:black;
		width: 1300px;
		height: 90%;
		margin: 2% auto;
		position: absolute;
		top:0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		align-self: center;
		box-shadow: 1px 1px 9px #6f6f6f;
		justify-content: space-between;
		box-sizing: border-box;
		overflow: hidden;
		-webkit-touch-callout: none;
		/* iOS Safari */
		-webkit-user-select: none;
		/* Chrome/Safari/Opera */
		-khtml-user-select: none;
		/* Konqueror */
		-moz-user-select: none;
		/* Firefox */
		-ms-user-select: none;
		/* Internet Explorer/Edge */
		user-select: none;
	}

	.lodaing {
		width: 100%;
		height: 100%;
		background-color: rgb(0, 0, 0, .2);
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
	}
</style>
