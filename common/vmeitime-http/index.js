import http from './interface'

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */

// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
export const test = (data) => {
	/* http.config.baseUrl = "http://localhost:8080/api/"
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
		}
	} */
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		console.log('个性化response....')
		//判断返回状态 执行相应操作
		return response;
	}
	return http.request({
		baseUrl: 'https://unidemo.dcloud.net.cn/',
		url: 'ajax/echo/text?name=uni-app',
		dataType: 'text',
		data,
	})
}

export const isLogin = false;

// 站内信
export const getMessage = (data) => {
	return http.request({
			url: '/v1/member/message',
			method: 'POST',
			data
		}) 
}

// 优惠活动
export const getActive = (data) => {
	return http.request({
			url: '/v1/bonus/activity',
			method: 'POST',
			data
		}) 
}

// 转账
export const transferGo = (data) => {
	return http.request({
			url: '/v1/transfer',
			method: 'POST', 
			data,
		}) 
}

// 所有平台
export const getPlatform = () => {
	return http.request({
		url: '/v1/commit/gameplatform',
		method: 'GET'
	})
}

// 游戏列表
export const getGameList = () => {
	return http.request({
		url: '/v1/bonus/gamelist',
		method: 'POST'
	})
}

// 公告栏
export const getNotice = () => {
	return http.request({
		url: '/v1/commit/marquee',
		method: 'GET'
	})
}

// 轮播图
export const banner = () => {
	return http.request({
		url: '/banner/36kr',
		method: 'GET'
	})
}
// 登录
export const goLogin = (data) => {
	return http.request({
			url: '/v1/join/login',
			method: 'POST', 
			data,
		}) 
}
// 注册
export const goReg = (data) => {
	return http.request({
			url: '/v1/join/register',
			method: 'POST', 
			data,
		}) 
}
// 检验用户名是否可用
export const userCheck = (data) => {
	return http.request({
			url: '/v1/join/check/username',
			method: 'GET',
			data
		}) 
}
// 用户信息
export const getUserInfo=()=>{
	return http.request({
		url:"/v1/member/info",
		method:'GET'
	})
}

// 获取支付
export const getPayInfo = ()=>{
	return http.request({
		url:"/v1/onlinepay/info",
		method:"GET"
	})
}

// 支付
export const payGoUrl = (data)=>{
	return http.request({
		url:"/v1/onlinepay/dopay",
		method:"POST",
		data
	})
}

// 获取银行卡列表
export const getCardList = ()=>{
	return http.request({
		url:'/v1/member/get/banks',
		method:'GET'
	})
}

// 获取投注记录列表
export const getBetRecord = ()=>{
	return http.request({
		url:'/v1/member/new/bet/logs',
		method:'GET'
	})
}
// 获取交易记录列表
export const getTransRecord = ()=>{
	return http.request({
		url:'/v1/member/new/transaction/details',
		method:'GET'
	})
}

// 新增银行卡 (card,barch_name)
export const addCard = (data)=>{
	return http.request({
		url:'/v1/member/add/newbank',
		method:'POST',
		data
	})
}

// 提现 (bank_id,money,ithdrawal_password)
export const cashSubmit = (data)=>{
	return http.request({
		url:'/v1/member/draw',
		method:'POST',
		data
	})
}

// 实名认证(name,id)
export const trueNameVerity = (data)=>{
	return http.request({
		url:"/v1/member/idverification",
		method:"POST",
		data
	})
}

// 发送验证码(phone,genre=0)
export const phoneCodeVerity = (data)=>{
	return http.request({
		url:"/v1/code/sendsms",
		method:"POST",
		data
	})
}

// 手机认证(phone,code)
export const phoneVerity = (data)=>{
	return http.request({
		url:"/v1/member/changephone",
		method:"POST",
		data
	})
}

// 修改登录密码(oldpassword,newpassword)
export const updateLoginPwd = (data)=>{
	return http.request({
		url:"/v1/member/newchangepassword",
		method:"POST",
		data
	})
}

// 修改提现密码(oldithdrawalpassword,ithdrawalpassword)
export const updateOutPwd = (data)=>{
	return http.request({
		url:"/v1/member/changeithdrawalpassword",
		method:"POST",
		data
	})
}

// 退出
export const goOut = (data)=>{
	return http.request({
		url:"/v1/join/logout",
		method:"POST"
	})
}



// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
	isLogin,
	test,
	banner,
	goLogin,
	getUserInfo,
	getPayInfo,
	payGoUrl,
	goReg,
	userCheck,
	trueNameVerity,
	goOut,
	phoneCodeVerity,
	phoneVerity,
	getCardList,
	addCard,
	cashSubmit,
	getBetRecord,
	getTransRecord,
	getNotice,
	getGameList,
	getPlatform,
	transferGo,
	getActive,
	getMessage,
	updateLoginPwd
}
