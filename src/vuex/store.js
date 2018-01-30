import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as types from './types'
import VuexPersistence from "vuex-persist"
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

// 创建 store 实例
export default new Vuex.Store({
    plugins: [vuexLocal.plugin],
    // plugins: [VuexPersistence()],
    actions,
    getters,
    state: {
        searchType:1,
        user:{},
        // header Type
        headerType: 0, // 1表示首页类型的头部， 2表示自营商城头部，3表示登录头部
        count: 10,
        token: sessionStorage.token,
        title: '',
        cashmoney:'',
        uesrInfor: {userName:''},
        customer: {},
        codeMap: {}
    },
    
    mutations: {
        [types.LOGIN]: (state, data) => {
            sessionStorage.token = data;
            state.token = data;
        },
        [types.LOGOUT]: (state) => {
            sessionStorage.removeItem('token');
            state.token = null
        },
        [types.TITLE]: (state, data) => {
            state.title = data;
        },
        switchSearchType(state, type){
            state.searchType = type;
        },
        // 切换选择
        changeUser(state, user) {
            state.user = user;
        },
        // 切换头部
        switchHeaderType(state, type){
            state.headerType = type;
        },
        INCREMENT(state) {
            state.count++
        },
        DECREMENT(state) {
            state.count--
        },
        login(state, username) {
            state.login = !!username;
            state.username = username;
        },
        cash(state ,  cash) {
            state.cash = priceprice  
        },   
        setUesrInfor(state, uesrInfor) {
            state.uesrInfor = uesrInfor;
        },
        setCustomer(state, customer) {
            state.customer = customer;
        },
        codeMap(state, codeMap) {
            state.codeMap = codeMap;
        }
    }
})
