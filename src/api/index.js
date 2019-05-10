import Vue from 'vue';
import _api from './api.export';

// 将API封装成Vue插件
Plugin.install = function (Vue, options) {
    Vue.api = _api;
    window.api = _api;
    Object.defineProperties(Vue.prototype, {
        api: {
            get() {
                return _api;
            }
        },
        $api: {
            get() {
                return _api;
            }
        }
    })
}

Vue.use(Plugin);

export default Plugin;