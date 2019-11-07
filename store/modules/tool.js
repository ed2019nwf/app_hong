const state = {
    loading: false
}


const mutations = {
	'CHANGE_LOADING':(state,status)=>{
		state.loading = status;
	}
}

const actions = {
	loading({commit},status){
		commit('CHANGE_LOADING',status);
	}
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
