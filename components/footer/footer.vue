<template>
	<view class="footer">
		<view class="flex">
			<!-- <image class="tg" src="../../static/footer/tg.png" mode=""></image> -->
			<view class="footer-item" @tap="activeGo">
				<view>
					<image class="tab-icon" src="../../static/footer/tab1.png" mode=""></image>
				</view>
				<view><text>活动</text></view>
			</view>
			<!-- <view class="footer-item">
				<view>
					<image class="tab-icon" src="../../static/footer/tab2.png" mode=""></image>
				</view>
				<view><text>洗码</text></view>
			</view> -->
			<!-- <view class="footer-item">
				<view>
					<image class="tab-icon" src="../../static/footer/tab3.png" mode=""></image>
				</view>
				<view><text>消息</text></view>
			</view> -->
			<view class="footer-item" @tap="serverGo">
				<view>
					<image class="tab-icon" src="../../static/footer/tab4.png" mode=""></image>
				</view>
				<view><text>客服</text></view>
			</view>
			<view class="footer-item last" @tap="transferGo">
				<view>
					<image class="tab-icon" src="../../static/footer/tab5.png" mode=""></image>
				</view>
				<view>转账</view>
			</view>
        </view>
		<view>
			<button class="cu-btn cash" @tap="cashoutGo"></button>
			<button class="cu-btn pay" @tap="payGo"></button>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			activeGo(){
				this.$btnVoile();
				this.$tool.toPowerUrl('/pages/active/active');
			},
			serverGo(){
				this.$btnVoile();
				this.$tool.toPowerUrl('/pages/service/service');
			},
			cashoutGo() {
				this.$btnVoile();
				this.$tool.toPowerUrl('/pages/cashout/cashout');
			},
			payGo() {
				this.$btnVoile();
				this.$tool.toPowerUrl('/pages/pay/pay');
			},
			transferGo(){
				this.$btnVoile();
				this.$tool.toPowerUrl('/pages/transfer/transfer');
			}
		}
	}
</script>

<style scoped lang="scss">
	.footer {
		width: 100%;
		background: $uni-bg-color1;
		border-top: 1upx solid $uni-border-color1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		bottom: 0;
		left: 0;

		.tg {
			width: 205upx;
			height: 94upx;
			padding: 0 10upx;
		}

		.footer-item {
			font-size: 15px;
			color: $uni-text-color1;
			text-align: center;
			width: 62px;
			line-height: 18px;
			position: relative;

			.tab-icon {
				width: 23px;
				height: 23px;
			}

		}

		.footer-item:after {
			content: '';
			width: 2px;
			height: 40px;
			background: url(../../static/footer/line2.png) center right no-repeat;
			background-size: 100%;
			position: absolute;
			top: 50%;
			right: 0;
			transform: translateY(-50%);
		}

		.footer-item.last:after {
			background: none;
		}

		.cash {
			width: 95px;
			height: 51px;
			background: url(../../static/footer/cashout.png) center no-repeat;
			background-size: 100%;
		}

		.pay {
			width: 95px;
			height: 51px;
			margin: 0 15px;
			background: url(../../static/footer/pay.png) center no-repeat;
			background-size: 100%;
		}
	}
</style>
