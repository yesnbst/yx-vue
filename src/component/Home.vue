<template>
	<div class="main">
		<div class="tab-menu">
			<a href="#" class="active">All</a>
			<a href="#">Website</a>
			<a href="#">Weibo</a>
			<a href="#">Wechat</a>
		</div>
		<div class="list">
			<!-- <div class="item item-wechat">
				<router-link to="/detail/1">
					<h2>Proposal for Nework platform</h2>
					<div class="item-content">
						<p>Nework is an incentive platform based on blockchain technology that connects human work skills. On nework, people can easily participate in all kinds of work as one of the individual business nodes.</p>
					</div>
					<div class="item-pics clearfix">
						<img src="../static/images/pics1.png" alt="">
						<img src="../static/images/pics1.png" alt="">
					</div>	
				</router-link>
				
				<div class="item-opts clearfix">
					<span class="label lable-webchat fl">Wechat</span>
					<span class="fl item-author">author</span>
					<span class="fr item-time">2017-09-19 23:23:02</span>
				</div>
			</div>

			<div class="item item-sina">
				<div class="item-content">
					<p>Nework is an incentive platform based on blockchain technology that connects human work skills. On nework, people can easily participate in all kinds of work as one of the individual business nodes.</p>
				</div>
				<div class="item-pics clearfix">
					<img src="../static/images/pics1.png" alt="">
					<img src="../static/images/pics1.png" alt="">
				</div>	
				
				<div class="item-opts clearfix">
					<span class="label lable-weibo fl">Sina</span>
					<span class="fl item-author">author</span>
					<span class="fr item-time">2017-09-19 23:23:02</span>
				</div>
			</div>

			<div class="item item-website">
				<router-link to="/detail/3">
					<h2>Proposal for Nework platform</h2>
				</router-link>
				
				<div class="item-opts clearfix">
					<span class="label lable-web fl">Website</span>
					<span class="fl item-author">author</span>
					<span class="fr item-time">2017-09-19 23:23:02</span>
				</div>
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
					<router-link :to="'/homepage/'+item.user_id">
						<span class="label lable-weibo fl iconfont icon-sina"></span>
						<span class="fl item-author">{{item.screen_name}}</span>	
					</router-link>
					<span class="fr item-time">{{item.create_time}}</span>
				</div>
			</div>
		</div>

		<Loading :status="loading" :len="dataLength"></Loading>
	</div>
</template>
<script>
	import api from '../api/api'
	import Loading from './Loading.vue'
	export default {
		name: 'Home',
		data () {
			return {
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
			getList(){
				var _t = this;
				var params = {};
				params.p = _t.p;
				var request = api.getIndexWeiboList(params);
				request.then(function(res){
					console.log(res);
				 	var resp = res.data.data;
				 	_t.dataLength = resp.length;
				 	if (resp.length) {
					 	_t.loading = false;	
					 	_t.list = _t.list.concat(resp);
				 	}
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
					if (!_t.loading) {
						_t.p++;
						_t.getList();
						_t.loading = true;
					}
				}
			}
		},
		created(){
			this.getList();
			this.loading = true;
		},
		mounted () {
			window.addEventListener('scroll', this.handleScroll)
		},
		destroyed(){
            window.removeEventListener('scroll', this.handleScroll);
        },
	}
</script>