/**
 * Created by jos on 18/1/11.
 * http配置
 */

import axios from 'axios'
import store from './vuex/store'
import storage from "store2";
import * as types from './vuex/types'
import router from './router'
import { Message } from "element-ui";

const logout = () => {
    const token = storage.get("token");
    token && console.warn(`token[${token}]失效`);
    // Message.error(types.LOGIN_EXPIRE);
    // storage.clear("userName");
    localStorage.removeItem('token');
    // localStorage.removeItem('userName');//+
    store.state.uesrInfor = { userName: '' };
    // 清除token信息并跳转到登录页面
    // store.commit(types.CLEAR_TOKEN);
    router.replace({
        name: "login",
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
};

// axios 配置
axios.defaults.timeout = 10000;
   // axios.defaults.baseURL = 'http://192.168.5.123:8888/suyun-api/api/';
axios.defaults.baseURL = 'http://39.106.136.226:8888/suyun-api/api/';
// http request 拦截器
axios.interceptors.request.use(
    config => {
        const token = storage.get("token");

        if (!!token) {
            config.headers.token = token;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        const { config = {} } = response || {};
        const { params = {} } = config;
        const { code = 0 } = (response.data === null ? {} : response.data);
        switch (code) {
            case 401:
                logout();
                break;
            case 400:
                return response.data;
                break;
        }
        if (params.noInterceptor) {
            return response.data;
        }
        return response.data.data || response.data.msg;
    },
    error => {
        const { response = {} } = error || {};
        let msg = types.NETWORK_ERR;
        switch (response.status) {
            case 401:
                logout();
                return;
                break;
            case 404:
                Message.error(types.INVALID_PATH);
                msg = '123';
                break;
        }
        if (Math.floor(response.status / 100) === 5) {
            msg = types.SERVER_ERROR;
        }
        Message.error(msg);
        // 这里使用 resolve 就不再在每个请求中去处理 catch 了
        return Promise.resolve({ code: -1, msg });
    });

export default axios;