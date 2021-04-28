
<template>
	<div class="content">
		<div class="progress-bar">
			<div class="progress" :style="{width:pro+'px'}"></div>
		</div>
		<div class="left">
			<div class="picture">
				<img :src="musicInfo.img" />
			</div>
			<div class="music-name">
				<font>{{musicInfo.name}}</font>
			</div>
		</div>
		<div class="center">
			<div class="before"><img src="../static/Image/black.png"/></div>
			<div class="play_pause" @click="setAudioPlayPause">
				<img :src="isplayImg" />
			</div>
			<div class="next"><img src="../static/Image/more.png"/></div>
		</div>
		<div class="right">
			<font>{{musicInfo.currentTime | translateTime}} / {{musicInfo.duration | translateTime}}</font>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				IsPlay:false,
				play_pause:'../static/Image/play.png',
				progressavg:0,
			}
		},
		props:{
			 handlerOfAudio: Function,
			 musicInfo:Object,
		},
		filters:{
			translateTime(value){
				let s=Math.floor(value/3600),f=Math.floor(value/60),m=Math.floor(value%60);
				return (f>=10?f:"0"+f)+":"+(m>=10?m:"0"+m);
			},
		},
		watch:{
			musicInfo:{
				handler(newV,oldV){
					this.IsPlay=this.musicInfo.isplay;
				 	let progress_bar=document.querySelector(".progress-bar"),
						progress=document.querySelector(".progress"); 
						this.progressavg=1690/this.musicInfo.duration;
				}
			}
		},
		methods:{
			setAudioPlayPause(){
				//this.handlerOfAudio(1);
				this.IsPlay=!this.IsPlay;
				this.play_pause=!this.IsPlay?"../static/Image/play.png":"../static/Image/pause.png";
				this.IsPlay?this.handlerOfAudio(1):this.handlerOfAudio(2);
			}
		},
		computed:{
			isplayImg(){
				return !this.IsPlay?"../static/Image/play.png":"../static/Image/pause.png";
			},
			pro(){
				//console.log("计算得出"+this.musicInfo.currentTime*this.progressavg)
				return (this.musicInfo.currentTime*this.progressavg);
			}
		}
	}
</script>

<style scoped>
	.content{
		background-color: #f6f6f6;
		position: absolute;
		bottom: 0;
		left: 0px;
		height: 63px;
		width: 1690px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		box-shadow: 0px -1px 3px #e8e8e8;
	}
	.progress-bar{
		flex: none;
		position: absolute;
		height: 1px;
		width: 100%;
		left: 0px;
	}
	.progress{
		width: 30px;
		height: 100%;
		background-color: #48f0b7;
		position: absolute;
		left: 0px;
	}
	.content .left{
		height: 100%;
		width: 300px;
		justify-content: center;
		align-items: center;
		padding-left: 32px;
		display: flex;
		justify-content: flex-start;
	}
	.content .left .music-name{
		height: 19px;
		width: 200px;
		overflow: hidden;
		text-overflow: hidden;
		white-space: nowrap;
	}
	.content .left .picture{
		width: 40px;
		height: 40px;
		border-radius: 10px;
		margin-right: 16px;
		box-shadow: 1px 1px 1px 0px #ccc;
		overflow: hidden;
	}
	.content .left .picture img{
		width: 40px;
		height: 40px;
	}	
	.content .center {
		width: 190px;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left:32px;
		padding-right: 32px;
	}
	.content .center .before,.next {
		width:19px;
		height: 19px;
		border-radius: 100%;
	}
	.content .center .before img,.next img{
		width: 19px;
		height: 19px;
		opacity: .6;
	}
	.content .center .play_pause{
		width: 35px;
		height: 35px;
		border-radius: 100%;
		background-image: linear-gradient(to left,#76fff7,#48f0b7);
		text-align: center;
		line-height: 35px;
		color: #fff;
		display: flex;
		justify-content: center;
	}
	.content .center .play_pause img{
		width: 19px;
		height: 19px;
		align-self: center;
	}
	.content .right{
		width: 190px;
		height: 100%;
		text-align: center;
		line-height: 63px;
		color:#787878;
	}
</style>
