/**
 * Created Date: 2019-04-20
 * Author: DarkReunion
 * @description 导出axios对象，以便再次封装
 * @use
 *
 * Copyright (c) 2019 19cm_without_head Team
 */
'use strict';

import Vue from 'vue';
import axios from 'axios';
import store from '../store';

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.VUE_APP_baseURL =
    process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded';

let config = {
    baseURL: process.env.VUE_APP_baseURL || process.env.apiUrl || '',
    timeout: 6 * 1000 // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

// 请求拦截器
_axios.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        let token = window.localStorage.getItem('token');

        // 添加Authorization字段
        config.headers.Authorization = 'Bearer ' + token;
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function(response) {
        // Do something with response data
        let code = response.data.code;
        // 40000为统一的错误码
        if (code === 40000 || code === 41000) {
            store.commit('closeLoading');
            store.commit('openSnackbar', {
                color: 'error',
                text: response.data.msg
            });
            return Promise.reject();
        }
        // 0为请求的码
        if (code === 0) {
            if (response.data.data) {
                return response.data.data;
            }
            return response.data;
        }
        return Promise.reject();
    },
    function(error) {
        // Do something with response error
        store.commit('closeLoading');
        switch (error.response.status) {
            case 401:
                // token认证失败 重新登陆
                store.commit('openSnackbar', {
                    color: 'error',
                    text: error.response.data.msg
                });
                //跳转到登录页
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
                return Promise.reject(error);
        }
        store.commit('openSnackbar', {
            color: 'error',
            text: '请求超时'
        });
        return Promise.reject(error);
    }
);

export default _axios;
