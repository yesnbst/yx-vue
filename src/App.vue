<template>
	<div id="app">
		<div class="header" v-if="showBar">
			<a v-if="showBack" @click="$router.back()" href="javascript:void(0)" class="btn-back iconfont icon-custom-back"></a>
			<h1>Test</h1>
			<router-link class="btn-login" to="/login" v-if="!isLogin">Login</router-link>
			<span class="btn-login" v-if="isLogin">{{username}}</span>
		</div>

		<div class="nav" v-if="showBar">
			<router-link :to="item.url" v-for="(item, index) in nav" :key="index">
				<i :class="['iconfont', 'icon-'+item.name]"></i>
				<span>{{item.name}}</span>
			</router-link>
		</div>

		<transition name="slide">
	  		<router-view></router-view>
	  	</transition>
	</div>
</template>
<script>
	import api from './api/api'
	import {getLocalItem, clearLocalToken} from './static/js/utils'

	export default {
		name: 'app',
		data(){
			return {
				nav: [{
					name: "recommend",
					url: "/"
				}, {
					name: "follow",
					url: "/follow"
				}, {
					name: "subscript",
					url: "/subscript"
				}],
				showBar: true,
				show: true,
				showBack: false,
				transitionName: '',
				username: '',
				isLogin: false,
			}
		},
		methods: {
			getLoginInfo () {
				var _t = this;
				var token = getLocalItem('token');
				if (token) {
					var request = api.getLoginInfo({token: token});
					request.then((res) => {
						if (res.data) {
							_t.username = res.data.username;
							_t.isLogin = true;
						} else {
							_t.isLogin = false;
							clearLocalToken();
						}
					})
					.catch((err) => {
						console.log(err);
					})
				}
			}
		},
		created(){
			this.getLoginInfo();
			if (this.$route.name == 'Login') {
				this.showBar = false;
			} else {
				this.showBar = true;
			}
		},
		beforeUpdate(){
			if (this.$route.name == 'Homepage') {
				this.showBack = true;
			} else {
				this.showBack = false;
			}

			this.getLoginInfo();
			
			if (this.$route.name == 'Login') {
				this.showBar = false;
			} else {
				this.showBar = true;
			}
		},
	}
</script>
<style>
	#app {height: 100%;}
	.slide-enter-active {
		-webkit-transition: all .3s ease;
		-moz-transition: all .3s ease;
		-ms-transition: all .3s ease;
		transition: all .3s ease;
	}

	.slide-enter {
		-webkit-transform: translateX(30px);
		-moz-transform: translateX(30px);
		-ms-transform: translateX(30px);
		transform: translateX(30px);
		opacity: 0;
	}
	.slide-leave-to {
		-webkit-transform: translateX(-30px);
		-moz-transform: translateX(-30px);
		-ms-transform: translateX(-30px);
		transform: translateX(-30px);
		opacity: 0;
	}
</style>
