<template>
	<div class="content">
		<div class="main-bar">
			<div class="nono"></div>
		</div>
	</div>
</template>

<script>
	export default{
		mounted() {
			
		}
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
		padding-top: 86px;
		width: 90%;
		height: 100%;
		overflow: scroll;
		padding-left: 32px;
		display: flex;
		justify-content: center;
	}
	.nono{
		width: 0px;
		height: 0px;
		border: 60px solid transparent;
		border-bottom: 100px solid orangered;
		border-radius: 6px;
		text-align: center;
		margin: 10% auto;
		animation: Animation_nono 3s infinite;
	}
	.nono::before{
		content: '暂未开发';
		width: 100px;
		height: 30px;
		display: block;
		text-align: center;
		position: relative;
		left: -50px;
		top:60px;
		color: #fff;
		font-weight: 700;
	}
	@keyframes  Animation_nono{
		0%{
			transform: translateY(0px) scale(1);
		}
		50%{
			transform: translateY(30px) scale(.9);
		}
		100%{
			transform: translateY(0px) scale(1);
		}
	}
</style>
