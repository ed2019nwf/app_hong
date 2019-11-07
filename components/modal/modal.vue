<template>
	<view class="cu-modal" :class="show?'show':''">
		<view class="cu-dialog" :style="{'background-color':bg}">
			<view class="cu-bar bg-white justify-end">
				<view class="content">{{title}}</view>
				<view class="action" @tap="hideModal">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
			<view class="padding-xl">
				{{contant}}
			</view>
			<view class="cu-bar bg-white justify-end" >
				<view class="action" v-if="haveBottom">
					<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
					<button class="cu-btn bg-green margin-left" @tap="subModal">确定</button>
				</view>
				<view class="action" v-if="!haveBottom">
					<slot name="bottom" />
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			show:{
				type:[String,Boolean],
				default:false
			},
			title:{
				type:[String],
				default:'我是标题'
			},
			contant:{
				type:String,
				default:'我是内容'
			},
			haveBottom:{
				type:[String,Boolean],
				default:true
			},
			bg:{
				type:String,
				default:'rgb(35,45,66)'
			}
		},
		methods:{
			hideModal(){
				this.$emit('hideModal')
			},
			subModal(){
				this.$emit('subModal')
			}
		}
	}
</script>

<style>
</style>
