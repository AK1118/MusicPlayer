<template>
	<div class="content">
		<div class="logo">
			<img src="../static/Image/null.png"/>
		</div>
		<div class="top">
			<div class="button-bar">
				<ul>
					<li class="title bar">在线音乐</li>
					<li :class="Class_bar[0]" @click="changeColor(0)">
						<img src="../static/Image/keybar.png"/>
						<font >听音乐</font>
					</li>
					<li :class="Class_bar[1]" @click="changeColor(1)">
						<img src="../static/Image/videocall.png" />
						<font>看MV</font>
					</li>
					<li :class="Class_bar[2]" @click="changeColor(2)">
						<img src="../static/Image/sound-message.png" />
						<font>电台</font>
					</li>
				</ul>
				<ul>
					<li class="title bar">我的音乐</li>
					<li :class="Class_bar[3]"  @click="changeColor(3)">
						<img src="../static/Image/businesscard.png"/>
						<font >我喜欢</font>
					</li>
					<li :class="Class_bar[4]"  @click="changeColor(4)">
						<img src="../static/Image/camera.png" />
						<font>我创建的歌单</font>
					</li>
					<li :class="Class_bar[5]" @click="changeColor(5)">
						<img src="../static/Image/files.png" />
						<font>我收藏的歌单</font>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				Class_bar:['clicked bar','bar','bar','bar','bar','bar'],
				test:'bar'
			};
		},
		props:{
			choosePage:Function,
		},
		methods:{
			go(){
			},
			changeColor(index){
				let arr=['bar','bar','bar','bar','bar','bar'];
				arr[index]='clicked bar'
				this.Class_bar=arr;
				this.choosePage(index);
			},
		},
	}
</script>

<style scoped>
	html,body{
		width: 100%;
		height: 100%;
	}
	.content{
		width:230px;
		height: 100%;
		position: fixed;
		background-color: #f0f0f0;
	}
	.content .logo{
		width: 100%;
		height: 68px;
		padding-top: 20px;
		padding-left: 36px;
		line-height: 68px;
	}
	.content .logo img{
		width: 58px;
		height: 58px;
	}
	.content .top{
		width: 100%;
	}
	.content .top .button-bar{
		width: 100%;
	}
	.content .top  ul{
		padding-left:20px ;
		margin-top:30px;
		padding-right: 20px;
	}
	.content .top  ul .bar{
		margin-top:10px;
		height: 30px;
		display: flex;
		padding-left: 16px;
		align-items: center;
		border-radius: 6px;
		font-size: 13px;
	}
	.content .top  ul .clicked{
		 background-image: linear-gradient(to left,#76fff7,#48f0b7);
		color: #fff;
	}
	.content .top  ul .bar:hover{
		background-color: #d0d0d0;
		color: #fff;
	}
	.content .top  ul .bar:visited{
		background-color: #fff;
		color: #fff;
	}
	.content .top  ul img{
		width: 16px;
		height: 16px;
		padding-right: 10px;
	}
	.content .top  ul .title{
		color: #787878;
	}
	.content .top  ul .title:hover{
		background-color: #f0f0f0;
		color: #787878;
	}
</style>
