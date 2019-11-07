import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import bet from './modules/bet'
import tool from './modules/tool'
import page from './modules/page'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        bet,
		tool,
		page
    },
    getters
})

export default store