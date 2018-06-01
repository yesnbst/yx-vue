<template>
	<div class="main">
		<div class="common-panel">
			<img :src="author.profile_image_url" class="cover" alt="">
			<p class="name">{{author.screen_name}}</p>
			<p class="desc">{{author.description}}</p>
			<a href="javascript:void(0)" class="btn-dy">
				<i class="iconfont icon-jia"></i> 关注
			</a>
		</div>

		<div class="dy-list">
			<!-- <div class="dy-tab clearfix">
				<a href="#" class="new-publish">Newest</a>
			</div> -->

			<div class="item item-sina" v-for="item in list">
				<div class="item-content" v-html="item.text"></div>

				<div class="item-pics clearfix" v-if="item.pics.length">
					<div class="item-pics-box " v-for="pic in item.pics">
						<img :src="pic" alt="">
					</div>
				</div>	

				<div class="item-video" v-if="item.video">
					<video :src="item.video" controls="controls"></video>
				</div>

				<div class="item-retweeted" v-if="item.mblogtype == 1">
					<div class="item-content" v-html="item.retext"></div>
					<div class="item-video" v-if="item.revideo">
						<video :src="item.revideo" controls="controls"></video>
					</div>
				</div>
				
				<div class="item-opts clearfix">
					<span class="label lable-weibo fl">Sina</span>
					<span class="fl item-author">{{item.screen_name}}</span>
					<span class="fr item-time">{{item.create_time}}</span>
				</div>
			</div>
		</div>

		<Loading :status="loading" :len="dataLength"></Loading>
	</div>
</template>
<script>
	import Loading from './Loading.vue'
	import api from '../api/api'
	export default {
		name: 'homepage',
		data(){
			return {
				author: {},
				list: [],
				p: 1,
				loading: false,
				dataLength: 0
			}
		},
		components: {
			'Loading': Loading 
		},
		methods: {
			getAuthorInfo(){
				var _t = this;
				var params = {};
				params.id = this.$route.params.id;
				var request = api.getAuthorInfo(params);
				request.then(function(res){
				 	var resp = res.data.data;
				 	_t.author = resp;
				 	_t.getList();
				})
				.catch(function(err){
				 	console.log(err)
				})	
			},
			getList(){
				var _t = this;
				var params = {};
				params.id = _t.author.user_id;
				params.p = _t.p;
				// console.log(params);
				var request = api.getWeiboList(params);
				request.then(function(res){
				 	var resp = res.data.data;
					var arr = [];
				 	for(var i in resp){
				 		arr.push(resp[i]);
				 	}
				 	_t.list = _t.list.concat(arr);
				 	_t.loading = false;
				})
				.catch(function(err){
				 	console.log(err)
				})	
			},
			handleScroll () {
				var _t = this;
				var winHeight = $(window).height();
				var toTop = $(window).scrollTop();
				var docHeight = $(document).height();
				if (docHeight - winHeight - toTop <= 20) {
					console.log(1213);
					if (!_t.loading) {
						_t.p++;
						_t.getList();
						_t.loading = true;
					}
				}
			}
		},
		created(){
			this.getAuthorInfo();
		},
		mounted () {
			window.addEventListener('scroll', this.handleScroll)
		},
		destroyed(){
            window.removeEventListener('scroll', this.handleScroll);
        },
	}
</script>