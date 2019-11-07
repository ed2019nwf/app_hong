<template>
	<view>
		<!-- <Header v-on:backGo="backGo" :title="title"></Header> -->
		<view class="iframe-box" style="margin-top: 50px;">	
			<web-view :src="url"></web-view>
		</view>
	</view>
</template>

<script>
	// #ifdef APP-PLUS
	var screenWidth = plus.screen.resolutionWidth,
		screenHeight = plus.screen.resolutionHeight;
	var left = screenWidth - 25+'px',
		top = screenHeight - 150+'px';
	var nvImageMenu = new plus.nativeObj.View("nvImageMenu", { //创建底部图标菜单
		top: "50px",
		left: "0px",
		height: '75px',
		width: '25px',
	});
	nvImageMenu.draw([{
		    tag:'img',
		    src: '/static/back1.png',
		}])
	nvImageMenu.addEventListener("click",function(e){
		uni.navigateBack({
			delta: 2,
			animationType: 'pop-out',
			animationDuration: 200
		});
	})
	// #endif
	
	import Header from '@/components/header/header.vue'
	export default {
		data() {
			return {
				title:'',
				url: '',
				backBtn:false
			}
		},
		components: {
			Header
		},
		// mounted(){
		// 	this.url = location.search.substring(5);
		// },
		onShow(){
			// #ifdef APP-PLUS
				nvImageMenu.show();
				setTimeout(()=>{
					plus.screen.unlockOrientation();
				},1000);
			// #endif
		},
		onHide() {
			// #ifdef APP-PLUS
			   
			// #endif
		},
		onUnload(){
				// #ifdef APP-PLUS
					plus.screen.lockOrientation("landscape-secondary");
					nvImageMenu.hide();
				// #endif
		},
		// onUnload(){
		// 	// #ifdef APP-PLUS
		// 		plus.screen.lockOrientation("landscape");
		// 	// #endif
		// },
		onLoad(options) {
			console.log(options);
			if (options && options.url) {
				this.url = options.url;
			}
		},
		methods: {
			backGo() {
				this.$tool.goBack();
			}
		}
	}
</script>

<style scoped lang="scss">
	.backbtn{
		width:50px;
		height:50px;
		background: red;
		position: fixed;
		top:10px; 
		left:10px;
		z-index: 9999;
	}
    .iframe-box{
		height: 90vh;
		position: relative;
		.ifr{
			position: absolute;
			top:0;
			left:0;
		}
	}
</style>
