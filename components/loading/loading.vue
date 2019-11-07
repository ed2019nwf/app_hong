<template>
	<view class="cu-load load-modal" v-if="loading">
		<!-- <view class="cuIcon-emojifill text-orange"></view> -->
		<image src="/static/logo.png" mode="aspectFit"></image>
		<view class="gray-text">加载中...</view>
	</view>
</template>

<script>
	import { mapGetters} from 'vuex';
	export default {
		data() {
			return {

			}
		},
		computed:{
			...mapGetters(['loading'])
		},
		methods: {

		}
	}
</script>

<style>

</style>
