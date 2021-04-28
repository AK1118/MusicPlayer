<template>
	<div class="content">
		<div class="main-bar">
			<div class="title">每日推荐音乐</div>
			<div class="item-bar">
				<div class="item" v-for="(item,index) in newMV"  :title="item.name" @click="Choose(item.id,item)">
					<div class="info-bar">
						<img :src="item.cover" /> 
						<div class="playcount el-icon-video-play">{{item.playCount | transNumber}}</div>
						<div class="info">{{item.name}}</div>
					</div>
				</div>
				<div class="item more" @click="getMore">
					点击获取更多<div class="el-icon-plus"></div><div style="opacity: 0;">{{newMvCount}}</div>
				</div>
			</div>
			<div class="title">每日推荐MV</div>
			<div class="item-bar">
				<div class="item" v-for="(item,index) in foryouMV" :key="item.id" :title="item.name" @click="Choose(item.id,item)">
					<div class="info-bar">
						<img :src="item.picUrl" /> 
						<div class="playcount el-icon-video-play">{{item.playCount | transNumber}}</div>
						<div class="info">{{item.name}}</div>
					</div>
				</div>
			</div>
			<div class="bottom-space"></div>
		</div>
		<mvplay v-if="ismvplay" 
				:mvinfo="mvinfo"
				:changePoint="$attrs['changePoint']"
				:hiddenMvPlay_bar="hiddenMvPlay_bar"
				></mvplay>
	</div>
</template>

<script>
	import {
		get
	} from "../commons/js/request.js"
	import mvplay from "../components/mvPlay.vue"
	export default {
		data() {
			return {
				bannerimgs: ['../static/Image/signup.jpg'],
				foryouMV: [], //每日推荐歌单  需要登录
				newMv:[],
				newMvCount:5,
				mvvideo:'',
				mvinfo:{},
				ismvplay:false,
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
			let that=this;
			get("api/mv/first", {
				limit:this.newMvCount,
				})
				.then((res) => {
					console.log(res.data.data)
					this.newMV=res.data.data;
				});
			get("api/personalized/mv", {})
				.then((res) => {
					this.foryouMV=res.data.result;
				});
				this.getMore();
		},
		methods: {
			hiddenMvPlay_bar(){
				this.ismvplay=false;
			},
			getMore(){
				this.newMvCount+=6;
				get("api/mv/first", {
					limit:this.newMvCount,
					})
					.then((res) => {
							this.newMV=res.data.data;
					});
			},
			Choose(id, obj) { //点击了一个歌单,传入歌单id和歌单对象
				   
				   this.ismvplay=true;
				   this.mvinfo={
					   id:id,
					   obj:obj,
				   };
				/* get("api/mv/url", {
					id: id
				}).then((res) => {
					this.mvvideo=res.data.data.url;
					console.log(res.data.data);
				}) */
			},
		},
		components:{
			mvplay: mvplay,
		}
	}
</script>

<style scoped>
	.content {
		width: 100%;
		height: 100%;
		margin: 0 auto;
/* 		overflow:hidden;
		transform: translateY(100px);
		opacity: .1;
		animation: contentAnimation .6s forwards;*/
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
		width: 90%;
		height: 300px;
		//overflow: hidden;
		border-radius: 10px;
		opacity: .9;
	}
	video{
		height: 100%;
		width: auto;
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
		width: 100%;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		margin: 0 auto;
	}

	.item-bar .item {
		width: 184px;
		height:184px;
		margin: 8px;
/* 		margin-top: 16px;
		margin-right: 16px;
		margin-bottom: 16px; */
		border-radius: 10px;
		overflow: hidden;
		position: relative;
		animation: itemin .6s forwards;
		transform: translateY(100px);
		opacity: 0;
	}
	
	@keyframes  itemin{
		from{
			transform: translateY(100px);
			opacity: 0;
		}
		to{
			transform: translateX(0);
			opacity: 1;
		}
	}
	.item-bar .item::after{
		width: 150%;
		height: 200%;
		content: '';
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
	.item-bar .item::before{
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
	.item-bar .item:hover:after{
			top:-40%;
			left: -20%;
	}
	.item-bar .item:hover:before{
			opacity: .6;
	}
	.item-bar .item img {
		width: auto;
		height: 100%;
		position: relative;
		opacity: .9;
	}
	.more{
		line-height: 190px;
		text-align: center;
		font-size: 13px;
		color:#787878;
	}
	.item-bar .item .info-bar {
		width: 100%;
		height: 100%;
		position: relative;
		top: 0px;
		left: 0px;
	}

	.item-bar .item .info-bar .info {
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

	.item-bar .item .info-bar .playcount {
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
	.bottom-space{
		width: 100%;
		margin: 0 auto;
		padding-bottom: 160px;
	}
</style>
