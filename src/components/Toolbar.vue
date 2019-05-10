<template lang="pug">
    v-toolbar(app absolute)
        v-spacer
        v-avatar.pointer(
            :tile="false"
            :size="32"
            @click="account_card = !account_card"
            @mousedown.stop
        )
            img(src="avatar.jpg" alt="avatar")
        v-card#account-card.elevation-6(v-if="account_card" @mousedown.stop)
            v-card-text
                v-layout
                    v-avatar.mr-4(:size="96")
                        img(src="avatar.jpg" alt="avatar")
                    div.account-info
                        div.nick-name.font-weight-bold {{userInfo.nickname}}
                        div.username.body-1 {{userInfo.username}}
                        v-btn.ma-0.mt-3(depressed color="primary" @click="toAccount") 账号信息
            v-card-actions.grey.lighten-3
                v-spacer
                v-btn(flat @click="signOut") 退出
</template>

<script>
import {mapState} from 'vuex';
	export default {
		data() {
			return {
				account_card: false,
			};
		},
		methods: {
			hideCard() {
				this.account_card = false;
			},
			bindHideEvent() {
				document.body.addEventListener('mousedown', this.hideCard);
			},
			unbindHideEvent() {
				document.body.removeEventListener('mousedown', this.hideCard);
            },
            signOut() {
                // 清除token
                window.localStorage.removeItem('token');
                this.$router.push('/login')
            },
            toAccount() {
                this.$router.push('/account')
                this.account_card = false;
            }
        },
        computed: {
            ...mapState(['userInfo'])
        },
		watch: {
			account_card(show) {
				if (show) {
					this.bindHideEvent();
				} else {
					this.unbindHideEvent();
				}
			}
        },
	};
</script>

<style lang="scss" scoped>
#account-card {
	position: fixed;
	width: 266px;
	top: 62px;
	right: 8px;
}

.pointer {
	cursor: pointer;
}
</style>
