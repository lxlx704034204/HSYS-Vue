// 是否为开发阶段
let isNeedLogin = false;
// 存储集中状态
let store = null;
// 存储路由
let router = null;
// NeedLoginArr
// notLoginArr
let notLoginArr = [
    'home',
    'forgetpwd1',
    'forgetpwd2',
    'forgetpwd3',
    'forgetpwd4'  
]





export const startLogin = function (options) {
    if (options.isNeedLogin) isNeedLogin = options.isNeedLogin;
    router = options.router;
    store = options.store;
    // login();
}
