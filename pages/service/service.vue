<template>
	<view class="wrap">
		<!-- #ifdef H5 -->
		<div id="landscape">
			<img src="../../static/tips.png" alt="">
		</div>
		<!-- #endif -->
		<Header v-on:backGo="backGo" :title="title"></Header>
		<view class="main">
			<view class="main-l">
				<Sidebar :navList="navList" :mark="slideMark" v-on:whoami="whoami"></Sidebar>
			</view>
			<view class="main-r">
				<template v-if="slideMark==0">
					<view class="service-box">
						<view class="service-list">
							<view class="service-item" v-for="(item,index) in lineList" :key="index">
								<image class="pic" :src="item.icon" mode=""></image>
								<view class="number">{{item.number}}</view>
								<view class="name">{{item.name}}</view>
								<button class="call" @tap="onlineGo"></button>
							</view>
						</view>
					</view>
				</template>
				
                <template v-if="slideMark==1">
					<view class="service-box">
						<view class="service-list">
							<view class="service-item" v-for="(item,index) in wechatList" :key="index">
								<image class="pic" :src="item.icon" mode=""></image>
								<view class="number">{{item.number}}</view>
								<view class="name">{{item.name}}</view>
								<button class="call wechat"></button>
							</view>
						</view>
					</view>
				</template>
				
				<template v-if="slideMark==2">
					<view class="service-box">
						<view class="service-list">
							<view class="service-item" v-for="(item,index) in qqList" :key="index">
								<image class="pic" :src="item.icon" mode=""></image>
								<view class="number">{{item.number}}</view>
								<view class="name">{{item.name}}</view>
								<button class="call"></button>
							</view>
						</view>
					</view>
				</template>

			</view>
		</view>
		
	</view>
</template>
<script>
	import Header from '@/components/header/header.vue'
	import Sidebar from '@/components/sidebar/sidebar.vue'
	export default {
		data() {
			return {
				title: '../../static/service/title.png',
				url:'https://chat56.live800.com/live800/chatClient/chatbox.jsp?companyID=1123519&configID=226250&jid=4500408320&lan=zh&s=1',
				navList: [
				{
					navtitle: '在线客服',
					navicon: '../../static/service/1.png'
				},
				{
					navtitle: '微信客服',
					navicon: '../../static/service/3.png'
				},
				{
					navtitle: 'QQ客服',
					navicon: '../../static/service/2.png'
				}
				],
				slideMark: 0,
				lineList:[
					{
						icon:'../../static/service/girl.png',
						number:'--',
						name:'--'
					}
				],
				qqList:[
					{
						icon:'../../static/service/girl.png',
						number:'--',
						name:'--'
					},
					{
						icon:'../../static/service/girl.png',
						number:'--',
						name:'--'
					}
				],
				wechatList:[
					{
						icon:'../../static/service/ewm.png',
						number:'--',
						name:'--'
					},
					{
						icon:'../../static/service/ewm.png',
						number:'--',
						name:'--'
					}
				]
			}
		},
		computed: {
			
		},
		components: {
			Header,
			Sidebar
		},
		onLoad() {
		},
		filters: {
			
		},
		methods: {
			copyUrl(item){
				// #ifdef APP-PLUS
				   uni.setClipboardData({
				   		data: item.number
				   })
				// #endif
				
				// #ifdef H5
				
				// #endif
			},
			qqStart(item){
				// #ifdef APP-PLUS   
				   this.$tool.toUrl('/pages/webview/webview',{url:"http://wpa.qq.com/msgrd?v=3&uin="+item.number+"&site=qq&menu=yes"});
				   // plus.runtime.openURL("http://wpa.qq.com/msgrd?v=3&uin="+item.number+"&site=qq&menu=yes")
				// #endif
				
				// #ifdef H5
				   window.location.href = "http://wpa.qq.com/msgrd?v=3&uin="+item.number+"&site=qq&menu=yes";
				// #endif
				
			},
			onCopyResult(type) {
				if (type=='success') {
					this.$tool.showMag('复制成功')
				}else {
					this.$tool.showMag('复制失败')
				}
			},
			onlineGo(){
				// #ifdef H5
				   window.location.href= this.url;
				// #endif
				
				// #ifdef APP-PLUS
				   this.$tool.toUrl('/pages/webview/webview',{url:this.url});
				// #endif
			},
			backGo() {
				this.$tool.goBack();
			},
			whoami(i) {
				this.slideMark = i;
			}
		}
	}
</script>
<style scoped lang="scss">
	.service-box{
		padding:20px;
        .service-list{
			display: -webkit-box;
			.service-item{
				width:167px;
				height:225px;
				background: $uni-bg-color2;
				border:1upx solid $uni-border-color4;
				border-radius:$uni-border-radius-sm;
				margin-right:20px;
				padding:10px 0;
				text-align: center;
				.pic{
					width:80px;
					height:80px;
					
				}
				.number{
					font-size: $uni-font-size-base;
					color:$uni-text-color3;
					margin:15px 0;
				}
				.name{
					font-size: $uni-font-size-lg;
					color:$uni-text-white;
					margin-bottom:15px;
				}
				.call{
					width:69px;
					height:24px;
					background: url(../../static/service/ask.png) center no-repeat;
					background-size: 100%;
				}
				.call.wechat{
					background: url(../../static/service/copy.png) center no-repeat;
					background-size: 100%;
				}
			}
		}
	}
</style>



