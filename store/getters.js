const getters = {
    token: state => state.user.token,
    userInfo: state => state.user.userInfo,
	loading:state => state.tool.loading,
	websock:state=>state.websocket.websock,
	navBarHeight:state=>state.page.navBarHeight,
	voileState:state=>state.user.voileState
}

export default getters;