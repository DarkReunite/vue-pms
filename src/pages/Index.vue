<template lang="pug">
    div#main
        a-navdrawer
        a-toolbar
        v-content
            v-container
                keep-alive
                    router-view
</template>

<script>
	import ANavdrawer from '@/components/Navdrawer/Navdrawer.vue';
	import AToolbar from '@/components/Toolbar.vue';
	import { mapActions } from 'vuex';

	export default {
		components: {
			ANavdrawer,
			AToolbar
		},
		data() {
			return {};
		},
		created() {
			this.getUserInfo();
		},
		methods: {
			...mapActions(['getUserInfo'])
		}
	};
</script>

<style lang="scss" scoped>
</style>

