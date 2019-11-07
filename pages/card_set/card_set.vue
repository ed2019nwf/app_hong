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
				<Sidebar :navList="navList" v-on:whoami="whoami"></Sidebar>
			</view>
			<view class="main-r">
				<template v-if="cardList.length<1">
					<view class="card-box">
						<view class="ip-list">
							<text class="ip-label">持卡人姓名</text>
							<view class="input-ip">
								<input disabled="true" v-model="userInfo.relname"/>
							</view>
						</view>
						<view class="ip-list">
							<text class="ip-label">开户行</text>
							<view class="input-ip">
								<input value="" v-model="cardAddress" />
							</view>
						</view>
						<view class="ip-list">
							<text class="ip-label">银行卡账号</text>
							<view class="input-ip">
								<input type="number" value="" v-model="cardNumber" />
							</view>
						</view>
						<view class="text-color3 text-center text-xs">
							提示：请正确填写开户行，结算时将直接转入此账号
						</view>
						<button class="card-ok" @tap="bindCard"></button>
					</view>
				</template>
				<template v-else>
					<view class="card-list">
						<view class="card-item" v-for="(item,index) in cardList" :key="index">
							<view class="flex justify-between">
								<text class="text-lg">{{item.bank_name}}</text>
								<text class="text-xs">删除</text>
							</view>
							<view class="text-lg margin-top-xs">{{item.card_number}}</view>
						</view>
						<button class="add-card"></button>
					</view>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	import Header from '@/components/header/header.vue'
	import Sidebar from '@/components/sidebar/sidebar.vue'
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				title: '../../static/cashout/cash_title.png',
				navList: [{
						navtitle: '提现到银行',
						navicon: '../../static/cashout/tocard.png'
					},
					{
						navtitle: '银行卡管理',
						navicon: '../../static/cashout/cardset.png'
					},
				],
				cardList:[],
				cardAddress:'',
				cardNumber:''
			}
		},
		computed: {
			...mapGetters(['token', 'userInfo'])
		},
		components: {
			Header,
			Sidebar
		},
		onLoad(){
			this.getCardList();
		},
		methods: {
			backGo() {
				this.$tool.goBack();
			},
			whoami(i){
				if(i==0){
					this.$tool.toPowerUrl("/pages/cashout/cashout");
				}
				else if(i==1){
					this.$tool.toPowerUrl("/pages/card_set/card_set");
				}
			},
			getCardList(){
				this.$tool.showLoading();
				this.$api.getCardList().then(res=>{
					this.$tool.hideLoading();
					this.cardList = res.data.data;
				})
			},
			bindCard(){
				this.$api.addCard({card:this.cardNumber,barch_name:this.cardAddress}).then(res=>{
					
				})
			}
		}
	}
</script>

<style scoped lang="scss">
    .card-box{
		padding-top:100upx;
		.ip-list {
			display: flex;
			justify-content: center;
			align-items: center;
		    margin-bottom: 40upx;
			.ip-label {
				width:15%;
				margin-right:30upx;
				text-align: right;
				font-size: $uni-font-size-lg;
				color: $uni-text-white;
			}
		
			.input-ip {
				width: 50%;
				border: 1upx solid $uni-border-color1;
				border-radius: $uni-border-radius-sm;
				color: #fff;
				padding: 5upx 20upx;
				margin-right: 20upx;
			}
		}
		.card-ok{
			width:254upx;
			height:68upx;
			background: url(../../static/cashout/bind_sure.png) center no-repeat;
			background-size: 100%;
			margin-top:50upx;
		}
	}
	.card-list{
		padding:30upx;
		.card-item{
			width:100%;
			padding:30upx 20upx;
			background:#134975;
			border-radius:$uni-border-radius-sm;
			color:$uni-text-white;
			margin-bottom:30upx;
		}
		.card-item:nth-child(2n){
			background: #E60012;
		}
		.card-item:nth-child(3n){
			background: #148F79;
		}
		.add-card{
			width:204upx;
			height:62upx;
			background: url(../../static/cashout/add_sure.png) center no-repeat;
			background-size: 100%;
		}
	}
</style>
