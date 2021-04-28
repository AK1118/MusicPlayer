<template>
	<div class="content">
		<div class="main-bar">
			<div class="banner-bar">
				<img :src="bannerimgs[0]" />
			</div>
			<div class="title">每日推荐歌单</div>
			<div class="item-bar">
				<div class="items">
					<div class="item" v-for="(item,index) in foryouRecommend" :key="item.id" @click="Choose(item.id,item)">
						<div class="info-bar" :title="item.name">
							<img :src="item.picUrl" />
							<div class="playcount el-icon-video-play">{{item.playcount | transNumber}}</div>
							<div class="info">
								{{item.name}}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="title">每日推荐音乐</div>
			<div class="item-bar">
				<div class="Foryou-musicAll">
					<playlist :setAudioSrc="$attrs['setAudioSrc']"
							  :playListAll="foryouMusicAll"
					   		  ></playlist><!-- 此处为主页内嵌入歌单 -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		get
	} from "../commons/js/request.js"
	import playlist from "../components/playlist.vue"
	export default {
		data() {
			return {
				bannerimgs: ['../static/Image/signup.jpg'],
				foryouRecommend: [], //每日推荐歌单  需要登录
				playlistAll:null,
				foryouMusicAll:null,//每日推荐音乐 需要登录
			};
		},
		props: {
			getSongerMusicAll: Function,
		},
		filters: {
			transNumber(value) {
				if (value > 100000)
					value = Math.floor(value / 100000) + '万';
				return value;
			}
		},
		mounted() {
			get("api/recommend/resource", {})
				.then((res) => {
					this.foryouRecommend = res.data.recommend;
					//console.log(res.data.recommend)
				});
			get("api/recommend/songs",{})
				.then((res)=>{
					this.foryouMusicAll={
						obj:{
							playlist:{
								tracks:res.data.data.dailySongs,
								},
							},
						itemobj:false,
						isShowInfoBar:false,
					};
					console.log(this.foryouMusicAll.obj.playlist)
				});
		},
		methods: {
			Choose(id, obj) { //点击了一个歌单,传入歌单id和歌单对象
				//console.log(id)
				get("api/playlist/detail", {
					id: id
				}).then((res) => {
					this.playlistAll={
						obj:res.data,//获取的数据
						itemobj:obj,//点击歌单数据
						isShowInfoBar:true,
					};
					this.getSongerMusicAll(2,this.playlistAll);
					console.log(res.data)
				})
			},
		},
		components:{
			playlist: playlist,
		}
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
		width: 90%;
		height: 100%;
		overflow: scroll;
		padding-left: 32px;
	}

	.banner-bar {
		width: 1600px;
		height: 300px;
		overflow: hidden;
		border-radius: 10px;
		opacity: .9;
	}

	.banner-bar img {
		width: 100%;
		height: auto;
		position: relative;
	}

	.title {
		width: 90%;
		height: 36px;
		line-height: 36px;
		padding-top:16px;
		padding-bottom:16px;
	}

	.item-bar {
		width: 1600px;
		display: flex;
		height: auto;
		justify-content: left;
		flex-wrap: wrap;
		box-shadow: 1px 1px 3px #e0e0e0;
		border-radius: 10px;
	}
	.item-bar .items{
		width: 100%;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		margin: 0 auto;
	}
	.item-bar .items .item {
		width: 184px;
		height:184px;
		margin: 8px;
/* 		margin-top: 16px;
		margin-right: 16px;
		margin-bottom: 16px; */
		border-radius: 10px;
		overflow: hidden;
		position: relative;
	}
	.item-bar .items .item::after{
		width: 150%;
		height: 200%;
		content: 'D';
		display: block;
		background-color: rgba(255,255,255,.3);
		position: absolute;
		top:100%;
		left: -100%;
		z-index: 1;
		transform: rotate(-45deg);
		transition: all .4s;
		transition-timing-function: cubic-bezier(0.31, -0.105, 0.43, 2);
	}
	.item-bar .items .item::before{
		width: 100%;
		height: 100%;
		content: '';
		display: block;
		position: absolute;
		background: url(../static/Image/play.png) no-repeat center;
		background-size: 36px;
		transition: all .6s;
		opacity: 0;
		z-index: 2;
	}
	.item-bar .items .item:hover:after{
			top:-40%;
			left: -20%;
	}
	.item-bar .items .item:hover:before{
			opacity: .6;
	}
	.item-bar .items .item img {
		width: 100%;
		height: 100%;
		position: relative;
		opacity: .9;
	}

	.item-bar .items .items .item .info-bar {
		width: 100%;
		height: 100%;
		position: relative;
		top: 0px;
		left: 0px;
	}

	.item-bar .items .item .info-bar .info {
		width: 100%;
		height: 36px;
		background-color: rgba(255, 255, 255, .6);
		position: absolute;
		bottom: 0px;
		font-size: 13px;
		padding-left: 8px;
		padding-right: 8px;
		color: #383838;
		line-height: 36px;
	}

	.item-bar .items .item .info-bar .playcount {
		font-size: 13px;
		padding-left: 8px;
		padding-right: 8px;
		line-height: 32px;
		text-align: center;
		height: 32px;
		font-weight: 500px;
		background-color: rgba(255, 255, 255, .3);
		position: absolute;
		top: 8px;
		left: 0px;
		border-radius: 0px 10px 10px 0px;
	}
	.Foryou-musicAll{
		width: 100%;
		margin: 0 auto;
		height: 900px;
		padding-bottom: 96px;
	}
</style>
