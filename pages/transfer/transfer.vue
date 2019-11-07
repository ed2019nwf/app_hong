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

				<view class="cash-box">
					<view class="cash-card">
						<view class="input-label">转出账户</view>
						<view class="account">{{transFrom.name}}{{transFrom.balance=='/'?'':'('+transFrom.balance+'元)'}}</view>
						<view class="icon-box">
							<text class="chose" @tap="choseAccountFrom"></text>
						</view>
					</view>
					<view class="cash-card">
						<view class="input-label">转入账户</view>
						<view class="account">{{transTo.name}}{{transTo.balance=='/'?'':'('+transTo.balance+'元)'}}</view>
						<view class="icon-box">
							<text class="chose" @tap="choseAccountTo"></text>
						</view>
					</view>
					<view class="cash-card last">
						<view class="input-label">转入金额</view>
						<view class="input-ip">
							<view class="input-box">
								<input cursor-spacing="0" type="number" v-model="cashMoney" />
							</view>
						</view>
						<view class="icon-box">
							<text class="clear" @tap="clearMoney"></text>
						</view>
					</view>
					<button class="btn-sure" @tap="transGo"></button>
				</view>

			</view>
		</view>
		<template v-if="popState">
			<view class="pop_wrap">
				<view class="pop_box">
					<view class="pop_hd">
						<view class="img-box">
							 <image class="img" src="../../static/transfer/pop_title.png" mode=""></image>
						</view>
					</view>
					<view class="pop_bd">
						<picker-view :indicator-style="indicatorStyle" @change="bindChange" :value="arr" :mask-style="coverbg">
						    <picker-view-column style="color:#fff;">
						        <view class="item" v-for="(item,index) in platformList" :key="index">
										<text>{{item.platform_name}}({{item.balance | filterNum}}元)</text>
								</view>
						    </picker-view-column>
						</picker-view>
					</view>
					<text class="pop_close" @tap="closePop"></text>
					<text class="pop_sure" @tap="transFromSure"></text>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	import Header from '@/components/header/header.vue'
	import Sidebar from '@/components/sidebar/sidebar.vue'
	import {
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				title: '../../static/transfer/title.png',
				navList: [{
					navtitle: '转账',
					navicon: '../../static/transfer/trans.png'
				}],
				popState:false,
				cashMoney: '',
				slideMark: 0,
				index:0,
				// array: [{name:'中国'},{name: '美国'}, {name:'巴西'}, {name:'日本'}],
				platformList:[],
				arr:[],
				indicatorStyle: `height: 30px;background:rgba(	255,222,173,.1);`,
				coverbg:`background:none`,
				transFrom:{
					name:'请选择',
					id:'',
					balance:'/'
				},
				transTo:{
					name:'请选择',
					id:'',
					balance:'/'
				},
				isInorOut:''
			}
		},
		computed: {
			// ...mapGetters(['token', 'userInfo'])
		},
		components: {
			Header,
			Sidebar
		},
		onLoad() {
			this.getPlatform();
		},
		filters: {
			cardNumberFilter(v) {
				let reg = /^(\d{4})\d+(\d{4})$/;
				return v.replace(reg, '$1 **** **** $2');
			},
			filterNum(num){
				let reg = /([0-9]+\.[0-9]{2})[0-9]*/;
                return num.replace(reg,"$1");
			}
		},
		methods: {
			...mapActions("user", ["getUserInfo"]),
			backGo() {
				this.$tool.goBack();
			},
			clearMoney() {
				this.$btnVoile();
				this.cashMoney = '';
			},
			whoami(i) {
				if (i == 0) {
					this.slideMark = i;
				} else if (i == 1) {
					this.slideMark = i;
				}
			},
			bindChange (e) {
				this.$btnVoile();
				// console.log(this.arr)
				if(e.detail.value){
					this.arr[0] = e.detail.value;
				}
				this.index = e.detail.value;
			},
			// 获取所有平台信息
			getPlatform(){
				this.$tool.showLoading();
				this.$api.getPlatform().then(res=>{
					this.$tool.hideLoading();
					this.platformList = res.data.data;
				})
			},
			// 转出
			choseAccountFrom(){
				this.$btnVoile();
				this.popState = true;
				this.isInorOut = 0;
			},
			// 转入
			choseAccountTo(){
				this.$btnVoile();
				this.popState = true;
				this.isInorOut = 1;
			},
			closePop(){
				this.$btnVoile();
				this.popState = false;
			},
			// 点击弹窗里的确定时，即判定是转出还是转入，0是转出，1是转入
			transFromSure(){
				if(this.isInorOut==0){
					this.transFrom.id = this.platformList[this.index].conf_id;
					this.transFrom.name = this.platformList[this.index].platform_name;
					this.transFrom.balance = this.platformList[this.index].balance;
				}else{
					this.transTo.id = this.platformList[this.index].conf_id;
					this.transTo.name = this.platformList[this.index].platform_name;
					this.transTo.balance = this.platformList[this.index].balance;
				}
				this.popState = false;
			},
			// 转账
			transGo(){
				this.$btnVoile();
				if(this.transFrom.name=='请选择'||this.transTo.name=='请选择'||this.cashMoney==false){
					this.$tool.showMag('不合理的操作哟')
				}
				else{
					this.$api.transferGo({in:this.transFrom.id,out:this.transTo.id,money:this.cashMoney}).then(res=>{
						this.$tool.showMag('额度转换成功');

						// 成功后界面重组
						this.transFrom = {
							name:'请选择',
							id:'',
							balance:'/'
						}
						this.transTo = {
							name:'请选择',
							id:'',
							balance:'/'
						}
						this.cashMoney = '';
						setTimeout(()=>{
							this.getUserInfo();
							this.getPlatform();
						},1000);
						
					})
				}
				
			}
		}
	}
</script>

<style scoped lang="scss">
	picker-view {
	    width: 100%;
	    height: 140px;
	}
	.item {
		    height: 30px;
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: center;
			line-height: 0;
	}
	.cash-box {
		padding: 15px;
		.cash-card {
			width: 100%;
			background: $uni-bg-color1;
			border: 1upx solid $uni-border-color4;
			border-radius: $uni-border-radius-sm;
			padding: 10px 20px;
			display: flex;
			align-items: center;
			margin-bottom: 15px;

			.input-label {
				width: 15%;
				font-size: $uni-font-size-lg;
				color: $uni-text-white;
				margin-right: 10px;
			}

			.account {
				width: 70%;
				font-size: $uni-font-size-lg;
				color: $uni-text-color1;
				margin-right: 10px;
			}

			.input-ip {
				width: 70%;
				border: 1upx solid $uni-border-color1;
				border-radius: $uni-border-radius-sm;
				color: #fff;
				padding: 0 10px;
				margin-right: 10px;
				height: 35px;
				min-height: 35px;
				display: flex;
				align-items: center;
			}

			.icon-box {
				width: 15%;
				display: flex;
				align-items: center;
				justify-content: flex-end;

				.chose {
					display: inline-block;
					width: 65px;
					height: 28px;
					background: url(../../static/transfer/chose.png) center no-repeat;
					background-size: 100%;
				}

				.clear {
					display: inline-block;
					width: 65px;
					height: 28px;
					background: url(../../static/cashout/clear.png) center no-repeat;
					background-size: 100%;
				}
			}

		}

		.cash-card.last {
			background: $uni-bg-color2;

			.input-ip {
				width: 70%;
				border: 1px solid #3a393f;
				border-radius: $uni-border-radius-sm;
				color: #fff;
				padding: 2px 10px;
				margin-right: 10px;
			}
		}

		.btn-sure {
			width: 90px;
			height: 33px;
			background: url(../../static/sure.png) center no-repeat;
			background-size: 100%;
			margin-top: 25px;
		}
	}
</style>
