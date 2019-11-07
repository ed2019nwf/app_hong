<script>
	import Vue from 'vue'
	import http from '@/common/vmeitime-http/interface.js'
	export default {
		onLaunch: function() {

			/**
			 * 强制横屏
			 */
			// #ifdef APP-PLUS
			// 横屏反方向
			plus.screen.lockOrientation("landscape-secondary");

			// 全屏
			plus.navigator.setFullscreen(true);

			// 背景音乐
			const bgAudioMannager = uni.getBackgroundAudioManager();
			bgAudioMannager.src = '/static/music_game.mp3';

			// 热更新
			plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
				uni.showLoading({
					title:"更新中",
					icon: "loading"
				})
				http.get('/v1/bonus/app/get', {
					version: widgetInfo.version,
					name: widgetInfo.name
				}).then(res => {
					uni.hideLoading();
					var data = res.data.data;
					if (data.status && data.wgtUrl) {
						uni.downloadFile({
							url: data.wgtUrl,
							success: (downloadResult) => {
								if (downloadResult.statusCode === 200) {
									plus.runtime.install(downloadResult.tempFilePath, {
										force: false
									}, function() {
										// uni.showToast({
										// 	title:'更新完成',
										// 	icon:'success'
										// })
										plus.runtime.restart();
									}, function(e) {});
								}
							}
						});
					}
				})

			});
			// #endif

			// #ifdef H5

			// #endif

			/**
			 * 获得头部高度
			 */
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBarHeight = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBarHeight = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBarHeight = e.statusBarHeight + 45;
					};
					// #endif
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "/common/main.css";
	@import "/common/icon.css";
	@import "/common/animation.css";
	/*每个页面公共css */
</style>
