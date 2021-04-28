<template>
	<div class="content">
		<div class="main-bar">
 			<div class="info-bar" v-if="playListAll.itemobj" v-show="playListAll.isShowInfoBar">
				<div class="bg">
					<div class="bg-bar">
						<img :src="playListAll.itemobj.picUrl||playListAll.itemobj.coverImgUrl" />
					</div>
					<div class="content-bar">
						<div class="img-bar">
							<img :src="playListAll.itemobj.picUrl||playListAll.itemobj.coverImgUrl" />
						</div>
						<div class="center-bar">
						</div>
						<div class="text-bar">
							<h3>{{playListAll.itemobj.name}}</h3>
							<p>{{playListAll.itemobj.description||playListAll.obj.playlist.description}}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="item-bar">
				<div class="item-title">
					<div class="music-name">名字</div>
					<div class="singer-name">歌手</div>
					<div class="album">专辑</div>
					<div class="public-time">时长</div><!-- 原publishTime类名 -->
				</div>
				<div v-for="(item,index) in playListAll.obj.playlist.tracks" class="item" 
					     @click="chooseSrc(item.id,item.name,item.al.picUrl)">
					<div class="music-name" :title="item.name">
						<div class="el-icon-star-off" style="margin-right: 10px;"></div>
						{{item.name}}
					</div>
					<div class="singer-name" :title="item.ar[0].name">{{item.ar[0].name}}</div>
					<div class="album" :title="item.al.name">{{item.al.name}}</div>
					<div class="public-time">{{item.dt | translateTime}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		get
	} from "../commons/js/request.js"
	export default {
		data() {
			return {};
		},
		props: {
			playListAll: Object,
			setAudioSrc: Function,
		},
		filters: {
			translateTime(value) {
				value /= 1000;
				let s = Math.floor(value / 3600),
					f = Math.floor(value / 60),
					m = Math.floor(value % 60);
				return (f >= 10 ? f : "0" + f) + ":" + (m >= 10 ? m : "0" + m);
			},
		},
		methods: {
			chooseSrc(id, name, imgsrc) { //选择了音乐id
				this.searchText = '';
				let that = this;
				let musicSrc = {
					id: id,
					name: name,
					src: '',
					img: imgsrc,
				};
				get('/api/song/url', {
						id: id
					})
					.then((response)=>{
						musicSrc.src = response.data.data[0].url;
						this.setAudioSrc(musicSrc);
					});
				/* 					get('/api/song/detail', {
										ids: id
										})
										.then(function(res) {
											musicSrc.img = res.data.songs[0].al.picUr;
										}); */
			},
		},
	}
</script>

<style scoped>
	.content {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		overflow:hidden;
		transform: translateY(100px);
		opacity: .1;
		animation: contentAnimation .6s forwards;
	}
	@keyframes contentAnimation{
		from{
			transform: translateY(100px);
			opacity: 0;
		}
		to{
			transform: translateY(0px);
			opacity: 1;
		}
	}
	.content .main-bar {
		width: 1500px;
		height: 100%;
		overflow-y: scroll;
		padding-left: 32px;
		
	}
	
   .main-bar::-webkit-scrollbar{width:1px;}  
   .main-bar::-webkit-scrollbar-track{background-color:#f6f6f6;border-radius: 10px;}  
   .main-bar::-webkit-scrollbar-thumb{background-color:#f6f6f6;border-radius: 10px;}  
   .main-bar::-webkit-scrollbar-thumb:hover {background-color:#5FE3FF}  
   .main-bar::-webkit-scrollbar-thumb:active {background-color:#00aff0}  
	
	.content .main-bar .item-bar {
		width: 1500px;
		height: auto;
		padding-bottom: 32px;
		margin:  0 auto;
	}
	.bg{
		width: 100%;
		height: 100%;
		background-color: cornflowerblue;
		position: relative;
		display: flex;
		justify-content: center;
	}
	.bg-bar{
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 1;
	}
	.bg-bar::before{
		display: block;
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 1;
		content: '';
		background: rgba(255,255,255,.3);
	}
	.bg-bar img{
		position: relative;
		left: -30px;
		top: -30px;
		width: 120%;
		height: auto;
		opacity: .8;
		filter: blur(10px);
	}
	.content .info-bar{
		width: 1450px;
		height: 300px;
		overflow: hidden;
		position: relative;
		border-radius: 0px 0px 100% 100%;
		box-shadow: 1px 1px 3px #3f3f3f;
	}
	.content .info-bar .content-bar{
		border-radius: 10px;
		overflow: hidden;
		height: 300px;
		//width: 900px;
		position: absolute;
		z-index: 999;
		display: flex;
		justify-content: center;
	}
	.content .info-bar .content-bar .img-bar{
		width: 300px;
		height: 300px;
		overflow: hidden;
		border-radius: 10px;
	}
	.content .info-bar .content-bar .img-bar img{
		width: 100%;
		height: auto;
	}
	.content .info-bar .content-bar .center-bar{
		width: 10px;
		height: 100%;
	}
	.content .info-bar .content-bar .text-bar{
		width: 300px;
		height: 200px;
		overflow: hidden;
		background: rgba(255,255,255,.3);
		border-radius: 10px;
		text-align: center;
		font-size: 13px;
		align-self: center;
		overflow-y: scroll;
		}
  .content .info-bar .content-bar .text-bar::-webkit-scrollbar{width:1px;}  
  .content .info-bar .content-bar .text-bar::-webkit-scrollbar-track{border-radius: 10px;}  
  .content .info-bar .content-bar .text-bar::-webkit-scrollbar-thumb{background-color:#f6f6f6;border-radius: 10px;}  
  .content .info-bar .content-bar .text-bar::-webkit-scrollbar-thumb:hover {background-color:#5FE3FF}  
  .content .info-bar .content-bar .text-bar::-webkit-scrollbar-thumb:active {background-color:#00aff0}  			
	.content .main-bar .item {
		list-style-type: none;
		height: 56px;
		justify-content: space-between;
		line-height: 56px;
		padding-left: 16px;
		padding-right: 32px;
		background-color: #f6f6f6;
		display: flex;
		font-size: 13px;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.content .main-bar .item:hover {
		background-color: #f0f0f0;
	}

	.music-name {
		float: left;
		width: 200px;
		height: 100%;
	}

	.singer-name {
		width: 200px;
		float: left;
		height: 100%;
	}

	.album {
		width: 200px;
		float: left;
		height: 100%;
	}

	.public-time {
		width: 100px;
		float: right;
		height: 100%;
		font-size: 9px;
		color: #787878;
	}
	.item-title{
		list-style-type: none;
		height: 56px;
		width:1450px;
		justify-content: space-between;
		line-height: 56px;
		padding-left: 16px;
		padding-right: 32px;
		background-color: #f6f6f6;
		display: flex;
		font-size: 13px;
		background-color: #f6f6f6;
		position: relative;
		top:0px;
		color: #989898;
	}
</style>
