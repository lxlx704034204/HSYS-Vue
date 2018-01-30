import axios from 'axios';
let config = {
    headers: {
        'Content-Type': 'application/json',
        "token": sessionStorage.token
    }
}
let base = 'http://localhost:3000';
// var app = 'http://192.168.5.123:8888/suyun-api/api/';
var app = 'http://39.106.136.226:8888/suyun-api/api/';
// 阿里测试
axios.defaults.headers.post['token'] = sessionStorage.token;
/* ===============首页商品名称============== */
/**
 * 获取首页产品名称列表
 * @param params
 * @returns {*}
 */
export const getHomeList = params => {
    return axios.get(`${app}product/category`, { params: params }).then(res => res.data.data);
};

/** 
 * 获取首页产品列表
 * @param params
 * @returns {*}
 */
export const getProduct = params => {
    return axios.get(`${app}product/list`, { params: params }).then(res => res.data.data);
};


//自选产品
export const postSelf = params => {
    return axios.post(`${app}product/collection`, { params: params }, { header: localStorage.getItem("token") }).then(res => res.data.data);
};
//自选清单
export const getTable = params => {
    return axios.get(`${app}product/collection`, { params: params }, { header: localStorage.getItem("token") }).then(res => res.data.data);
};

/**
 * 用户登陆页面数据
 * @param params
 * @returns {*}
 */
export const logindata = params => {
        return axios.post(`${app}login`, { params: params }).then(res => res);
    }
    /**
     * 查询自选产品
     * @param params
     * @returns {*}
     */
export const getProducts = params => {
        return axios.get(`${app}product/collection`, { params }).then(res => res.data.data);
    }
    //获取收货地址列表
    //export const getadd = params => {
    //  return axios.get(`${app}/suyun-api/api/address/addressList`, { params: params }).then(res => res.data.data);
    //}


//分页
export const getPage = params => {
    return axios.get(`${app}product/list`, { params: params }).then(res => res.data);
};












/* ===============自营生产============== */
/**
 * 获取自营商城列表数据
 * @param params
 * @returns {*}
 */
export const getProductListByParams = params => {
    return axios.get(`${app}product/list`, { params: params }).then(res => res.data);
};


// 自营商城提交订单
export const submitorder = params => {
    return axios.get(`${app}order/`, { params: params }).then(res => res);
};
/* ===============首页api============== */
/**
 * 获取首页公司列表
 * @param params
 * @returns {*}
 */
export const getCompanyList = params => {
    return axios.get(`${base}/api/company/get`, { params: params }).then(res => res.data.data.list);
};

/**
 * 获取Banner列表
 * @param params
 * @returns {*}
 */
export const getBannerList = params => {
    return axios.get(`${base}/api/company/get`, { params: params }).then(res => res.data.data.banner);
};

/**
 * 专家列表数据
 * @param params
 * @returns {*}
 */
export const getExpertList = params => {
    return axios.get(`${base}/api/index/expertData`, { params: params }).then(res => res.data);
};




/* 物性库页面分类数据
 * @param params
 * @returns {*}
 */
export const getPropertType = params => {
    return axios.get(`${app}basecategory/findcategoryname`, { params: params }).then(res => res.data);
};
/* 物性库页面分类数据
 * @param params
 * @returns {*}
 */
export const getPropertRank = params => {
    return axios.get(`${app}baseproprankdetail/findproprankdetail`, { params: params }).then(res => res.data);
};
/* 物性库页面产品数据
 * @param params
 * @returns {*}
 */
export const getProList = params => {
    return axios.get(`${app}baseproduct/findbaseproductbycondition`, { params: params }).then(res => res.data);
};

/* 物性库详情页面产品数据
 * @param params
 * @returns {*}
 */
// export const getDetList = params => {
//     return axios.get(`${app}/api/mock/detailslist`, { params: params }).then(res => res.data);
//  };







/**
 * 我的订单付款、物流信息数据
 * @param params
 * @returns {*}
 */
export const myorderList = params => {
    return axios.get(`${base}/api/order/detail`, { params: params }).then(res => res.data);
};
/**
 * 我的订单表格数据
 * @param params
 * @returns {*}
 */
export const orderList = params => {
    return axios.get(`${base}/api/product/order`, { params: params }).then(res => res.data);
};
/**
 * 我的发票表格信息
 * @param params
 * @returns {*}
 */
export const billtable = params => {
    return axios.get(`${base}/api/product/invoice`, { params: params }).then(res => res.data);
};
/**
 * 收支明细表格信息
 * @param params
 * @returns {*}
 */
export const incometable = params => {
    return axios.get(`${base}/api/product/detail`, { params: params }).then(res => res.data);
};
/**
 * 员工表格信息
 * @param params
 * @returns {*}
 */
export const mystafftable = params => {
        return axios.get(`${app}user/all`, { params: params }).then(res => res);
    }
    /**
     * 产品管理表格信息
     * @param params
     * @returns {*}
     */
    // export const managementable = params => {
    //     return axios.get(`${app}customerproduct/list` ,{ params: params }).then(res => res.data);
    // }
    /**
     *  
     * 我的服务表格信息
     * @param params
     * @returns {*}
     */
export const myservertable = params => {
    return axios.get(`${base}/api/product/service`, { params: params }).then(res => res.data);
}

/**
 * 资讯中心数据
 * @param params
 * @returns {*}
 */
export const Mationcontent = params => {
        return axios.get(`${base}/api/mock/information`, { params: params }).then(res => res.data.data.Recom);
    }
    /**
     * 资讯中心列表数据
     * @param params
     * @returns {*}
     */
export const Listdetails = params => {
    return axios.get(`${base}/api/mock/information`, { params: params }).then(res => res.data.data.Recom_list);
}

/**
 * 资讯中心tab数据
 * @param params
 * @returns {*}
 */
export const Handoverlist = params => {
    return axios.get(`${base}/api/mock/information`, { params: params }).then(res => res.data.data.Handoverlist);
}

//资讯中心右上角部分
export const ListRightup = params => {
    return axios.get(`${app}/api/article/list`, { params: params }).then(res => res.data);
}

//资讯中心右上角部分点击详情
export const LRUpassage = params => {
    return axios.get(`${app}/suyun-api/api/article/info`, { params: params }).then(res => res.data);
}

/**
 * 客户资源数据
 * @param params
 * @returns {*}
 */
export const Custresources = params => {
    return axios.get(`${base}/api/mock/customer`, { params: params }).then(res => res.data);
}


// 塑云金融
export const finaServer = params => {
    return axios.get(`${base}/api/mock/finaServer`, { params: params }).then(res => res.data);
}

// 塑云金融--提交
export const submitfina = params => {
        return axios.post(`${app}/api/financing/add`, { params: params }).then(res => res.data);
    }
    //我的企业
export const myenterpriseData = params => {
        return axios.get(`${base}/api/product/myenterprise`, { params: params }).then(res => res.data);
    }
    // 

export const ascend = params => {
        return axios.get(`${base}/api/mock/ascend`, { params: params }).then(res => res.data);
    }
    // 
    // 

// 产品管理
// 发布产品
export const releaseProduct = params => {
        return axios.get(`${app}product/category?parent=10000`, { params: params }).then(res => res.data);
    }
    // 编辑产品
export const editProduct = params => {
        return axios.get(`${app}customerproduct/info`, { params: params }).then(res => res.data);
    }
    // 三级联动--发布产品
export const addProduct = params => {
    return axios.get(`${app}area/list`, { params: params }).then(res => res.data);
}

// 发布产品--保存
export const saveProduct = params => {
        return axios.post(`${app}customerproduct/add`, { header: sessionStorage.token }, { params: params }).then(res => res.data);
    }
    // 上i下架
export const online = params => {
    return axios.put(`${app}customerproduct/active`, { header: sessionStorage.token }, { params: params }).then(res => res.data);
}

//下订单
// export const getUsermesg = params => {
//     return axios.get(`${base}/api/order/raddress`, { params: params }).then(res => res.data);
// }
// export const getMaymesg = params => {
//     return axios.get(`${base}/sy_shop/api/Paymentmethod`, { params: params }).then(res => res.data);
// }
//

//技术专家
export const gettableData = params => {
    return axios.get(`${base}/api/technician/expertcf`, { params: params }).then(res => res.data);
}
export const getbanner = params => {
    return axios.get(`${base}/api/technician/exporti`, { params: params }).then(res => res.data);
}
export const getProblemList = params => {
        return axios.get(`${base}/api/technician/problems`, { params: params }).then(res => res.data);
    }
    //
    // 该合并了