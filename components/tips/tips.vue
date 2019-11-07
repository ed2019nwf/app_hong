<template>
	<view class="cu-modal show" v-show="showType">
		<view class="cu-dialog">
			<view class="cu-content">
				<slot name="content"></slot>
			</view>
			<view @tap="hideModal">
				<text class="cu-sure"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['showType'],
		data() {
			return {
				modalName: null,
			};
		},
		methods: {
			hideModal(e) {
				this.$emit("hideModal");
			}
		}
	}
</script>
<style>

</style>