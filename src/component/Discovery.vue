<template>
	<div class="fx-box">
		<div class="fx-list clearfix">
			<div class="fx-item" v-for="(item, index) in author">
				<router-link :to="'/homepage/'+item.user_id">
					<img :src="item.profile_image_url" alt="">
					<p class="text-overflow fx-name">{{item.screen_name}}</p>
				</router-link>
				<a href="javascript:void(0)" class="btn-dy" @click="follow(item.id, index)">
					<i class="iconfont icon-jia"></i> 关注
				</a>
			</div>
		</div>
	</div>
</template>
<script>
	import api from '../api/api'
	import {getLocalItem} from '../static/js/utils'

	export default {
		name: 'discovery',
		data(){
			return {
				author: [],
			}
		},
		methods: {
			getAuthorList(){
				var _t = this;
				var params = {};
				params.p = 1;
				var request = api.getWeiboAuthor(params);
				request.then(function(res){
				 	var resp = res.data.data;
				 	var newArr = [];
				 	for(var i in resp){
				 		newArr.push(resp[i]);
				 	}
				 	_t.author = newArr;
				})
				.catch(function(err){
				 	console.log(err)
				})	
			},
			follow (id, index) {
				var _t = this;
				var token = getLocalItem('token');
				if (token) {
					var checkLogin = api.getLoginInfo({token: token});
					checkLogin.then((res) => {
						if (res.data) {
							var params = {id: id};
							var request = api.addFollow(params);
							request.then(function(res){
							 	console.log(res);
							 	var resp = res.data;
							 	if (resp.status) {
							 		_t.author.splice(index, 1);
							 	}
							})
							.catch(function(err){
							 	console.log(err)
							})
						} else {
							_t.$router.push({
								path: '/login', 
								query: {redirect: this.$route.fullPath}
							});
						}
					})
					.catch((err) => {
						console.log(err);
					})
				} else {
					_t.$router.push({
						path: '/login', 
						query: {redirect: this.$route.fullPath}
					});
				}
			}
		},
		created () {
			this.getAuthorList();
		}
	}
</script>