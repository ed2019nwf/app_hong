<template>
	<view class="cu-modal bottom-modal my-modal" @tap="hideModal" :class="modalStatus?'show':''">
		<view class="cu-dialog" @tap.stop="">
			<view class="cu-bar solid-bottom">
				<template v-if="!$slots.head">
					<view class="action text-white1 ">{{title}}</view>
					<view class="action text-white1 cuIcon-close" @tap="hideModal"></view>
				</template>
				<slot name="head"></slot>
			</view>
			<view class="padding modal-list text-left">
				<scroll-view scroll-y="true" class="modal-list-scroll">
					<slot name="container" />
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			title:{
				default:"标题",
				type:String
			},
			modalStatus:{
				default:false,
				type:[String,Boolean]
			}
		},
		mounted() {
			console.log(this.$slots)
			console.log(this.$route)
		},
		methods:{
			hideModal(){
				this.$emit("hideModal")
			}
		}
	}
</script>

<style lang="scss">
	.my-modal.cu-modal.bottom-modal .cu-dialog{
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
	}
	.modal-list {
		height: 600upx;
		.modal-list-scroll{
			height: 500upx;
		}
	}
</style>
