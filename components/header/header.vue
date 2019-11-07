<template>
	<view class="header">
		
			<template v-if="!$slots.left">
				<view class="headerl">
					<view class="headback" @tap="backGo"></view>
				</view>
			</template>
			<slot name="left"></slot>
		
		
		
			<template v-if="!$slots.main">
				<view class="headerm">
					<view class="headtitle">
						<image class="title_img_only" :src="title" mode="" v-if="only==true"></image>
						<image class="title_img" :src="title" mode="" v-else></image>
					</view>
				</view>
			</template>
			<slot name="main"></slot>
		
		
			<template v-if="!$slots.right">
				<view class="headerr">

				</view>
			</template>
			<slot name="right"></slot>
		
	</view>
</template>

<script>
	
	export default {
		props:['title','only'],
		data() {
			return {

			}
		},
		computed: {
			
		},
		methods: {
			backGo(){
				this.$btnVoile();
				this.$tool.goBack();
			}
		}
	}
</script>

<style scoped lang="scss">
	.header{
		height: 10vh;
		background: $uni-bg-color1;
		border-bottom: 1upx solid $uni-border-color1;
		display: flex;
		position: relative;
		// justify-content: space-between;
		align-items: center;
		.headerl{
			// width:10%;
			height: 100%;
			position: relative;
			display: flex;
			align-items: center;
		}
		.headerm{
			.headtitle{
				display: flex;
				.title_img{
					width:134px;
					height:28px;
				}
				.title_img_only{
					width:190px;
					height:28px;
				}
			}
		}
		.headerr{
			width: 50%;
			height: 100%;
			padding-right: 12px;
			display: flex;
			justify-content: flex-end;
			align-items: center;
		}
	}
	.headback{
		width: 128px;
		height: 48px;
		background: url(../../static/back.png) center no-repeat;
		background-size: 100%;
		// position: absolute;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
</style>
