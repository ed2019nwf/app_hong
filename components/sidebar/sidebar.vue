<template>
	<view>
		<template v-if="!$slots.index">
			<view class="side-bar">
				<view class="sidebar-box">
					<view class="sidebar-item" :class="mark==index?'on':''" v-for="(item,index) in navList" :key="index" @tap="whoami(index)">
						<image class="slide-icon" :src="item.navicon" mode=""></image>
						<text>{{item.navtitle}}</text>
					</view>
				</view>
			</view>
		</template>
		<slot name="index"></slot>
	</view>

</template>

<script>
     export default{
		 props:['navList','mark'],
		 data(){
			 return{}
		 },
		 methods:{
			 whoami(index){
				 this.$btnVoile();
				 this.$emit('whoami',index);
			 }
		 }
	 }
</script>

<style scoped lang="scss">
	.side-bar {
		width:143px;
		height: 90vh;
		background: $uni-bg-black;
		border-right: 1upx solid $uni-border-color1;
		padding-top: 20px;
		margin:auto;

		.sidebar-box {
			width: 100%;
			height: 216px;
			overflow-y: auto;

			.sidebar-item {
				width:100%;
				height: 47px;
				background: url(../../static/sidebar/pay_nav1.png) center no-repeat;
				background-size: 100%;
				font-size: $uni-font-size-lg;
				color: $uni-text-color1;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				position: relative;
                .slide-icon{
					width:23px;
					height:23px;
					margin: 0 10px;
				}
			}
            .sidebar-item.on{
				background: url(../../static/sidebar/pay_nav2.png) center no-repeat;
				background-size: 100%;
				color:$uni-text-black;
			}
			.sidebar-item:after {
				content: '';
				width: 140px;
				height: 1px;
				background: url(../../static/sidebar/line1.png) center no-repeat;
				background-size: 100%;
				position: absolute;
				bottom: 0;
				left: 0;
			}
		}
	}
</style>
