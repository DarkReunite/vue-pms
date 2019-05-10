/**
 * Created Date: 2019-04-21
 * Author: DarkReunion
 * @description 用户登录接口
 * @use
 *
 * Copyright (c) 2019 19cm_without_head Team
 */

import axios from '@/plugins/http';

const user = {
    login({ username, password }) {
        return axios.post('/login', {
            username,
            password
        });
    },
    getUserInfo() {
        return axios.get('/auth/user_info')
    }
};

export default user;
