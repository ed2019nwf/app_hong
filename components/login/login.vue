<template>
	<view class="loginer" v-if="visible">
		<view class="loginer_title">
			<image class="img" src="../../static/login_reg/title_login.png" mode=""></image>
		</view>
		<text class="icon-close" @tap="closeLogin"></text>
		<form class="main" @submit="formSubmit">
			<view class="cu-form-group login">
				<view class="title">账号</view>
				<view class="input-box">
				     <input class="input" placeholder="请输入您的账号" name="input" placeholder-style="color:#adadad" v-model="username"></input>
				</view>
			</view>
			<view class="cu-form-group login">
				<view class="title">密码</view>
				<view class="input-box">
				     <input class="input" type="password" placeholder="请输入您的密码" name="input" placeholder-style="color:#adadad" v-model="password"></input>
				</view>
			</view>
			<view class="login-group">
				<button class="cu-btn" formType="submit"></button>
			</view>
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
		components: {

		},
		data() {
			return {
				username: '',
				password: '',
				checkbox: {
					value: 'A',
					checked: true
				},
				eye:true
			}
		},
		methods: {
			...mapActions('user', ['login']),
			closeLogin(){
				this.$btnVoile();
				this.$emit('logincallback',false);
			},
			formSubmit() {
				this.$btnVoile();
				if (this.username == '' || this.password == '') {
					this.$tool.showMag('信息不完整哟')
					return false;
				}
				uni.showLoading({
					title: 'loading'
				});

				this.login({
					username: this.username,
					password: this.password
				}).then(() => {
					uni.hideLoading();
					this.$tool.showMag('登录成功')
					this.closeLogin();
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import '@/common/login_reg.less';
</style>
