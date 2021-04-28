<template>
	<div class="content">
		<div class="main-bar">
			<div class="cancelButton el-icon-close" @click="hiddenSelf"></div>
			<div class="video-bar ">
				<video :src="mvvideo" autoplay="autoplay" controls>
				</video>
			</div>
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
				mvvideo:'',
			};
		},
		props:{
			mvinfo:Object,
			changePoint:Function,
			hiddenMvPlay_bar:Function,
		},
		mounted() {
			this.changePoint();
			let id=this.mvinfo.id;
			 get("api/mv/url", {
				id: id
			}).then((res) => {
				this.mvvideo=res.data.data.url;
				//console.log(res.data.data);
			})
		},
		methods:{
			hiddenSelf(){
				this.hiddenMvPlay_bar();
				this.changePoint();
			}
		}
	}
</script>

<style scoped>
	.content {
		width: 100%;
		height: 100%;
		position: fixed;
		background-color: #FEF0F0;
		top:0px;
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
	.content .main-bar {
		position: absolute;
		margin: 0 auto;
		width: 100%;
		height: 100%;
		background-color: #0f0f0f;
		padding-top:36px;
	}
	.video-bar{
		width: 1000px;
		margin:10% auto;
		border-radius: 10px;
		padding-bottom: 36px;
		overflow: hidden;
	}
	video{
		width: 100%;
	}
	.cancelButton{
		text-align: center;
		line-height: 36px;
		width: 36px;
		height: 36px;
		background-color: rgba(255,255,255,.3);
		position: absolute;
		right: 0px;
	}
</style>
