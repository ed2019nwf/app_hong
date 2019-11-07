/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */
import md5 from 'js-md5'
import store from '@/store/index.js' 

let Timestamp = Date.parse(new Date()) / 1000,
	Sign = md5(Date.parse(new Date()) / 1000 + '7ac66c0f148de9519b8bd264312c4d64'),
	ContentType = 'application/x-www-form-urlencoded';

export default {
	config: {
		baseUrl: "http://m.hongbat.com",
		header: {},
		data: {},
		method: "GET",
		dataType: "json",
		/* 如设为json，会对返回的数据做一次 JSON.parse */
		responseType: "text",
		success() {},
		fail() {},
		complete() {}
	},
	interceptor: {
		request: null,
		response: null
	},
	request(options) {
		if (!options) {
			options = {}
		}
		//TODO 加密数据
		let header = {}
		header["Authorization"] = uni.getStorageSync('token') || '6becf42ae943cfad8a676ace2a13286e';
		header["Sign"] = Sign;
		header["Timestamp"] = Timestamp;
		header["Content-Type"] = ContentType;
		options.header = Object.assign({}, options.header, header)
		console.log(options.header, "我是新的header")

		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = options.baseUrl + options.url
		options.data = options.data || {}
		options.method = options.method || this.config.method
		//TODO 加密数据

		//TODO 数据签名
		/* 
		_token = {'token': getStorage(STOREKEY_LOGIN).token || 'undefined'},
		_sign = {'sign': sign(JSON.stringify(options.data))}
		options.header = Object.assign({}, options.header, _token,_sign) 
		*/

		return new Promise((resolve, reject) => {
			let _config = null

			options.complete = (response) => {
				let statusCode = response.statusCode,
					code = response.data?response.data.code : "";
				response.config = _config
				if (process.env.NODE_ENV === 'development') {
					if (statusCode === 200) {
					}
				}
				if (this.interceptor.response) {
					let newResponse = this.interceptor.response(response)
					if (newResponse) {
						response = newResponse
					}
				}
				// 统一的响应日志记录
				_reslog(response)
				if(statusCode!==200){
					reject();
				}
				if (code === 200) { //成功
					resolve(response);
				} else if(code === 400) {
					store.dispatch("user/clearData"); // 清空缓存数据
					uni.showToast({
						title: '登录超时',
						icon: 'none'
					});
					setTimeout(()=>{
						uni.navigateTo({url:"/pages/index/index"})
					}, 300);
					
				}else{
					uni.showToast({
						title: response.data.info,
						icon: 'none'
					})
				}
			}

			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()

			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}

			// 统一的请求日志记录
			_reqlog(_config)

			// if (process.env.NODE_ENV === 'development') {
			// 	console.log("【" + _config.requestId + "】 地址：" + _config.url)
			// 	if (_config.data) {
			// 		console.log("【" + _config.requestId + "】 参数：" + JSON.stringify(_config.data))
			// 	}
			// }

			uni.request(_config);
		});
	},
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	delete(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	}
}


/**
 * 请求接口日志记录
 */
function _reqlog(req) {
	if (process.env.NODE_ENV === 'development') {
		console.log("【" + req.requestId + "】 地址：" + req.url)
		if (req.data) {
			console.log("【" + req.requestId + "】 请求参数：" + JSON.stringify(req.data))
		}
	}
	//TODO 调接口异步写入日志数据库
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
	// let _statusCode = res.statusCode;
	// if (process.env.NODE_ENV === 'development') {
	// 	console.log("【" + res.config.requestId + "】 地址：" + res.config.url)
	// 	if (res.config.data) {
	// 		console.log("【" + res.config.requestId + "】 请求参数：" + JSON.stringify(res.config.data))
	// 	}
	// 	console.log("【" + res.config.requestId + "】 响应结果：" + JSON.stringify(res))
	// }
	// //TODO 除了接口服务错误外，其他日志调接口异步写入日志数据库
	// switch (_statusCode) {
	// 	case 200:
	// 		break;
	// 	case 401:
	// 		break;
	// 	case 404:
	// 		break;
	// 	default:
	// 		break;
	// }
}
