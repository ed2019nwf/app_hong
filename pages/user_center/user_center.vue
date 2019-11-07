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
				<Sidebar :navList="navList" :mark="model" v-on:whoami="whoami"></Sidebar>
			</view>
			<view class="main-r">
				<view class="info-content">
					<template v-if="model==0">
						<view class="info-item">
							<view class="info-hd">
								<view class="info-a">
									<text class="info-icon"></text>
									<text class="info-text">个人资料</text>
								</view>
							</view>
							<view class="info-bd flex align-center">
								<image class="info-avatar" src="../../static/home/avatar.png" mode=""></image>
								<view class="info-user">
									<view>账号：<text class="text-white">{{userInfo.username}}</text></view>
									<!-- <view>姓名：<text class="text-white">{{userInfo.relname?userInfo.relname:'果子'}}</text></view> -->
								</view>
							</view>
						</view>
						<view class="info-item">
							<view class="info-hd">
								<view class="info-a">
									<text class="info-icon"></text>
									<text class="info-text">基础信息</text>
								</view>
								<template v-if="userInfo.phone==''||userInfo.relname==''">
									<template v-if="isedit">
										<view class="info-b">
											<text class="info-edit"></text>
											<text class="info-text" @tap="userEdit">编辑</text>
										</view>
									</template>
									<template v-else>
										<view class="info-b" @tap="infoSubmit">
											<text class="info-complete"></text>
											<text class="info-text">完成</text>
										</view>
									</template>
								</template>
							</view>
							<view class="info-bd">
								<template v-if="userInfo.phone==''">
									<view class="info-li">
										<text class="info-labal">手机</text>
										<view class="info-ip">
											<view class="input-box">
											      <input type="number" name="input" v-model="phone" :disabled="isdisable" :focus="isfocus"></input>
											</view>
										</view>
										
										<text class="info-code" :class="{'text-code':codeNum<60}" @tap="getCode">{{codeNum === 60?'获取验证码':codeNum+"s"}}</text>
									</view>
									<view class="info-li">
										<text class="info-labal">验证码</text>
										<view class="info-ip">
											<view class="input-box">
											      <input type="text" name="input" v-model="code" :disabled="isdisable"></input>
											</view>
										</view>
									</view>
								</template>
								<template v-else>
									<view class="info-li">
										<text class="info-labal">手机</text>
										<view class="info-ip">
											<view class="input-box">
											      <input type="number" name="input" v-model="userInfo.phone" disabled="true"></input>
											</view>
										</view>
									</view>
								</template>

								<template v-if="userInfo.relname==''">
									<view class="info-li">
										<text class="info-labal">姓名</text>
										<view class="info-ip">
											<view class="input-box">
											      <input type="text" name="input" v-model="truename"></input>
											</view>
										</view>
									</view>
								</template>
								<template v-else>
									<view class="info-li">
										<text class="info-labal">姓名</text>
										<view class="info-ip">
											<view class="input-box">
												<input type="text" name="input" disabled="true" v-model="userInfo.relname"></input>
											</view>
										</view>
									</view>
								</template>

							</view>
						</view>
					</template>
					<template v-if="model==1">

						<scroll-view class="bet-tab" scroll-x="true" @scroll="scroll" scroll-left="0">
							<view class="tab-item" :class="mark==index?'on':''" v-for="(item,index) in betrecord" :key="index" @tap="getClick(index)">{{item.title | betTitleFilter}}</view>
						</scroll-view>

						<view class="bet-hd">
							<text class="v">投注时间</text>
							<text class="v">注单号</text>
							<text class="v">游戏名称</text>
							<text class="v">投注金额</text>
							<text class="v">结算</text>
						</view>
						<!-- <view class="bet-tips">
							<text class="tips-icon"></text>
							<text>由于注单延迟，投注记录最大延迟15分钟</text>
						</view> -->
						<template v-if="betrecord[mark].list.length==0">
							<view class="bet-bd">
								<view class="nothing-box">
								     <image class="nothing-icon" src="../../static/user_center/nothing.png" mode=""></image>
								</view>
							</view>
						</template>
						<template v-else>
							<view class="bet-bd">
								<view class="bet-item" v-for="(item,index) in betrecord[mark].list" :key="index">
									<text class="v">{{item.bet_time}}</text>
									<text class="v">{{item.bill_no}}</text>
									<text class="v">{{item.platform}}</text>
									<text class="v">{{item.valid_blance}}</text>
									<text class="v" :class="{'text-red':item.result<0,'text-green':item.result>0}">{{item.result}}</text>
								</view>
							</view>
						</template>
						
					</template>
					<template v-if="model==2">
						<scroll-view class="bet-tab" scroll-x="true" @scroll="scroll" scroll-left="0">
							<view class="tab-item" :class="mark==index?'on':''" v-for="(item,index) in transrecord" :key="index" @tap="getClick(index)">{{item.title | transTitleFilter}}</view>
						</scroll-view>
						<view class="bet-hd">
							<text class="v">时间</text>
							<text class="v">订单号</text>
							<text class="v">详情</text>
							<text class="v">状态</text>
							<text class="v">余额</text>
						</view>
						<template v-if="transrecord[mark].list.length==0">
							<view class="bet-bd">
								<view class="nothing-box">
									 <image class="nothing-icon" src="../../static/user_center/nothing.png" mode=""></image>
								</view>
							</view>
						</template>
						<template v-else>
							<view class="bet-bd">
								<view class="bet-item" v-for="(item,index) in transrecord[mark].list" :key="index">
									<text class="v">{{item.create_time}}</text>
									<text class="v">{{item.order_id}}</text>
									<text class="v">{{item.content}}</text>
									<text class="v" :class="{'text-red':item.status>0,'text-green':item.status==0}">{{item.status | formatStatus}}</text>
									<text class="v">{{item.money}}元</text>
								</view>
							</view>
						</template>
					</template>
					
					<template v-if="model==3">
						<form class="main" @submit="formSubmit">
							<view class="cu-form-group">
								<!-- <view class="title">密码</view> -->
								<view class="input-box">
								     <input class="input" type="password" placeholder="请输入您的旧密码" name="input" placeholder-style="color:#adadad" v-model="oldpwd"></input>
								</view>
							</view>
							<view class="cu-form-group">
								<!-- <view class="title">密码</view> -->
								<view class="input-box">
								     <input class="input" type="password" placeholder="请输入您的新密码" name="input" placeholder-style="color:#adadad" v-model="newpwd"></input>
								</view>
							</view>
							<view class="cu-form-group">
								<!-- <view class="title">确认密码</view> -->
								<view class="input-box">
								     <input class="input" type="password" placeholder="请再次输入您的新密码" name="input" placeholder-style="color:#adadad" v-model="surenewpwd"></input>
								</view>
							</view>
							<view class="login-group">
								<button class="cu-btn" formType="submit"></button>
							</view>
						</form>
					</template>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Header from '@/components/header/header.vue'
	import Sidebar from '@/components/sidebar/sidebar.vue'
	import {
		mapActions
	} from 'vuex';
	import {
		mapGetters
	} from 'vuex';
	const phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
	export default {
		data() {
			return {
				oldpwd: '',
				newpwd: '',
				surenewpwd:'',
				isedit: true,
				isfocus: false,
				isdisable: true,
				mark: 0,
				model: 0,
				phone: "",
				code: "",
				truename: '',
				codeMsg: '获取验证码',
				codeNum: 60,
				intarval: null,
				betrecord: [
					{
						list:[]
					}
				],
				transrecord: [
					{
						list:[]
					}
				],
				title: '../../static/user_center/user_title.png',
				navList: [{
						navtitle: '个人信息',
						navicon: '../../static/user_center/info.png'
					},
					{
						navtitle: '投注记录',
						navicon: '../../static/user_center/bet.png'
					},
					{
						navtitle: '账户明细',
						navicon: '../../static/user_center/record.png'
					},
					{
						navtitle:'修改密码',
						navicon:'../../static/user_center/pwd.png'
					}
				]
			}
		},
		components: {
			Header,
			Sidebar
		},
		filters: {
			betTitleFilter(v) {
				const bettitlelist = {
						0: '真人视讯',
						1: '体育竞技',
						2: '电子游艺',
						3: '彩票游戏',
						4: '棋牌游戏'
				}
				return bettitlelist[v];
			},
			transTitleFilter(v) {
				const recordtitlelist = {
						0: '转账',
						1: '存款',
						2: '提现',
						3: '优惠'
				}
				return recordtitlelist[v];
			},
			formatStatus(v) {
				const stateMap = {
					0:'成功',
					1:'失败',
					2:'拒绝',
					3:'退回'
				}
				return stateMap[v];
			}
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		onLoad() {
			this.getBetRecord();
			this.getTransRecord();
		},
		methods: {
			...mapActions("user", ["getUserInfo"]),
			userEdit() {
				this.isdisable = false;
				this.isfocus = true;
				this.isedit = false;
			},
			// 监听侧边栏点击
			whoami(i) {
				this.model = i;
				this.isfocus = false;
				this.mark = 0;

			},
			getClick(i) {
				this.mark = i;
			},
			formSubmit() {
				if (this.oldpwd == '' || this.newpwd == '' || this.surenewpwd == '') {
					this.$tool.showMag('信息不完整哟')
					return false;
				}
				if(this.newpwd!=this.surenewpwd){
					this.$tool.showMag('两次密码不一致哦')
					return false;
				}
			    this.$api.updateLoginPwd({oldpassword:this.oldpwd,newpassword:this.newpwd}).then(res=>{
					this.$emit('setcallback',false);
					this.oldpwd ='';
					this.newpwd = '';
					this.surenewpwd = '';
					this.$tool.showMag('修改成功');
				})
				
			},
			getCode() {
				if (this.codeNum < 60) return;
				if (phoneReg.test(this.phone)) {
					this.$api.phoneCodeVerity({
						phone: this.phone,
						genre: 0
					}).then(res => {
						this.countDown();
					})

				} else {
					this.$tool.showMag("手机格式不正确")
				}
			},
			countDown() {
				this.codeNum -= 1;
				this.intarval = setInterval(() => {
					this.codeNum -= 1;
					if (this.codeNum === 0) {
						clearInterval(this.intarval);
						this.intarval = null;
						this.codeNum = 60;
					}
				}, 1000);
			},
			// 绑定信息
			infoSubmit() {
				this.$tool.showLoading();
				if (this.phone != '' && this.code != '') {
					this.$api.phoneVerity({
						phone: this.phone,
						code: this.code
					}).then(res => {
						this.$api.trueNameVerity({
							name: this.truename,
							id: '421085199905241844'
						}).then(res => {
							this.$tool.hideLoading();
							this.$tool.showMag('绑定成功')
							this.getUserInfo()
						})
					})
				} else {
					this.$tool.showMag('填写完整哟')
				}

			},
			// 投注记录
			getBetRecord() {
				this.$api.getBetRecord().then(res => {
					this.betrecord = res.data.data;
				})
			},
			// 交易记录
			getTransRecord() {
				this.$api.getTransRecord().then(res => {
					this.transrecord = res.data.data;
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.main-r {
		width: 100%;
		padding: 10px;
        overflow-x:scroll;
		.info-content {
			width: 100%;
			min-height: 100px;
			// background: $uni-bg-black;
			border-radius: 3px;

			// border: 2upx solid #2F2C2F;
			// 投注记录
			.bet-tab {
				width:100%;
				white-space: nowrap;
				display: flex;
				align-items: center;
				margin-bottom: 10px;

				.tab-item {
					display: inline-block;
					width: 109px;
					height: 32px;
					background: url(../../static/user_center/no_check.png) center no-repeat;
					background-size: 100%;
					margin-right: 10px;
					text-align: center;
					line-height: 32px;
					color: #adadad;
				}

				.tab-item.on {
					background: url(../../static/user_center/yes_check.png) center no-repeat;
					background-size: 100%;
					color: #333;
				}
			}

			.bet-hd {
				height: 27px;
				background: #473f36;
				color: $uni-text-color1;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.v {
					width: 20%;
					text-align: center;
					border-right: 1upx solid #333;
				}

				.v:last-child {
					border: none;
				}
			}

			.bet-tips {
				height: 17px;
				background: #847C68;
				font-size: $uni-font-size-sm;
				color: #321b0a;
				display: flex;
				align-items: center;
				padding-left: 10px;

				.tips-icon {
					width: 10px;
					height: 10px;
					background: url(../../static/user_center/info_icon.png) center no-repeat;
					background-size: 100%;
					margin-right: 10px;
				}
			}

			.bet-bd {
				height: 250px;
				overflow-y:scroll;
				.nothing-box{
					height:270px;
					position: relative;
					.nothing-icon{
						width:97px;
						height:82px;
						position: absolute;
						top:50%;
						left:50%;
						margin-top:-49px;
						margin-left:-41px;
					}
				}
				.bet-item {
					width: 100%;
					height: 35px;
					background: #131313;
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: $uni-font-size-sm;
					color: #adadad;

					.v {
						width: 20%;
						text-align: center;
					}

					.v:last-child {
						border: none;
					}
				}

				.bet-item:nth-child(2n) {
					background: #222123;
				}
			}

			// 个人信息
			.info-item {
				.info-hd {
					height: 27px;
					background: $uni-bg-color2;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 10px;

					.info-a {
						display: flex;
						align-items: center;

						.info-icon {
							width: 10px;
							height: 10px;
							background: url(../../static/user_center/info_icon.png) center no-repeat;
							background-size: 100%;
							margin-right: 10px;
						}

						.info-text {
							font-size: $uni-font-size-base;
							color: $uni-text-color1
						}

					}

					.info-b {
						display: flex;
						align-items: center;

						.info-edit {
							width: 17px;
							height:18px;
							background: url(../../static/user_center/info_edit.png) center no-repeat;
							background-size: 100%;
							margin-right: 5px;
						}

						.info-complete {
							width: 17px;
							height: 18px;
							background: url(../../static/user_center/info_ok.png) center no-repeat;
							background-size: 100%;
							margin-right: 5px;
						}

						.info-text {
							font-size: $uni-font-size-base;
							color: $uni-text-color1
						}
					}

				}

				.info-bd {
					padding: 15px;

					.info-avatar {
						width: 34px;
						height: 34px;
						margin-right: 10px;
					}

					.info-user {
						font-size: $uni-font-size-base;
						color: $uni-text-color2;
					}

					.info-li {
						display: flex;
						align-items: center;
						margin-bottom: 15px;

						.info-labal {
							width: 70px;
							text-align: right;
							font-size: $uni-font-size-base;
							color: $uni-text-color2;
							margin-right: 10px;
						}

                        .info-ip{
							display: flex;
							align-items: center;
							width: 50%;
							min-height: 35px;
							height: 35px;
							border: 1upx solid $uni-border-color3;
							border-radius: $uni-border-radius-sm;
							color: $uni-text-color2;
							padding-left: 10px;
						}
						
						.info-input {
							
						}

						.info-code {
							width: 100px;
							height: 30px;
							line-height: 30px;
							background: $uni-bg-color1;
							border-radius: $uni-border-radius-sm;
							text-align: center;
							color: #777;
							margin-left: 10px;
						}

						.info-code.text-code {
							color: #fff;
						}
					}
				}
			}
		}
	}
	
	.main{
		.cu-form-group{
		    border:none;
			margin-bottom:10px;
			.title{
				width:70px;
				font-size: $uni-font-size-base;
				color:$uni-text-color1;
				text-align: right;
			}
			.input-box{
				width:278px;
				height:45px;
				background: url(../../static/login_reg/input_login.png) center no-repeat;
				background-size: 100% 80%;
				position: relative;
				.input{
					width:100%;
					position: absolute;
					top:50%;
					left:15px;
					transform: translateY(-50%);
				}
			}
	    }
		.login-group{
			text-align: center;
			.cu-btn{
				width:90px;
				height:33px;
				background: url(../../static/sure.png) center no-repeat;
				background-size: 100%;
			}
		}
	}
</style>
