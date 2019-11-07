<template>
	<view class="wrap">
		<!-- #ifdef H5 -->
		<div id="landscape">
			<img src="../../static/tips.png" alt="">
		</div>
		<!-- #endif -->
		<Header v-on:backGo="backGo" :title="title" :only="true"></Header>
		<view class="main">
			<view class="main-l">
				<Sidebar :navList="navList" :mark="slideMark" v-on:whoami="whoami"></Sidebar>
			</view>
			<view class="main-r">

				<view class="active-list">
					<view class="active-item" v-for="(item,index) in activeList" :key="index">
						<view class="active-hd">
							<view class="active-l" @tap="showDetail(item)">
								<view class="title">{{item.title}}</view>
								<view class="time">2019-07-18 08:00</view>
								<view class="pic">
									<image class="img" :src="item.cover" mode=""></image>
								</view>
							</view>
							<view class="active-r">
								<navigator url="/pages/service/service" class="help-me"></navigator>
							</view>
						</view>
						<view class="active-bd" v-if="contentId==item.id&&contentState">
							<view class="margin-bottom-xs"><text class="detail-icon"></text>活动详情：</view>
							<view v-html="item.content" class="detail-text"></view>
						</view>
					</view>
				</view>

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
				title: '../../static/active/title.png',
				navList: [{
					navtitle: '全部',
					navicon: '../../static/active/1.png'
				},
				{
					navtitle: '正在进行',
					navicon: '../../static/active/2.png'
				},
				{
					navtitle: '即将开启',
					navicon: '../../static/active/3.png'
				},
				{
					navtitle: '长期活动',
					navicon: '../../static/active/4.png'
				}],
				slideMark: 0,
				contentId:'',
				contentState:false,
				activeAll:[],
				activeDoing:[],
				activeWill:[],
				activeAway:[],
				activeList:[]
			}
		},
		computed: {
			
		},
		components: {
			Header,
			Sidebar
		},
		onLoad() {
			this.getActiveAll();
			this.getActiveDoing();
			this.getActiveWill();
			this.getActiveAway();
		},
		filters: {
			
		},
		methods: {
			backGo() {
				this.$tool.goBack();
			},
			whoami(i) {
				if (i == 0) {
					this.slideMark = i;
					this.activeList = this.activeAll;
				} else if (i == 1) {
					this.slideMark = i;
					this.activeList = this.activeDoing;
				}else if (i == 2) {
					this.slideMark = i;
					this.activeList = this.activeWill;
				}else if (i == 3) {
					this.slideMark = i;
					this.activeList = this.activeAway;
				}
			},
			showDetail(item){
				this.contentId = item.id;
				this.contentState = !this.contentState;
			},
			// 全部
			getActiveAll(){
				this.$tool.showLoading();
				this.$api.getActive().then(res=>{
					this.$tool.hideLoading();
					this.activeAll =  res.data.data;
					this.activeList = this.activeAll;
				})
			},
			// 正在进行的
			getActiveDoing(){
				this.$api.getActive({platform:1}).then(res=>{
					this.activeDoing =  res.data.data;
				})
			},
			// 即将开启的
			getActiveWill(){
				this.$api.getActive({platform:2}).then(res=>{
					this.activeWill =  res.data.data;
				})
			},
			// 一直都进行的
			getActiveAway(){
				this.$api.getActive({platform:3}).then(res=>{
					this.activeAway =  res.data.data;
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	.main-r{
		overflow-y: auto;
	}
	.active-list{
		padding:15px;
		.active-item{
			background: $uni-bg-color2;
			border:1upx solid $uni-border-color4;
			border-radius:$uni-border-radius-sm;
			margin-bottom:15px;
			.active-hd{
				display: flex;
				justify-content: space-between;
				.active-l{
					width:70%;
					height:100%;
					padding:15px;
					position: relative;
					.title{
						font-size: $uni-font-size-lg;
						color:$uni-text-white;
					}
					.time{
						font-size: $uni-font-size-sm;
						color:#585858;
						margin:7px 0;
					}
					.pic{
						width:310upx;
						height:95upx;
						position: relative;
						.img{
							width:100%;
							height:100%;
						}
					}
					.pic:after{
						content:'';
						width:61px;
						height:27px;
						background: url(../../static/active/detail.png) center no-repeat;
						background-size: 100%;
						position: absolute;
						top:0;
						left:-7px;
					}
				}
				.active-l:after{
					content:'';
					width:1px;
					height:152px;
					background: url(../../static/active/line.png) center no-repeat;
					background-size: 100%;
					position: absolute;
					top:50%;
					right:0;
					transform: translateY(-50%);
				}
				.active-r{
					width:30%;
					min-height:150px;
					position: relative;
					.help-me{
						width:90px;
						height:30px;
						background: url(../../static/active/ask.png) center no-repeat;
						background-size: 100%;
						position: absolute;
						top:50%;
						left:50%;
						transform: translate(-50%,-50%)
					}
				}
			}
			.active-bd{
				padding:0 15px 15px 15px;
				font-size: $uni-font-size-sm;
				color:$uni-text-white;
				overflow: hidden;
				.detail-icon{
					display: inline-block;
					width:7px;
					height:7px;
					border:1px solid #fff;
					border-radius:50%;
					margin-right:5px;
				}
				.detail-text{
					line-height: 20px;
				}
			}
		}
	}
</style>



