<template>
	<div class="fx-box">
		<div class="fx-list clearfix">
			<div v-for="(item, index) in followList" class="fx-item">
				<router-link :to="'/homepage/'+item.user_id">
					<img :src="item.profile_image_url" alt="">
					<p class="text-overflow fx-name">{{item.screen_name}}</p>
				</router-link>
				<a href="javascript:void(0)" class="btn-dy btn-dyed" @click="cancel(index)">
					Cancel
				</a>
			</div>
		</div>
	</div>
</template>
<script>
	import api from '../api/api'

	export default {
		name: 'subscribed',
		data(){
			return {
				followList: []
			}
		},
		created () {
			this.getFollowList();
			console.log(this)
		},
		methods: {
			getFollowList () {
				var _t = this;
				var request = api.getFollowList();
				request.then((res) => {
					console.log(res.data);
					var resp = res.data;
				 	if (resp.length) {
					 	_t.followList = _t.followList.concat(resp);
				 	}
				})
				.catch((err) => {
					console.log(err);
				})
			},
			cancel (index) {
				if (confirm('确认取消该微博？')) {
					var _t = this;
					var params = {
						id: _t.followList[index].itemId
					};
					var request = api.cancelFollow(params);
					request.then((res) => {
						var resp = res.data;
						console.log(resp);
					 	if (resp.status) {
						 	_t.followList.splice(index, 1);
					 	}
					})
					.catch((err) => {
						console.log(err);
					})	
				}
			}
		}
	}
</script>