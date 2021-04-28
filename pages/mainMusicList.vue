<template>
	<div class="content">
		<div class="main-bar" v-if="searchMusicAll.result">
			<div class="item-bar">
				<div class="item-title">
					<div class="music-name">名字</div>
					<div class="singer-name">歌手</div>
					<div class="album">专辑</div>
					<div class="public-time">时长</div><!-- 原publishTime类名 -->
				</div>
				<div v-for="(item,index) in searchMusicAll.result.songs" :key="item.id" class="item"
					@click="chooseSrc(item.id,item.name,'https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg')">
					<div class="music-name">
						<div class="el-icon-star-off" style="margin-right: 10px;">
						</div>{{item.name}}
					</div>
					<div class="singer-name">{{item.artists[0].name}}</div>
					<div class="album">{{item.album.name}}</div>
					<div class="public-time">{{item.duration | translateTime}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {get} from "../commons/js/request.js"
	export default {
		data() {
			return {};
		},
		props: {
			searchMusicAll: Object,
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
				let list=[];
					for(var i=0;i<this.searchMusicAll.result.songs.length;i++){
						list.push(this.searchMusicAll.result.songs[i].id);
					}
				this.setAudioSrc({
					id:id,
					list:list,//音乐列表
				});
			},
		},
	}
</script>

<style scoped>
	.content {
		width: 1000px;
		height: 100%;
		position: absolute;
		left: 0px;
		top:86px;
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
			width: 1000px;
			height: 100%;
			overflow-y: scroll;
			padding-left: 16px;
			
		}
		
	.main-bar::-webkit-scrollbar{width:1px;}  
	.main-bar::-webkit-scrollbar-track{background-color:#f6f6f6;border-radius: 10px;}  
	.main-bar::-webkit-scrollbar-thumb{background-color:#f6f6f6;border-radius: 10px;}  
	.main-bar::-webkit-scrollbar-thumb:hover {background-color:#5FE3FF}  
	.main-bar::-webkit-scrollbar-thumb:active {background-color:#00aff0}  
		
		.content .main-bar .item-bar {
			width: 1000px;
			height: auto;
			padding-bottom: 32px;
			margin:  0 auto;
		}
	
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
