<template>
	<view class="loginer" v-if="visible">
		<view class="loginer_title">
			<image class="img" src="../../static/login_reg/title_reg.png" mode=""></image>
		</view>
		<text class="icon-close" @tap="closeReg"></text>
		<form class="main" @submit="formSubmit">
			<scroll-view class="scroll_view" scroll-y>
				<view class="cu-form-group reg">
					<view class="title">账号</view>
					<view class="input-box">
					     <input class="input" placeholder="请输入6-14位字母和数字" name="input" placeholder-style="color:#adadad" v-model="username" @blur="userVerify"></input>
					</view>
				</view>
				<view class="cu-form-group reg">
					<view class="title">密码</view>
					<view class="input-box">
					     <input class="input" type="password" placeholder="请输入6-12位字母或者数字" name="input" placeholder-style="color:#adadad" v-model="pwd"></input>
					</view>
				</view>
				<view class="cu-form-group reg">
					<view class="title">确认密码</view>
					<view class="input-box">
					     <input class="input" type="password" placeholder="请再次输入密码" name="input" placeholder-style="color:#adadad" v-model="pwdSure"></input>
					</view>
				</view>
				<view class="cu-form-group reg">
					<view class="title">邀请码</view>
					<view class="input-box">
					     <input class="input" placeholder="请输入邀请码" name="input" placeholder-style="color:#adadad" v-model="yqm"></input>
					</view>
				</view>
				<view class="login-group">
					<button class="cu-btn" formType="submit"></button>
				</view>
			</scroll-view>
		</form>
	</view>
</template>

<script>
	import {
		mapActions
	} from 'vuex';
	export default {
		props: {
			visible: { type: Boolean, default: false },
		 },
		data() {
			return {
				username: '',
				pwd: '',
				pwdSure:'',
				yqm:''
			}
		},
		methods: {
			...mapActions('user', ['reg']),
			// 检验用户名是否已注册
			userVerify() {
				this.$api.userCheck({
					username: this.username
				}).then(res => {})
			},
			closeReg(){
				this.$btnVoile();
				this.$emit('regcallback',false);
			},
			// 注册提交
			formSubmit() {
				this.$btnVoile();
				if (this.username == '' || this.pwd == '' || this.pwdSure == '') {
					this.$tool.showMag('信息不完整哟')
					return false;
				}
				if(this.pwd != this.pwdSure){
					this.$tool.showMag('两次密码不一致')
					return false;
				}
				this.reg({
					username: this.username,
					pwd: this.pwd,
					invitationCode: this.yqm
				}).then(res => {
					this.$tool.showMag('注册成功')
					this.closeReg();
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import '@/common/login_reg.less';
	.scroll_view{
		height: 200px;
	}
</style>
