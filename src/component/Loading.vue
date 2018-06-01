<template>
	<div class="loading" v-if="status">
		<img v-if="loadPic" src="../static/images/icon-loading.png" alt="">
		<span>{{loadText}}</span>
	</div>
</template>
<script>
	export default {
		name: 'Loading',
		data () {
			return {}
		},
		computed: {
			loadText () {
				var loadingText = this.len ? 'Loading' : 'No Data';
				return loadingText;
			},
			loadPic () {
				var loadingPic = this.len ? true : false;
				return loadingPic;
			}
		},
		props: ['status', 'len'],
	}
</script>