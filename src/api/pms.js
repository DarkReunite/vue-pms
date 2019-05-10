/**
 * Created Date: 2019-04-22
 * Author: DarkReunion
 * @description pms 后台接口
 * @use
 *
 * Copyright (c) 2019 19cm_without_head Team
 */

import axios from '@/plugins/http';

const pms = {
    addCar({ car_no, card_no }) {
        return axios.post('/pms/car', {
            car_no,
            card_no
        });
    },
    getGarage() {
        // 获取车库中的车辆列表
        return axios.get('/auth/pms/car/list');
    },
    outCar({ cid, car_no, entry_time, out_time, stay_time, payment }) {
        // 汽车出库
        return axios.post('/auth/pms/history', {
            cid,
            car_no,
            entry_time,
            stay_time,
            out_time,
            payment
        });
    },
    getHistory() {
        // 获取停车的历史记录
        return axios.get('/pms/garage/history');
    },
    getParkSetting() {
        return axios.get('/pms/park/info');
    },
    updateParkSetting(params) {
        return axios.post('/pms/park/info', params);
    },
    uploadImage(image) {
        let Form = new FormData();
        Form.append('car_image', image);
        let config = {
            headers: {'Content-Type': 'multipart/form-data'}
        }
        return axios.post('/pms/car_image', Form, config);
    }
};

export default pms;
