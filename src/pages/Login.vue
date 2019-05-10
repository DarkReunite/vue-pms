<template lang="pug">
    div#login
        h1.login-img
            img(src="w.png")
        v-card
            v-card-text
                label 用户名
                v-text-field(v-model="username")
                label 密码
                v-text-field(v-model="password" type="password")
            v-card-actions
                v-spacer
                v-btn(flat color="primary" @click="login") 登录
</template>

<script>
	export default {
		data() {
			return {
				username: null,
				password: null
			};
		},
		methods: {
			async login() {
				this.$store.commit('openLoading');
				this.$api.user
					.login({ username: this.username, password: this.password })
					.then(res => {
						this.$store.commit('closeLoading');
                        window.localStorage.setItem('token', res.token);
                        this.$router.push('/')
					})
					.catch(error => {});
			}
		}
	};
</script>

<style lang="scss" scoped>
#login {
	width: 320px;
	padding: 8% 0 0;
	margin: 0 auto;

	h1.login-img {
		text-align: center;
	}

	img {
		height: 84px;
		width: auto;
		margin: 0 auto 25px;
	}
}
</style>
