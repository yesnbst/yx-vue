<template>
	<div class="login">
		<a class="btn-return iconfont icon-custom-back" @click="$router.back()"></a>	
		<img src="../static/images/logo.png" alt="" class="logo">
		<form @submit.prevent="submit">
			<div class="form-item">
				<label for="username" class="iconfont icon-user"></label>
				<input type="text" v-model="loginInput.username" placeholder="请输入用户名" required maxlength="16">
			</div>

			<div class="form-item">
				<label for="username" class="iconfont icon-mima"></label>
				<input type="password" v-model="loginInput.password" placeholder="请输入密码" required maxlength="32">
			</div>

			<div class="sub-item">
				<input type="submit" value="登录">
			</div>	
		</form>
	</div>
</template>
<script>
	import api from '../api/api'
	import { setLocalItem } from '../static/js/utils'

	export default {
		name: 'Login',
		data () {
			return {
				loginInput: {}
			}
		},
		created () {
			// console.log(this.$route.query);
			// console.log(this);
		},
		methods: {
			submit () {
				var request = api.login(this.loginInput);
				request.then(function(res){
				 	var resp = res.data;
				 	console.log(resp);
				 	if (!resp.status) {
				 		alert(resp.info);
				 	} else {
				 		setLocalItem('token', resp.data);
				 		if (this.$route.query.redirect) {
				 			this.$router.replace(this.$route.query.redirect)
				 		} else {
				 			this.$router.replace('/');
				 		}
				 	}
				}.bind(this))
				.catch(function(err){
				 	console.log(err)
				})	
			}
		}
	}
</script>