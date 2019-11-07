import api from '@/common/vmeitime-http/'
import http from '@/common/vmeitime-http/interface'
const state = {
	token: uni.getStorageSync('token') || '',
	userInfo: uni.getStorageSync('userInfo') || {},
	voileState:true
}

const mutations = {
	"CHANGEVOILE":(state, voile)=>{
		state.voileState = voile;
		
	},
	"SET_TOKEN": (state, token) => {
		state.token = token;
		if (token) {
			uni.setStorage({ // 缓存用户登录
				key: 'token',
				data: token
			})
		}

	},
	"SET_USERINFO": (state, info) => {
		if (Object.keys(info).length) {
			uni.setStorage({ // 缓存用户登录
				key: 'userInfo',
				data: info
			})
			state.userInfo = Object.assign({}, state.userInfo, info);
		} else {
			state.userInfo = {};
		}
	},
	logout(state) {
		state.token = false;
		state.userInfo = {};
		uni.removeStorage({
			key: 'userInfo'
		})
	}
}

const actions = {
	changevoile({commit},state){
		commit("CHANGEVOILE",state)
	},
	reg({
		commit,
		dispatch
	}, form) {
		return new Promise((resolve, reject) => {
			api.goReg({
				username: form.username,
				password: form.pwd,
				invitationCode: form.invitationCode
			}).then(res => {
				if (res.data.code == 200) {
					commit('SET_TOKEN', res.data.data.token);
					// var a = await dispath("getUserInfo");
					dispatch("getUserInfo");
					resolve()
				} else {
					reject(res.data.info)
				}
			})
		})
	},
	login({
		commit,
		dispatch
	}, form) {
		return new Promise((req, rej) => {
			api.goLogin({
				username: form.username,
				password: form.password
			}).then(res => {
				if (res.data.code == 200) {
					commit('SET_TOKEN', res.data.data.token);
					// var a = await dispath("getUserInfo");
					dispatch("getUserInfo");
					req()
				} else {
					rej(res.data.info)
				}
			})
		})
	},
	getUserInfo({
		commit
	}) {
		uni.showLoading();
		api.getUserInfo().then((res) => {
			uni.hideLoading();
			commit("SET_USERINFO", res.data.data);
		});

	},
	clearData({
		commit
	}) {
		console.log("我被执行了")
		uni.removeStorage({
			key: 'token',
			success: function() {
				commit("SET_TOKEN", "")
			}
		})
		uni.removeStorage({
			key: 'userInfo',
			success: function() {
				commit("SET_USERINFO", {})
			}
		})
	},
	logout({
		commit,
		dispatch
	}) {
		return new Promise((req, rej) => {
			api.goOut().then(() => {
				dispatch("clearData");
				req();
			})
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
