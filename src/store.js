import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api/api.export';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoading: false,
        confirmDialog: {
            show: false,
            title: null,
            text: null,
            vm: null,
            func: null,
            params: null,
        },
        snackbar: {
            show: false,
            color: '', // success / error / info / warning
            text: null
        },
        userInfo: {
            username: null,
            nickname: null,
            email: null,
            phone_num: null,

        }
    },
    mutations: {
        openLoading(state) {
            state.isLoading = true;
        },
        closeLoading(state) {
            setTimeout(() => {
                state.isLoading = false;
            }, 500);
        },
        openSnackbar(state, payload) {
            state.snackbar.show = true;
            state.snackbar.color = payload.color;
            state.snackbar.text = payload.text;
        },
        closeSnackbar(state) {
            state.snackbar = {
                show: false,
                text: null,
                color: null
            }
        },
        openConfirm(state, payload) {
            state.confirmDialog = {
                show: true,
                title: payload.title,
                text: payload.text,
                func: payload.func,
                vm: payload.vm,
                params: payload.params
            }
        },
        closeConfirm(state) {
            state.confirmDialog = {
                show: false,
                title: null,
                text: null
            }
        },
        setUserInfo(state, payload) {
            state.userInfo = {
                username: payload.username,
                nickname: payload.nickname,
                email: payload.email,
                phone_num: payload.phone_num
            }
        }
    },
    actions: {
        getUserInfo({commit}) {
            api.user.getUserInfo().then(res => {
                commit('setUserInfo', res)
            })
        }
    }
});
