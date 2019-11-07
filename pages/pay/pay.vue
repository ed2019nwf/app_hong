<template>
	<view class="wrap">
		<!-- #ifdef H5 -->
		<div id="landscape">
			<img src="../../static/tips.png" alt="">
		</div>
		<!-- #endif -->
		<!-- <Tips :showType="tipState">
			<template slot="content">
				
			</template>
		</Tips> -->

		<Header v-on:backGo="backGo" :title="title">
			<template slot="right">
				<view class="pay-only-head">
					<text class="pay-moninp">{{token?userInfo.balance:'0.0'}}</text>
					<!-- <text class="refresh" @tap="refreshBalance"></text> -->
					<!-- <text class="pay-record"></text> -->
				</view>
			</template>
		</Header>
		<view class="main">
			<view class="main-l">
				<Sidebar :navList="navList" :mark="slideMark" v-on:whoami="whoami"></Sidebar>
			</view>
			<view class="main-r">
				<view class="pay-box">
					<view class="pay-hd">
						<scroll-view class="monthDescTab" scroll-x="true" @scroll="scroll" scroll-left="0">
							<view v-if="navList[slideMark].id=='wx'" class="pay-title" :class="{'on':index==mark}" v-for="(item,index) in wxList" :key="index" @tap="getPayId(item,index)">
								<view>{{item.pay_type | formatPayType}}</view>
								<view class="pay-way">充值通道{{index+1}}</view>
							</view>
							<view v-if="navList[slideMark].id=='zfb'" class="pay-title" :class="{'on':index==mark}" v-for="(item,index) in zfbList" :key="index" @tap="getPayId(item,index)">
								<view>{{item.pay_type | formatPayType}}</view>
								<view class="pay-way">充值通道{{index+1}}</view>
							</view>
						</scroll-view>
					</view>
					<view class="pay-bd">
						<view class="pay-money">
							<view class="tips">玩家常玩的充值金额</view>
							<view class="number">
								<view class="numbox" :class="{'on':payMoney==item}" v-for="(item,index) in moneyList" :key="index" @tap="getMoney(item)">
									<text class="num">{{item}}元</text>
								</view>
							</view>
						</view>
						<view class="pay-input">
							<view class="input-top">
								<view class="input-label">充值金额</view>
								<view class="input-ip">
									<view class="input-box">
										<input type="number" value="" v-model="payMoney" />
									</view>
								</view>
								
								
								<view class="clear" @tap="clearMoney"></view>
							</view>
							<view class="input-bom">温馨提示：微信支付宝支付，支付限额{{min}}~{{max}}元，自动到账</view>
						</view>
						<button class="cu-btn btn-submit" @tap="payGo"></button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Header from '@/components/header/header.vue'
	import Sidebar from '@/components/sidebar/sidebar.vue'
	import {
		mapGetters
	} from 'vuex'
	import {
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				title: '../../static/pay/pay_title.png',
				navList: [],
				moneyList: ['500', '800', '1000', '1200', '1500', '2000', '3000', '5000'],
				mark: 0,
				payMoney: '',
				payList: [],
				payid: '',
				max: '',
				min: '',
				wxList: [],
				zfbList: [],
				tipState: false,
				slideMark: 0
			}
		},
		computed: {
			...mapGetters(['token', 'userInfo'])
		},
		components: {
			Header,
			Sidebar
		},
		onLoad() {
			// 默认微信支付
			this.getPayWay();

		},
		filters: {
			formatPayType(val) {
				switch (val) {
					case 1:
						return "网银";
					case 2:
						return "支付宝";
					case 3:
						return "微信";
					case 4:
						return "QQ";
					case 5:
						return "京东";
					case 6:
						return "银联";
					case 7:
						return "wap网银";
				}
			}
		},
		methods: {
			...mapActions("user", ["getUserInfo"]),
			backGo() {
				this.$tool.goBack();
			},
			getMoney(o) {
				this.$btnVoile();
				this.payMoney = o;
			},
			clearMoney() {
				this.$btnVoile();
				this.payMoney = '';
			},
			whoami(i) {
				if(this.navList[i].id=='wx'){
					this.payList = this.wxList;
				}else if(this.navList[i].id=='zfb'){
					this.payList = this.zfbList;
				}
				this.slideMark = i;
				this.payid = this.payList[this.mark].id;
				this.min = this.payList[this.mark].amount_min;
				this.max = this.payList[this.mark].amount_max;
			},
			// 刷新余额
			refreshBalance() {
				this.getUserInfo();
			},
			getPayId(o, i) {
				this.$btnVoile();
				this.payid = o.id;
				this.mark = i;
				this.max = o.amount_max;
				this.min = o.amount_min;
			},
			// 获取支付方式
			getPayWay() {
				this.$tool.showLoading();
				this.$api.getPayInfo().then(res => {

						this.$tool.hideLoading();

						this.wxList = res.data.data.filter(v => {
							return v.pay_type == 3;
						})

						this.zfbList = res.data.data.filter(v => {
							return v.pay_type == 2;
						})

						if (this.wxList.length != 0) {
							this.navList.push({
								navtitle: '微信充值',
								id:'wx',
								navicon: '../../static/pay/wechat.png'
							})
						}
						if (this.zfbList.length != 0) {
							this.navList.push({
								navtitle: '支付宝充值',
								id:'zfb',
								navicon: '../../static/pay/zfb.png'
							})
						}
					})
					.then(res => {
						this.payList = this.wxList;
						this.payList = this.zfbList;
						this.payid = this.payList[this.mark].id;
						this.min = this.payList[this.mark].amount_min;
						this.max = this.payList[this.mark].amount_max;
					})
			},
			payGo() {
				this.$btnVoile();
				this.$api.payGoUrl({
					id: this.payid,
					money: this.payMoney
				}).then(res => {
					// #ifdef APP-PLUS
					plus.runtime.openURL(res.data.data.url)
					// #endif

					// #ifdef H5
					window.location.href = res.data.data.url;
					// #endif
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.pay-only-head {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-right:10px;
        position: absolute;
		top:50%;
		right:0;
		transform: translateY(-50%);
		.pay-moninp {
			height: 24px;
			width: 150px;
			background: $uni-bg-black;
			border: 1upx solid #333;
			border-radius: $uni-border-radius-sm;
			text-align: center;
			line-height: 24px;
			font-size: $uni-font-size-base;
			color: $uni-text-color1;
			position: relative;
		}

		.pay-moninp:before {
			content: '';
			width: 28px;
			height: 24px;
			background: url(../../static/pay/money_icon.png) center no-repeat;
			background-size: 100%;
			position: absolute;
			top: 0;
			left: -14px;
		}

		.refresh {
			width: 16px;
			height: 16px;
			background: url(../../static/pay/refresh.png) center no-repeat;
			background-size: 100%;
			margin: 0 10px;
		}

		.pay-record {
			width: 78px;
			height: 24px;
			background: url(../../static/pay/pay_record.png) center no-repeat;
			background-size: 100%;
			margin-right: 15px;
		}

	}

	.pay-box {
		padding: 15px;

		.pay-hd {
			display: flex;
			align-items: center;
			font-size: $uni-font-size-base;
			color: $uni-text-color3;
            .monthDescTab{
            	width: 100%;
            	white-space: nowrap;
				
				.pay-title {
					display: inline-block;
					width: 128px;
					background: url(../../static/pay/title.png) center no-repeat;
					background-size: 100%;
					text-align: center;
					margin-right: 25px;
					padding:5px 0;
				
					.pay-way {
						font-size: $uni-font-size-sm;
						margin-top: 2px;
					}
				}
				.pay-title.on {
					background: url(../../static/pay/title_on.png) center no-repeat;
					background-size: 100%;
					color: $uni-text-black;
				}
            }

		}

		.pay-bd {
			width: 100%;
			border: 1upx solid #2e2e31;
			background: $uni-bg-color2;
			padding: 0 14px;
			position: relative;
            margin-top:-4px;
			.pay-money {
				.tips {
					font-size: 13px;
					color: $uni-text-color3;
					margin: 7.5px 0;
				}

				.number {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					flex-wrap: wrap;
					font-size: $uni-font-size-base;
					color: $uni-text-white;

					.numbox {
						width: 25%;
						text-align: center;

						.num {
							display: inline-block;
							width: 98px;
							height: 52px;
							line-height: 52px;
							background: url(../../static/pay/money.png) center no-repeat;
							background-size: 100%;
							text-align: center;
							margin-bottom: 10px;
						}
					}

					.numbox.on {
						.num {
							background: url(../../static/pay/money_on.png) center no-repeat;
							background-size: 100%;
							color: $uni-text-black;
						}
					}

				}
			}

			.pay-input {
				width: 100%;
				background: #201f23;
				border: 1upx solid #333336;
				border-radius: $uni-border-radius-sm;
				padding: 10px 0 10px 10px;
				position: absolute;
				bottom: -68px;
				left: 0;

				.input-top {
					display: flex;
					align-items: center;

					.input-label {
						width: 70px;
						font-size: $uni-font-size-lg;
						color: $uni-text-white;
						margin-right: 10px;
					}

					.input-ip {
						display: flex;
						align-items: center;
						width: 65%;
						min-height: 35px;
						height: 35px;
						border: 1upx solid $uni-border-color1;
						border-radius: $uni-border-radius-sm;
						color: #fff;
						padding:0 10px;
						margin-right: 10px;
					}

					.clear {
						width: 65px;
						height: 28px;
						background: url(../../static/pay/clear.png) center no-repeat;
						background-size: 100%;
					}
				}

				.input-bom {
					font-size: 12px;
					color: $uni-text-color3;
					margin-top: 5px;
				}
			}

			.btn-submit {
				width: 90px;
				height: 33px;
				background: url(../../static/sure.png) center no-repeat;
				background-size: 100%;
				position: absolute;
				bottom: -115px;
				left: 50%;
				transform: translateX(-50%);
			}
		}
	}
</style>
