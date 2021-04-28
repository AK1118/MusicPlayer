<template>
	<div class="content">
		<div class="head-bar">
			<img class="img_1" src="../static/Image/head2.png" />
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			};
		},
		props:{
			MusicObj:Object,
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	.content{
		width: 100%;
		height: 100%;
		position: fixed;
		top:0px;
		left: 0px;
	}
	.content .head-bar{
		width: 100%;
		height: 300px;
		text-align: center;
		overflow: hidden;
		border: 1px solid red;
	}
	.content .head-bar .img_1{
		width: auto;
		height: 100%;
		top:0px;
		left:0px;
		width: auto;
		height: 100%;
	}
</style>
