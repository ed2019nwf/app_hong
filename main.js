import Vue from 'vue'
import App from './App'
import api from '@/common/vmeitime-http/'
import store from './store'
import tool from './common/public.js'

/**
 * 全局挂载后使用
 * 使用
 * this.$api.banner({}).then()
 */

Vue.prototype.$api = api


Vue.config.productionTip = false

App.mpType = 'app'

// 按钮音效 
Vue.prototype.$btnVoile = function(){
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
	innerAudioContext.src = '/static/button.mp3';
	innerAudioContext.onPlay(()=>{});
	innerAudioContext.onEnded(()=>{
		innerAudioContext.destroy();
	});
}
    
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard);

// 启动页
import mixAdvert from "@/components/mix-advert/vue/mix-advert";
Vue.component('mix-advert',mixAdvert)

// 头部
// import uniNavBar from './components/uni-nav-bar/uni-nav-bar.vue';
// Vue.component('uni-nav-bar',uniNavBar)


// 文字滚动
import screenTextScroll from '@/components/text-scroll/screenTextScroll.vue'  
Vue.component('textscroll',screenTextScroll) 


// 全屏loading
import Loading from './components/loading/loading.vue'
Vue.component('loading',Loading)

// import modal from '@/components/modal/modal.vue';
// Vue.component('modal',modal)

// import Tips from '@/components/tips/tips.vue'
// Vue.component('Tips',Tips)

Vue.prototype.$store = store;

// 全局跳转封装
Vue.prototype.$tool = tool

const app = new Vue({
    ...App
})
app.$mount()
