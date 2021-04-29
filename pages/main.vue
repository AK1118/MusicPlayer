<template>
	<div class="content">
			<myhead v-if="isBottomShow" :setAudioSrc="$attrs['setAudioSrc']" :getSongerMusicAll="$attrs['getSongerMusicAll']"></myhead>
			<div class="main-bar" v-show="true">
				<index v-if="ShowbarHandler.pages.index"
						:getSongerMusicAll="$attrs['getSongerMusicAll']"
						:setAudioSrc="$attrs['setAudioSrc']"
						>
						</index>
				<playlist v-if="ShowbarHandler.pages.playlist" 
						:playListAll="$attrs['playListAll']"
						:setAudioSrc="$attrs['setAudioSrc']"
						>
						</playlist>
				<singer v-if="ShowbarHandler.pages.singer"></singer>
				
				<musiclist v-if="ShowbarHandler.pages.list"
						:searchMusicAll="$attrs['searchMusicAll']"
						:setAudioSrc="$attrs['setAudioSrc']">
						</musiclist><!-- 搜索出来的音乐列表 -->
				
				<musicmv v-if="ShowbarHandler.pages.mv"
						:changePoint="changePoint"
						>
						</musicmv><!-- MV界面 -->
				<ilike v-if="ShowbarHandler.pages.ilike"
						:getSongerMusicAll="$attrs['getSongerMusicAll']"
						></ilike>
				<diantai v-if="ShowbarHandler.pages.diantai"></diantai>
				<myplaylist v-if="ShowbarHandler.pages.myplaylist"></myplaylist>
				<collect v-if="ShowbarHandler.pages.collectplaylist"></collect>
			</div>
			<bottom v-show="isBottomShow"
					:setAudioSrc="$attrs['setAudioSrc']"
					:musicInfo="$attrs['musicInfo']"
					>
					</bottom>
	</div>
</template>

<script>
	import singer from "../pages/singer.vue"
	import musiclist from "../pages/mainMusicList.vue"
	import musicmv from "../pages/mainMV.vue"
	import index from "../pages/index.vue"
	import playlist from "../pages/playlist.vue"
	import myhead from "../pages/head.vue"
	import bottom from "../pages/bototm.vue"
	import ilike from "../pages/ilike.vue"
	import diantai from "../pages/diantai.vue"
	import myplaylist from "../pages/myplaylist.vue"
	import collectplaylist from "../pages/collectplaylist.vue"
	export default {
		data() {
			return {
				isBottomShow:true,
			};
		},
		props: {
			ShowbarHandler: Object, //控制页面显示
		},
		methods: {
			changePoint(){
				this.isBottomShow=!this.isBottomShow;
			}
		},
		components: {
			index: index,
			playlist: playlist,
			bottom: bottom,
			singer: singer,
			musiclist: musiclist,
			musicmv: musicmv,
			myhead:myhead,
			ilike:ilike,
			diantai:diantai,
			myplaylist:myplaylist,
			collect:collectplaylist,
		},
	}
</script>

<style scoped>
	.content {
		width: 100%;
		height: 100%;
		justify-content: center;
		z-index: 1;
		background-color: #f6f6f6;
		position: absolute;
		left: 230px;
	}

/* 	.bg{
		width: 100%;
		height: 100%;
		z-index: -3;
	} */
	.main-bar{
		width: 1200px;
		height: 100%;
		position: absolute;
		left: 0px;
	}
</style>
