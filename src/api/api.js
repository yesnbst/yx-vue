import axios from 'axios'
import qs from 'qs'
import {getLocalItem} from '../static/js/utils'

export default {
	login (formData) {
		return axios({
			method: 'post',
	        url: 'http://118.24.121.86/yx_blog/Home/User/login',
	        data:  qs.stringify(formData),
	        headers: {
		        'Content-Type': 'application/x-www-form-urlencoded',
		    }
		})
	},
	getLoginInfo (formData) {
		return axios({
			method: 'post',
	        url: 'http://118.24.121.86/yx_blog/Home/User/loginInfo',
	        data:  qs.stringify(formData),
	        headers: {
		        'Content-Type': 'application/x-www-form-urlencoded',
		    }
		})
	},
	getIndexWeiboList(formData){
		return axios({
			method: 'post',
	        url: 'http://118.24.121.86/yx_blog/Home/Index/index',
	        data:  qs.stringify(formData),
	        headers: {
		        'Content-Type': 'application/x-www-form-urlencoded',
		    }
		})
	},
	getWeiboAuthor(formData){
		formData.token = getLocalItem('token');
		return axios({
	        method: 'post',
	        url: 'http://118.24.121.86/yx_blog/Home/Spider/weibo',
	        data:  qs.stringify(formData),
	        headers: {
		        'Content-Type': 'application/x-www-form-urlencoded',
		    }
		})
	},
	getAuthorInfo(formData){
		return axios({
			method: 'post',
	        url: 'http://118.24.121.86/yx_blog/Home/Spider/getAuthorDetail',
	        data:  qs.stringify(formData),
	        headers: {
		        'Content-Type': 'application/x-www-form-urlencoded',
		    }
		})
	},
	getWeiboList(formData){
		return axios({
			method: 'post',
	        url: 'http://118.24.121.86/yx_blog/Home/Spider/getWeiboList',
	        data:  qs.stringify(formData),
	        headers: {
		        'Content-Type': 'application/x-www-form-urlencoded',
		    }
		})
	},

	getFollowWeiboList (formData){
		return axios({
			method: 'post',
	        url: 'http://118.24.121.86/yx_blog/Home/User/followWeibo',
	        data:  qs.stringify(formData),
	        headers: {
		        'Content-Type': 'application/x-www-form-urlencoded',
		    }
		})
	},
	getFollowList (formData) {		// 获取关注列表
		if (!formData) {
			formData = {};
		}
		formData.token = getLocalItem('token');
		return axios({
			method: 'post',
	        url: 'http://118.24.121.86/yx_blog/Home/User/getFollowList',
	        data:  qs.stringify(formData),
	        headers: {
		        'Content-Type': 'application/x-www-form-urlencoded',
		    }
		})
	},

	addFollow (formData) {		// 关注事件
		formData.token = getLocalItem('token');
		return axios({
			method: 'post',
	        url: 'http://118.24.121.86/yx_blog/Home/User/addFollow',
	        data:  qs.stringify(formData),
	        headers: {
		        'Content-Type': 'application/x-www-form-urlencoded',
		    }
		})
	},

	cancelFollow (formData) {		// 取消关注事件
		formData.token = getLocalItem('token');
		return axios({
			method: 'post',
	        url: 'http://118.24.121.86/yx_blog/Home/User/cancelFollow',
	        data:  qs.stringify(formData),
	        headers: {
		        'Content-Type': 'application/x-www-form-urlencoded',
		    }
		})
	},






	addInterceptors () {    // 组件单独创建axios拦截器
	    axios.interceptors.request.use(function (config) {
	        // Do something before request is sent
	        // console.log('开始请求'+params);
	        return config
	    }.bind(this), function (error) {
	        // Do something with request error
	        // console.log('请求失败')
	        return Promise.reject(error)
      	})
      	
  		axios.interceptors.response.use(function (config) {
			// Do something before request is sent
			// console.log('响应请求')
			return config
		}.bind(this), function (error) {
			// Do something with request error
			// console.log('响应出错')
			return Promise.reject(error)
		})
	},

}