
<template>
	<div class="content" v-loading="can_set">
		<div class="progress-bar" @mousedown="mouseDown">
			<div class="progress" :style="{width:pro+'px'}"></div>
		</div>
		<div class="left">
			<div class="picture" @click="selectMusicInfo">
				<img :src="new_music.img" />
			</div>
			<div class="music-name" :title="new_music.name">
				<font>{{new_music.name}}</font>
			</div>
		</div>
		<div class="center">
			<div class="play_bar">
				<div class="before" @click="before"><div class="el-icon-arrow-left"></div></div>
				<div class="play_pause" @click="setAudioPlayPause">
					<img :src="isplayImg" />
				</div>
				<div class="next" @click="next"><div class="el-icon-arrow-right"></div></div>
			</div>
			<div class="tools_bar">
				<div class="model_bar" @click="changePlayType" :title="getPlayTypeTitle"><div :class="play_type_class"></div></div>
				<div class="model_bar" @click="setplaybackRate" title="更改倍速"><div><font size="1">{{getPlaybackRate}}</font></div></div>
				<div class="volume_bar">
					<div class="el-icon-bell">
						<div class="solider_bar">
							 <el-slider
									:min="0"
									:max="1"
									:step=".1"
									:show-tooltip="false"
									v-model="value1"
									@input="setVolume"
									></el-slider>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="right">
			<font>{{McurrentTime | translateTime}} / {{Mduration | translateTime}}</font>
		</div>
	</div>
</template>

<script>
	import {
		get
	} from "../commons/js/request.js"
	export default{
		data(){
			return{
				IsPlay:false,//是否开始暂停
				play_pause:'../static/Image/play.png',//开始暂停图片
				progress_bar:null,//进度条容器对象
				progress:null,//进度条对象
				progressavg:0,//平均值
				AudioELement:null,//音乐标签对象
				Mduration:0,//总时长
				McurrentTime:0,//已经播放时长
				playbackRate:1,//播放速度
				Timer:null,//更新进度条interval容器
				value1:1,
				play_type:0,
				play_type_class:'el-icon-sort',
				new_music:{//现在播放音乐对象
					name:'未选择音乐源',
				},
				index:-1,
				can_set:false,
			}
		},
		props:{
			 musicInfo:Object,//各个页面选择音乐后传入的音乐对象（自己封装的对象）
			 setAudioSrc:Function,
		},
		filters:{
			translateTime(value){
				let s=Math.floor(value/3600),f=Math.floor(value/60),m=Math.floor(value%60);
				return (f>=10?f:"0"+f)+":"+(m>=10?m:"0"+m);
			},
		},
		watch:{
			musicInfo:{//监听从App里面musicInfo传入值的变化，如果改变就执行
				handler(newV,oldV){
					this.can_set=true;
					this.getMusicSrc(this.musicInfo.id);
					this.getNoewMusic();
					console.log(this.index)
				}
			}
		},
		mounted() {
			this.progress_bar=document.querySelector(".progress-bar");
			this.progress=document.querySelector(".progress"); 
			this.AudioELement=document.querySelector("#Audio");
			this.AudioELement.addEventListener("canplay",this.canPlay);
		},
		methods:{
			next:function(){//下一首
				if(this.index<this.musicInfo.list.length-1)
					this.index+=1;
				if(this.index==this.musicInfo.list.length-1)
					this.index=0;
				this.getMusicSrc(this.musicInfo.list[this.index]);
				console.log(this.index)
			},
			before:function(){//上一首
				if(this.index>1)
					this.index-=1;
				this.getMusicSrc(this.musicInfo.list[this.index]);
				console.log(this.index)
			},
			setplaybackRate:function(){
				this.playbackRate+=1;
				if(this.playbackRate>3)
					this.playbackRate=0;
				let speed=[.5,1,2,2.5];
				this.AudioELement.playbackRate=speed[this.playbackRate];
			},
			changePlayType:function(){//改变播放模式   顺序   单曲   随机
				this.play_type+=1;
				if(this.play_type>2)this.play_type=0;
				if(this.play_type==0)
					this.play_type_class="el-icon-sort";
				else if(this.play_type==1)
					this.play_type_class="el-icon-refresh";
				else if(this.play_type==2)
					this.play_type_class="el-icon-s-data";
			},
			getMusicSrc:function(id){//获取被点击音乐的src
				get('/api/song/url', {
						id: id
					})
					.then((response)=>{
						this.AudioELement.src=response.data.data[0].url;
						this.can_set=false;
					});
				get('/api/song/detail', {
					ids: id
				}).then((res) => {
						this.new_music=res.data;
						this.new_music.img=res.data.songs[0].al.picUrl;
						this.new_music.name=res.data.songs[0].name;
						this.can_set=false;
				});	
			},
			getNoewMusic:function(){//定位当前播放音乐的序列值
				for(let i=0;i<this.musicInfo.list.length;i++){
					console.log(this.musicInfo.list[i]+"**"+this.musicInfo.id);
					 if(this.musicInfo.list[i]==this.musicInfo.id){
						this.index=i;
						return;
					}
				}

			},
			setAudioPlayPause:function(){//设置播放暂停
			if(this.new_music.name=="未选择音乐源")
				return;
				this.IsPlay=!this.IsPlay;
				this.play_pause=!this.IsPlay?"../static/Image/play.png":"../static/Image/pause.png";
				this.IsPlay?this.AudioELement.play():this.AudioELement.pause();
			},
			canPlay:function(){//音乐加载完毕后执行的代码
				//console.log(this.musicInfo.list)
				//console.log("音乐已准备！总时长"+this.AudioELement.duration);
				this.Mduration=this.AudioELement.duration;
				this.progressavg=1100/this.AudioELement.duration;
				if(this.Timer){
					clearInterval(this.Timer);
					this.Timer=null;
					}
				if(!this.Timer)
					this.Timer=setInterval(this.updateMusicDate,100);
				this.IsPlay?this.AudioELement.play():this.setAudioPlayPause();
				
			},
			mouseDown:function(e){//鼠标点击进度条
				let x=e.clientX,
					y=e.clientY;
					let value=Math.floor(x);
					let test=document.querySelector("#app");
					let click_Point=e.clientX-(230+test.offsetLeft);
					//console.log(click_Point)
					this.AudioELement.currentTime=Math.floor(click_Point/this.progressavg);
					this.AudioELement.play();
			},
			updateMusicDate:function(){//更新音乐播放时间
				this.McurrentTime=this.AudioELement.currentTime;
				if(this.McurrentTime==this.Mduration){//播放完一首后下一首
					clearInterval(this.Timer);
					this.Timer=null;
					this.McurrentTime=0;
					if(this.play_type==0)this.next();
					if(this.play_type==1)this.AudioELement.play();
					if(this.play_type==2){
						this.index=Math.floor(Math.random()*this.musicInfo.list.length-2);
						this.next();
					}
					}
			},
			setVolume:function(){//设置音量   使用element-ui
				this.AudioELement.volume=this.value1;
			},
			selectMusicInfo:function(){
				console.log(this.new_music)
			}
		},
		computed:{
			isplayImg:function(){//播放暂停图片
				return !this.IsPlay?"../static/Image/play.png":"../static/Image/pause.png";
			},
			pro:function(){//进度条长度
				return this.McurrentTime*this.progressavg;//(this.musicInfo.currentTime*this.progressavg);
			},
			getPlaybackRate:function(){
				let speed=[.5,1,2,2.5];
				return speed[this.playbackRate];
			},
			getPlayTypeTitle:function(){
				if(this.play_type==0)return '顺序播放';
				if(this.play_type==1)return '单曲循环';
				if(this.play_type==2)return '随机播放';
			},
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
		width:1100px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		/* box-shadow: 0px -9px 3px #d8d8d8 */;
	}
	.progress-bar{
		flex: none;
		position: absolute;
		height: 1px;
		width: 100%;
		left: 0px;
		//transition: all .3s;
	}
	.progress-bar:hover{
		height: 6px;
		background-color: #d8d8d8;
	}
	.progress{
		width: 30px;
		height: 100%;
		background-color: #48f0b7;
		position: absolute;
		left: 0px;
		border-radius: 6px;
	}
	.content .left{
		height: 100%;
		width: 200px;
		justify-content: center;
		align-items: center;
		padding-left: 32px;
		justify-content: flex-start;
	}
	.content .left .music-name{
		height: 100%;
		width: 130px;
		float: left;
		line-height: 63px;
		text-align: left;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.content .left .picture{
		width: 40px;
		height: 40px;
		border-radius:3px;
		margin-right: 16px;
		box-shadow: 1px 1px 1px 0px #ccc;
		overflow: hidden;
		float: left;
		margin-top:15px;
	}
	.content .left .picture img{
		width: 40px;
		height: 40px;
	}	
	.content .center {
		width: 220px;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.tools_bar{
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-left: 60px;
	}
	.volume_bar,.model_bar{
		text-align: center;
		width:36px;
		height: 23px;
		background-color: #d8d8d8;
		border-radius: 3px;
		
	}
	.volume_bar :hover .solider_bar{
		width: 100px;
		height: 23px;
		left:-3px;
		background-color: #d8d8d8;
		opacity: 1;
		padding-left: 16px;
		padding-right: 16px;
		z-index: 9999;	}
	.volume_bar .solider_bar{
		width: 0px;
		height: 20px;
		position: relative;
		left: 36px;
		top:-19px;
		opacity: 0;
		transition: all .5s;
		border-radius: 6px;
	}
	.play_bar{
		width: 200px;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.before,.next,.volume_bar,.model_bar{
		width:23px;
		height: 23px;
		border-radius:3px;
		padding-left: 8px;
		padding-right: 8px;
		opacity: .6;
		margin: 8px;
	}
	.before img,.next img{
		width: 19px;
		height: 19px;
		opacity: .6;
	}
	.play_pause{
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
	.play_pause img{
		width: 19px;
		height: 19px;
		align-self: center;
	}
	.right{
		width: 190px;
		height: 100%;
		text-align: center;
		line-height: 63px;
		color:#787878;
		font-size: 13px;
		padding-right: 32px;
	}
</style>
