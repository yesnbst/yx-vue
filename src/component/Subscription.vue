<template>
	<div class="main">
		<div class="tab-menu tab-menu-gz">
			<router-link to="/subscription/discovery" :class="{'active': this.$route.name == 'discovery'}">发现</router-link>
			<router-link to="/subscription/subscribed" :class="{'active': this.$route.name == 'subscribed'}">关注</router-link>
		</div>

		<router-view></router-view>
	</div>
</template>
<script>
	export default {
		name: 'subscription',
		data(){
			return {
				
			}
		},
		mounted(){
			// console.log(this.$route);
		},
	}
</script>
