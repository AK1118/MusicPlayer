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
			</div>
			<bottom v-if="isBottomShow" :handlerOfAudio="$attrs['handlerOfAudio']"
					:musicInfo="$attrs['musicInfo']">
					</bottom>
	</div>
</template>

<script>
	import singer from "../components/singer.vue"
	import musiclist from "../components/mainMusicList.vue"
	import musicmv from "../components/mainMV.vue"
	import index from "../components/index.vue"
	import playlist from "../components/playlist.vue"
	import myhead from "../components/head.vue"
	import bottom from "../components/bototm.vue"
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
				document.querySelector('.content').style.left=(this.isBottomShow?230:0)+"px";
				document.querySelector(".main-bar").style.top=(this.isBottomShow?90:0)+"px";
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
		},
	}
</script>

<style scoped>
	.content {
		position: fixed;
		width:  1690px;
		height: 100%;
		justify-content: center;
		background-color: #f6f6f6;
		left: 230px;
		z-index: 1;
	}

/* 	.bg{
		width: 100%;
		height: 100%;
		z-index: -3;
	} */
	.main-bar{
		width: 100%;
		height: 100%;
		position: absolute;
		top:90px;
	}
</style>
