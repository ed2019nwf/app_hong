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
				<!------------------------ 提现到银行卡 ------------------------------>
				<template v-if="slideMark == 0">
					<view class="cash-box">
						<view class="cash-one">
							<view>账户余额：<text class="onel">￥{{token?userInfo.balance:'0.0'}}元</text></view>
						</view>
						<template v-if="cardList.length<1">
							<view class="cash-three">
								<view class="three-l">
									<view class="input-pic"></view>
									<view>
										<view class="text-lg text-color1 margin-bottom-xs">提现到银行卡</view>
										<view class="text-sm text-color3">您暂时未绑定银行卡,请前往绑定</view>
									</view>
								</view>
								<button class="cu-btn bind-card" @tap="toBindCard"></button>
							</view>
						</template>
						<template v-else>
							<view class="cash-card">
								<view class="flex justify-between">
									<text class="text-lg">{{checkCardList[0].bank_name}}</text>
									<text class="text-xs" @tap="toChangeCard">更换银行卡</text>
								</view>
								<view class="text-lg margin-top-xs">{{checkCardList[0].card_number | cardNumberFilter}}</view>
							</view>
							<view class="cash-two">
								<view class="input-label">提现金额</view>
								<view class="input-ip">
									<view class="input-box">
										<input type="number" value="" v-model="cashMoney" />
									</view>
								</view>
								<view class="clear" @tap="clearMoney"></view>
							</view>
							<view class="cash-two">
								<view class="input-label">资金密码</view>
								<view class="input-ip">
									<view class="input-box">
										<input type="password" value="" v-model="pwd" />
									</view>
								</view>
							</view>
							<button class="cu-btn btn-cash" @tap="cashSubmit"></button>
						</template>
					</view>
				</template>
				<!---------------------- 银行卡管理 ---------------------------->
				<template v-if="slideMark==1">
					<template v-if="cardList.length<1 || onlyShow">
						<view class="card-box">
							<view class="ip-list">
								<text class="ip-label">持卡人姓名</text>
								<view class="input-ip">
									<view class="input-box">
										<input disabled="true" v-model="userInfo.relname"/>
									</view>
								</view>
							</view>
							<view class="ip-list">
								<text class="ip-label">开户行</text>
								<view class="input-ip">
									<view class="input-box">
									     <input value="" v-model="cardAddress" />
									</view>
								</view>
							</view>
							<view class="ip-list">
								<text class="ip-label">银行卡账号</text>
								<view class="input-ip">
									<view class="input-box">
									     <input type="number" value="" v-model="cardNumber" />
									</view>
								</view>
							</view>
							<view class="text-color3 text-center text-xs">
								提示：请正确填写开户行，结算时将直接转入此账号
							</view>
							<button class="cu-btn card-ok" @tap="bindCard"></button>
						</view>
					</template>
					<template v-else>
						<view class="card-list">
							<view class="card-item" v-for="(item,index) in cardList" :key="index" @tap="checkCard(item)">
								<view class="flex justify-between">
									<text class="text-lg">{{item.bank_name}}</text>
								</view>
								<view class="text-lg margin-top-xs">{{item.card_number | cardNumberFilter}}</view>
							</view>
							<button class="cu-btn add-card" @tap="toAddCard"></button>
						</view>
					</template>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	import Header from '@/components/header/header.vue'
	import Sidebar from '@/components/sidebar/sidebar.vue'
	import {mapGetters} from 'vuex'
	import {
		mapActions
	} from 'vuex'
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
				bankid:'',
				cashMoney: '',
				pwd:'',
				cardList:[],
				slideMark:0,
				onlyShow:false,
				cardNumber:'',
				cardAddress:'',
				checkCardList:[]
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
		filters:{
			cardNumberFilter(v){
				let reg = /^(\d{4})\d+(\d{4})$/;
				return v.replace(reg,'$1 **** **** $2');
			}
		},
		methods: {
			...mapActions("user", ["getUserInfo"]),
			backGo() {
				this.$tool.goBack();
			},
			clearMoney(){
				this.$btnVoile();
				this.cashMoney = '';
			},
			whoami(i){
				if(i==0){
					this.slideMark = i;
				}
				else if(i==1){
					this.slideMark = i;
				}
				this.onlyShow = false;
			},
			toBindCard(){
				this.slideMark = 1;
			},
			toChangeCard(){
				this.slideMark = 1;
			},
			toAddCard(){
				this.slideMark = 1;
				this.onlyShow = true;
			},
			checkCard(o){
				this.slideMark = 0;
				this.checkCardList = [];
				this.checkCardList.push(o);
			},
			bindCard(){
				this.$btnVoile();
				if(this.cardAddress!=''&&this.cardNumber!=''){
					this.$api.addCard({card:this.cardNumber,barch_name:this.cardAddress}).then(res=>{
						this.cardNumber = '';
						this.cardAddress = '';
					}).then(res=>{
						this.getCardList();
					})
				}else{
					this.$tool.showMag('填写完整哦')
				}
			},
			getCardList(){
				this.$tool.showLoading();
				this.$api.getCardList().then(res=>{
					this.$tool.hideLoading();
					this.cardList = res.data.data;
				}).then(res=>{
					this.checkCardList.push(this.cardList[0]);
					this.bankid = this.checkCardList[0].id;
				})
			},
			cashSubmit(){
				this.$btnVoile();
				if(this.cashMoney!=''&&this.pwd!=''){
					this.$api.cashSubmit({bank_id:this.bankid,money:this.cashMoney,ithdrawal_password:this.pwd}).then(res=>{
						this.$tool.showMag('提款申请成功');
						this.getUserInfo();
					})
				}else{
					this.$tool.showMag('填写完整哦')
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.cash-box {
		padding: 15px;
        position: relative;
		.cash-one {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 15px;
			font-size: $uni-font-size-lg;
			color: $uni-text-color3;

			.onel {
				color: $uni-text-color1;
			}
		}

		.cash-two {
			width: 100%;
			background: $uni-bg-color1;
			border: 1upx solid $uni-border-color4;
			border-radius: $uni-border-radius-sm;
			padding: 10px 20px;
			display: flex;
			align-items: center;
			margin-bottom: 15px;

			.input-label {
				width: 70px;
				font-size: $uni-font-size-lg;
				color: $uni-text-white;
				margin-right: 10px;
			}

			.input-ip {
				width: 65%;
				border: 1upx solid $uni-border-color1;
				border-radius: $uni-border-radius-sm;
				color: #fff;
				padding: 0 10px;
				margin-right: 10px;
				height: 35px;
				min-height: 35px;
				display: flex;
				align-items: center;
				
				.input-i{
					
				}
			}

			.clear {
				width: 65px;
				height: 28px;
				background: url(../../static/cashout/clear.png) center no-repeat;
				background-size: 100%;
			}
		}

		.cash-three {
			width: 100%;
			background: $uni-bg-color2;
			border: 1upx solid $uni-border-color4;
			border-radius: $uni-border-radius-sm;
			padding: 20px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 15px;

			.three-l {
				display: flex;

				.input-pic {
					width: 44px;
					height: 44px;
					background: url(../../static/cashout/card_icon.png) center no-repeat;
					background-size: 100%;
					margin-right: 15px;
				}
			}

			.bind-card {
				width: 75px;
				height: 28px;
				background: url(../../static/cashout/bindcard.png) center no-repeat;
				background-size: 100%;
				display: block;
				margin:auto;
			}
		}
        .cash-card{
			width:100%;
			padding:15px 10px;
			background: $uni-bg-color1;
			border: 1upx solid $uni-border-color4;
			border-radius:$uni-border-radius-sm;
			color:$uni-text-white;
			margin-bottom:15px;
		}
		.btn-cash {
			width: 90px;
			height: 33px;
			background: url(../../static/sure.png) center no-repeat;
			background-size: 100%;
			display: block;
			margin:auto;
			// position: absolute;
			// left:50%;
			// bottom:-40upx;
			// transform: translateX(-50%);
		}
	}
    .card-box{
		padding-top:40px;
		.ip-list {
			display: flex;
			justify-content: center;
			align-items: center;
		    margin-bottom: 20px;
			.ip-label {
				width:20%;
				margin-right:15px;
				text-align: right;
				font-size: $uni-font-size-base;
				color: $uni-text-white;
			}
		
			.input-ip {
				width: 50%;
				border: 1upx solid $uni-border-color1;
				border-radius: $uni-border-radius-sm;
				color: #fff;
				padding: 2px 10px;
				margin-right: 10px;
				height: 35px;
				min-height: 35px;
				display: flex;
				align-items: center;
				.input-i{
					// height: 70upx;
					// min-height: 70upx;
					// display: flex;
					// align-items: center;
				}
			}
		}
		.card-ok{
			width:127px;
			height:34px;
			background: url(../../static/cashout/bind_sure.png) center no-repeat;
			background-size: 100%;
			display: block;
			margin:20px auto;
		}
	}
	.card-list{
		padding:15px;
		.card-item{
			width:100%;
			padding:15px 10px;
			background:#134975;
			border-radius:$uni-border-radius-sm;
			color:$uni-text-white;
			margin-bottom:15px;
		}
		.card-item:nth-child(2n){
			background: #E60012;
		}
		.card-item:nth-child(3n){
			background: #148F79;
		}
		.add-card{
			width:102px;
			height:31px;
			background: url(../../static/cashout/add_sure.png) center no-repeat;
			background-size: 100%;
			display: block;
			margin:auto;
		}
	}
</style>
