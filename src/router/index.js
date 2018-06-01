import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../component/Home.vue'
import Detail from '../component/Detail.vue'
import Subscription from '../component/Subscription.vue'
import Discovery from '../component/Discovery.vue'
import Subscribed from '../component/Subscribed.vue'
import Homepage from '../component/Homepage.vue'
import Follow from '../component/Follow.vue'
import Login from '../component/Login.vue'

Vue.use(VueRouter)

VueRouter.prototype.goBack = function () {
	this.isBack = true
	window.history.go(-1)
}

export default new VueRouter({
	routes: [
		{
			path: "/",
			redirect: '/home'
		},{
			path: "/home",
			name: "Home",
			component: Home
		},{
			path: "/login",
			name: "Login",
			component: Login
		},{
			path: "/subscript",
			redirect: "/subscription/discovery"
		},{
			path: "/subscription",
			name: "Subscription",
			component: Subscription,
			children: [
				{
					path: 'discovery',
					name: "discovery",
					component: Discovery
				},{
					path: 'subscribed',
					name: "subscribed",
					component: Subscribed,
					meta: {requiresAuth: true}
				}
			]
		},{
			path: "/detail/:id",
			name: "Detail",
			component: Detail
		},{
			path: "/homepage/:id",
			name: "Homepage",
			component: Homepage
		},{
			path: "/follow",
			name: 'Follow',
			component: Follow,
			meta: {requiresAuth: true}
		}
	]
})