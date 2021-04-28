<template>
	<div class="content" v-loading="can_set">
		<div class="main-bar">
			<div class="banner-bar">
				<div class="swiper-container">
					    <div class="swiper-wrapper">
					        <div class="swiper-slide" v-for="(item,index) in bannerList" :key="index">
							<font color="#FFFFFF" style="position: absolute;z-index:999;top:8px;background-color: rgba(255,255,255,.6);padding-left: 8px;padding:8px;border-radius: 0px 10px 10px 0px;">{{item.typeTitle}}</font>
							<img :src="item.imageUrl"/></div>
					    </div>
						<div class="swiper-pagination"></div>
						<div class="swiper-button-next"></div>
						<div class="swiper-button-prev"></div>
				</div>
				<!-- <img :src="bannerimgs[0]" /> -->
			</div>
			<div class="title" v-show="isForYouShow">精品歌单</div>
			<div class="item-bar">
				<div class="items">
					<div class="item" v-for="(item,index) in highquality" :key="item.id" @click="Choose(item.id,item)">
						<div class="info-bar" :title="item.name">
							<img :src="item.coverImgUrl" />
							<div class="playcount el-icon-video-play">{{item.playCount | transNumber}}</div>
							<div class="info">
								{{item.name}}
							</div>
						</div>
					</div>
					<div class="item more" @click="getMore">
						点击获取更多<div class="el-icon-plus"></div><div style="opacity: 0;"></div>
					</div>
				</div>
			</div>
			<div class="title" v-show="isForYouShow">每日推荐歌单</div>
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
			<div class="title" v-show="isForYouShow">每日推荐音乐</div>
			<div class="item-bar">
				<div class="Foryou-musicAll" v-if="foryouMusicAll">
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
	import Cookies from 'js-cookie'
	import playlist from "../pages/playlist.vue"
	import Swiper from "../commons/js/swiper/swiper-bundle.min.js"
	import swiperCss from "../commons/js/swiper/swiper-bundle.min.css"
	export default {
		data() {
			return {
				bannerimgs: ['../static/Image/signup.jpg'],
				foryouRecommend: [], //每日推荐歌单  需要登录
				playlistAll:null,
				foryouMusicAll:null,//每日推荐音乐 需要登录
				newSongs:null,
				bannerList:[],
				highquality:[],
				highqualit_limit:4,
				can_set:true,
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
			let my_id=Cookies.get('my_id') | {};
			this.getBanner();
			console.log(my_id)
			if(my_id!=0){//需要登陆
				this.getForyouMusic();
				this.getPlayList();
			}
			this.getHighquality();
			setTimeout(this.setBanner,1000);//资源加载完成后创建swiper对象，不然会有不能滑动bug
		},
		methods: {
			Choose:function(id, obj) { //点击了一个歌单,传入歌单id和歌单对象	
				//console.log(id)
				this.can_set=true;
				get("api/playlist/detail", {
					id: id
				}).then((res) => {
					this.playlistAll={
						obj:res.data,//获取的数据
						itemobj:obj,//点击歌单数据
						isShowInfoBar:true,
					};
					this.can_set=false;
					this.getSongerMusicAll(2,this.playlistAll);
					//console.log(res.data)
				});
			},
			getMore:function(){
				this.highqualit_limit+=3;
				this.getHighquality();
			},
			getPlayList:function(){
				get("api/recommend/songs",{
					limit:3
				})
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
					}).catch(error=>{
					console.log("Index___"+error);
				}); ;
			},
			getForyouMusic:function(){
				this.can_set=true;
				get("api/recommend/resource", {
					limit:3
				})
					.then((res) => {
						this.can_set=false;
						this.foryouRecommend = res.data.recommend;
						//console.log(res.data.recommend)
					}).catch(error=>{
					console.log("Index___"+error);
				}); ;
			},
			getHighquality:function(){
				this.can_set=true;
				get("api/top/playlist/highqualit", {
					limit:this.highqualit_limit,
				})
					.then((res) => {
						this.can_set=false;
						this.highquality=res.data.playlists;
					}).catch(error=>{
					console.log("Index___"+error);
				}); ;
			},
			getBanner(){
				this.can_set=true;
				get("api/banner",{
					type:0,
				}).then((res)=>{
					this.can_set=false;
					this.bannerList=res.data.banners;
					//console.log(res.data)
				}).catch(error=>{
					console.log("Index___"+error);
				}); ;
			},
			setBanner:function(){
				var mySwiper = new Swiper('.swiper-container',{
					 direction: 'horizontal',
					 loop:true,
					 speed:600,
					     pagination: {
					       el: '.swiper-pagination',
					     },
				     navigation: {
				       nextEl: '.swiper-button-next',
				       prevEl: '.swiper-button-prev',
				     },
					 autoplay: {
								delay:6000,
					         　　disableOnInteraction: false,   // 手动滑动后继续自动播放
					     　　 },
				});
			},
		},
		components:{
			playlist: playlist,
		},
		computed:{
			isForYouShow:function(){
				return this.foryouRecommend.length>0;
			}
		},
	}
</script>

<style scoped>
	.content {
		width: 1200px;
		height: 100%;
		overflow:hidden;
		position: absolute;
		left: 0px;
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
	.swiper-container{
		width: 100%;
		height: 100%;
	}
	.swiper-slide{
		background-color: orange;
	}
	.content .main-bar {
		padding-top: 86px;
		width: 90%;
		height: 100%;
		overflow: scroll;
		padding-left: 32px;
	}
	.banner-bar {
		width: 1000px;
		height: 360px;
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
		padding-top:8px;
		padding-bottom:8px;
		font-weight: bold;
	}

	.item-bar {
		width: 1000px;
		display: flex;
		height: auto;
		justify-content: left;
		flex-wrap: wrap;
		//box-shadow: 1px 1px 3px #e0e0e0;
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
	.more{
		line-height: 190px;
		text-align: center;
		font-size: 13px;
		color:#787878;
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
