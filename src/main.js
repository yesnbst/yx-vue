import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import qs from 'qs'


	// 加载资源
import './static/js/font.js'  
import './static/css/reset.css'
import './static/css/iconfont.css'
import './static/css/common.css'
import { getLocalItem } from './static/js/utils'

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		var isLogin = getLocalItem('token');
		if (isLogin) {		// 存在token（应继续做判断是否过期或需要刷新请求，此处省略）
			axios({
				method: 'post',
		        url: 'http://118.24.121.86/yx_blog/Home/User/loginInfo',
		        data:  qs.stringify({token: isLogin}),
		        headers: {
			        'Content-Type': 'application/x-www-form-urlencoded',
			    }
			})
			.then((res) => {
				if (res.data) {
					next();
				} else {
					next({
						path: "/login",
						query: {redirect:to.fullPath}
					})
				}
			})
			
		} else {
			next({
				path: "/login",
				query: {redirect:to.fullPath}
			})
		}
	} else {
		next();
	}
	
})


var vm = new Vue({
	el: "#app",
	data: {},
	router,
	template: '<App />',
	components: { App }
})