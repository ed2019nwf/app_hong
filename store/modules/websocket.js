import store from './bet'

let timerId = 0;

// 保持连接
function keepAlive(websock){
	var timeout = 2000;
	if(websock.readyState == websock.OPEN){
		websock.send('心在跳动');
	}
	timerId = setTimeout(keepAlive, timeout)
}

// 取消保持状态
function cancelKeepAlive(){
	if(timerId){
		clearTimeout(timerId)
	}
}

const state = {
	websock:null
}

const mutations = {
	SET_WEBSOCKET(state,websock){
		state.websock = websock
	}
}

const actions = {
	START_WEBSOCKET({commit}){
		const url = 'wss://xxxxxx/?aaa=123';
		commit('SET_WEBSOCKET',new WebSocket(url))
		state.websock.onopen = ()=>{
			
			keepAlive(state.websock);
		}
	},
	CLOSE_WEBSOCKET({commit}){
		state.websock.onclose=()=>{
			
			cancelKeepAlive();
		}
	}
}

export default{
	namespaced:true,
	state,
	mutations,
	actions
}