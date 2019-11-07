/**
 * 公用方法
 */

import store from '../store'

const tool = {
	/*
		跳转，url不可以为底部导航地址
	*/
	toUrl(url, parm) {
		let parms = "";
		if(parm){
			parms = this.objToUrl(parm)
		}
		uni.navigateTo({
			url: url + (parm ? `?${parms}` : '')
		})
	},
	/**
	 * 跳转需要登录的页面
	 */
	toPowerUrl(url, parm) {
		const {
			token
		} = store.getters;
		let parms = "";
		if(parm){
			parms = this.objToUrl(parm)
		}
		if (token) {
			uni.navigateTo({
				url: url + (parm ? `?${parms}` : '')
			})
		}else{
			uni.showToast({
				title:'未登录',
				icon:'none'
			})
		}
	},
	/**
	 * 跳转tabBar页面
	 */
	toTabBar(url, parm) {
		console.log(store)
		let parms = "";
		if(parm){
			parms = this.objToUrl(parm)
		}
		console.log(parm)
		
		uni.switchTab({
			url: url + (parm ? `?${parms}` : '')
		})
	},
	/**
	 * 返回上个页面
	 */
	goBack() {
		uni.navigateBack()
	},
	/**
	 * 参数序列化
	 */
	objToUrl(obj){
		let arr = [];
		for(let i in obj){
			if (obj.hasOwnProperty(i)) {
				arr.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
			}
		}
		return arr.join("&");
	},
	showLoading(){
		uni.showLoading({
			title:"加载中",
			icon: "loading"
		})
	},
	hideLoading(){
		uni.hideLoading()
	},
	showMag(msg,type){
		uni.showToast({
			title:msg,
			duration:2000,
			icon:type === 'success'?'success':'none'
		})
	}
}



export default tool;
