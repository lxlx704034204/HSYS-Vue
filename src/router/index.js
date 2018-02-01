/* hello  */
import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
/* login页面组件引入 结束  */
import applyFinance from '@/pages/applyFinance' // 申请塑云金融
import myaddress from '@/pages/myaddress' // 竞价地址管理


// import technician from '@/pages/technician' // 技术专家
// import technicianConsultation from '@/pages/technicianConsultation' // 技术专家电话咨询页
// import technicianConInter from '@/pages/technicianConInter' // 技术专家网络咨询页
// import consultationIndex from '@/pages/consultationIndex' // 技术专家个人首页
// 

// import submitorder from '@/pages/submitorder' // 提交订单
// 
import payment from '@/pages/payment' //付款
import companycenter from '@/pages/companycenter' // 企业中心



import myorderDetails from '@/pages/myorderDetails' // 我的订单详情
// import myserver from '@/pages/myserver' // 我的服务

// import mybill from '@/pages/mybill' // 我的发票

import searchResult from '@/pages/searchResult' // 搜索结果
import recharge from '@/pages/recharge' // 充值
import enchashment from '@/pages/enchashment' // 提现




Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: {
                name: 'home'
            }
        },
        {
            path: '/home',
            name: 'home',
            component: () => import(/* webpackChunkName: "home" */ "@/pages/home"),
        },
        // 自营商城
        {
            path: '/autotrophy',
            name: 'autotrophy',
            component: () => import(/* webpackChunkName: "autotrophy" */ "@/pages/autotrophy"),
        },
        // 订单编辑
        {
            path: '/order',
            name: 'order',
            component: () => import(/* webpackChunkName: "autotrophy" */ "@/pages/order"),
            meta: {
                requireAuth: true
            },
        },
        //订单信息
        {
            path: '/orderlist',
            name: 'orderlist',
            component: () => import(/* webpackChunkName: "autotrophy" */ "@/pages/orderlist"),
            meta: {
                requireAuth: true
            },
        },
        // 塑云金融
        {
            path: '/financial',
            name: 'financial',
            component: () => import(/* webpackChunkName: "financial" */ "@/pages/financial"),
        },
        // 金融申请 
        {
            path: '/applyFinance',
            name: 'applyFinance',
            component: applyFinance
        },
        // 客户资源
        {
            path: '/customer',
            name: 'customer',
            component: () => import(/* webpackChunkName: "customer" */ "@/pages/customer"),
        },
        // 客户资源详情 detailsclass
        // {
        //   path: '/customerDetail',
        //   name: 'customerDetail',
        //   component: customerDetail
        // },
        // 大类详情 
        {
            path: '/detailsclass',
            name: 'detailsclass',
            component: () => import(/* webpackChunkName: "customer" */ "@/pages/detailsclass"),
        },
        // 侧边栏 
        {
            path: '/sidebar',
            name: 'sidebar',
            component: () => import(/* webpackChunkName: "customer" */ "@/pages/sidebar"),
        },
        // 主营产品 
        {
            path: '/mainproduct',
            name: 'mainproduct',
            component: () => import(/* webpackChunkName: "customer" */ "@/pages/mainproduct"),
        },
        // 企业首页 
        {
            path: '/company',
            name: 'company',
            component: () => import(/* webpackChunkName: "customer" */ "@/pages/company"),
        },
        // 客户资源--联系信息
        {
            path: '/customcontact',
            name: 'customcontact',
            component: () => import(/* webpackChunkName: "customer" */ "@/pages/customcontact"),
        },
        //产品详情
        {
            path: '/productDetail',
            name: 'productDetail',
            component: () => import(/* webpackChunkName: "customer" */ "@/pages/productDetail"),
        },
        // 技术专家
        // {
        //     path: '/technician',
        //     name: 'technician',
        //     component: technician
        // },
        // // 技术专家电话咨询页
        // {
        //     path: '/technicianConsultation',
        //     name: 'technicianConsultation',
        //     component: technicianConsultation
        // },
        // // 技术专家网络咨询页
        // {
        //     path: '/technicianConInter',
        //     name: 'technicianConInter',
        //     component: technicianConInter
        // },
        // // 技术专家个人首页
        // {
        //     path: '/consultationIndex',
        //     name: 'consultationIndex',
        //     component: consultationIndex
        // },
        // 资讯中心
        {
            path: '/information',
            name: 'information',
            component: () => import(/* webpackChunkName: "information" */ "@/pages/information"),
        },
        //  资讯中心-咨询详情
        {
            path: '/pleaseconsult',
            name: 'pleaseconsult',
            component: () => import(/* webpackChunkName: "information" */ "@/pages/pleaseconsult"),
        },
        // 竞价专区
        {
            path: '/auction',
            name: 'auction',
            component: () => import(/* webpackChunkName: "auction" */ "@/pages/auction"),
        },
        // 竞价详情
        {
            path: '/auctiondetail',
            name: 'auctiondetail',
            component: () => import(/* webpackChunkName: "auction" */ "@/pages/auctiondetail"),
        },
        // 保证金收银台
        {
            path: '/cash',
            name: 'cash',
            component: () => import(/* webpackChunkName: "auction" */ "@/pages/cash"),
        },
     
        // 物性库
        {
            path: '/properties',
            name: 'properties',
            component: () => import(/* webpackChunkName: "properties" */ "@/pages/properties"),

        }, // 物性库详情
        {
            path: '/properties/propertDetail',
            name: 'propertDetail',
            component: () => import(/* webpackChunkName: "properties" */ "@/pages/propertDetail"),
        },
        // 提交订单
        // {
        //     path: '/submitorder',
        //     name: 'submitorder',
        //     component: submitorder
        // },

        /* 登录  开始 */
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ "@/pages/login"),
        },
        /* 登录  竞价 */
        {
            path: '/loginauct',
            name: 'loginauct',
            component: () => import(/* webpackChunkName: "login" */ "@/pages/loginauct"),
        },
        // 注册
        {
            path: '/register',
            name: 'register',
            component: () => import(/* webpackChunkName: "login" */ "@/pages/register"),
        },
        {
            path: '/forgetpwd1',
            name: 'forgetpwd1',
            component: () => import(/* webpackChunkName: "login" */ "@/pages/login/forgetpwd1"),
        },
        {
            path: '/forgetpwd2',
            name: 'forgetpwd2',
            component: () => import(/* webpackChunkName: "login" */ "@/pages/login/forgetpwd2"),
        },
        {
            path: '/forgetpwd3',
            name: 'forgetpwd3',
            component: () => import(/* webpackChunkName: "login" */ "@/pages/login/forgetpwd3"),
        },
        {
            path: '/forgetpwd4',
            name: 'forgetpwd4',
            component: () => import(/* webpackChunkName: "login" */ "@/pages/login/forgetpwd4"),
        },
            // 注册协议
        {
            path: '/protocol',
            name: 'protocol',
            component: () => import(/* webpackChunkName: "login" */ "@/pages/protocol"),
        },
        /* 登陆结束*/

       

        // 搜索结果页
        {
            path: '/searchResult',
            name: 'searchResult',
            component: searchResult,
        },

        // 充值
        {
            path: '/recharge',
            name: 'recharge',
            component: recharge,
        },

        // 提现
        {
            path: '/enchashment',
            name: 'enchashment',
            component: enchashment,
        },

    


         // 付款页面
        {
            path: '/payment',
            name: 'payment',
            component: payment,
        },

        // 企业中心
        {
            path: '/companycenter',
            name: 'companycenter',
            component: companycenter,
            meta: {
                requireAuth: true
            },
            children: [
                // 默认我的订单
                {
                    path: '',
                    redirect: {
                        name: 'myorder'
                    }
                },
                // 我的订单
                {
                    path: '/companycenter/myorder',
                    name: 'myorder',
                    component: () => import(/* webpackChunkName: "myorder" */ "@/pages/myorder"),
                },

                //待审核
                {
                    path: '/companycenter/toaudited',
                    name: 'toaudited',
                    component: () => import(/* webpackChunkName: "myorder" */ "@/pages/toaudited"),
                },
                //待确定 todetermined
                {
                    path: '/companycenter/todetermined',
                    name: 'todetermined',
                    component: () => import(/* webpackChunkName: "myorder" */ "@/pages/todetermined"),
                },
                //待付款
                {
                    path: '/companycenter/topayment',
                    name: 'topayment',
                    component: () => import(/* webpackChunkName: "myorder" */ "@/pages/topayment"),
                },
                //待收货
                {
                    path: '/companycenter/togoods',
                    name: 'togoods',
                    component: () => import(/* webpackChunkName: "myorder" */ "@/pages/togoods"),
                },
                //已完成 
                {
                    path: '/companycenter/tosigning',
                    name: 'tosigning',
                    component: () => import(/* webpackChunkName: "myorder" */ "@/pages/tosigning"),
                },
                //已取消 
                {
                    path: '/companycenter/cancel',
                    name: 'cancel',
                    component: () => import(/* webpackChunkName: "myorder" */ "@/pages/cancel"),
                },
                // 我的竞价
                {
                    path: '/companycenter/mybid',
                    name: 'mybid',
                    component: () => import(/* webpackChunkName: "minbid" */ "@/pages/mybid"),
                },
                // 竞价成功
                {
                    path: '/companycenter/bidsuccess',
                    name: 'bidsuccess',
                    component: () => import(/* webpackChunkName: "minbid" */ "@/pages/bidsuccess"),
                },
                // 竞价失败
                {
                    path: '/companycenter/bidfail',
                    name: 'bidfail',
                    component: () => import(/* webpackChunkName: "minbid" */ "@/pages/bidfail"),
                },
                // 地址管理
                // {
                //     path: '/companycenter/addressadmin',
                //     name: 'addressadmin',
                //     component:addressadmin
                // },
                // 我的服务
                // {
                //     path: '/companycenter/myserver',
                //     name: 'myserver',
                //     component: myserver
                // },
                // 我的资产
                {
                    path: '/companycenter/myasset',
                    name: 'myasset',
                    component: () => import(/* webpackChunkName: "myasset" */ "@/pages/myasset"),
                },
                // 收支明细
                {
                    path: '/companycenter/myincome',
                    name: 'myincome',
                    component: () => import(/* webpackChunkName: "myasset" */ "@/pages/myincome"),
                },
                // 我的发票
                // {
                //   path: '/companycenter/mybill',
                //   name: 'mybill',
                //   component: mybill
                // },
                // 产品管理
                {
                    path: '/companycenter/management',
                    name: 'management',
                    component: () => import(/* webpackChunkName: "management" */ "@/pages/management"),
                },
                //发布产品
                {
                    path: '/companycenter/bidding',
                    name: 'bidding',
                    component: () => import(/* webpackChunkName: "management" */ "@/pages/bidding"),
                },


                // 我的企业
                {
                    path: '/companycenter/myfirm',
                    name: 'myfirm',
                    component: () => import(/* webpackChunkName: "myfirm" */ "@/pages/myfirm"),
                },
                // 完善企业信息
                {
                    path: '/companycenter/publish',
                    name: 'publish',
                    component: () => import(/* webpackChunkName: "myfirm" */ "@/pages/publish"),
                },
                // 个人信息
                {
                    path: '/companycenter/myinform',
                    name: 'myinform',
                    component: () => import(/* webpackChunkName: "myfirm" */ "@/pages/myinform"),
                },
                // 个人信息1
                {
                    path: '/companycenter/myinform1',
                    name: 'myinform1',
                    component: () => import(/* webpackChunkName: "myfirm" */ "@/pages/myinform/myinform1"),
                },
                // 个人信息2
                {
                    path: '/companycenter/myinform2',
                    name: 'myinform2',
                    component: () => import(/* webpackChunkName: "myfirm" */ "@/pages/myinform/myinform2"),
                },

                // 个人信息4
                {
                    path: '/companycenter/myinform4',
                    name: 'myinform4',
                    component: () => import(/* webpackChunkName: "myfirm" */ "@/pages/myinform/myinform4"),
                },
                // 收获地址管理
                {
                    path: '/companycenter/myaddress',
                    name: 'myaddress',
                    component: () => import(/* webpackChunkName: "myfirm" */ "@/pages/myaddress"),
                },
                // 员工管理
                {
                    path: '/companycenter/mystaff',
                    name: 'mystaff',
                    component: () => import(/* webpackChunkName: "myfirm" */ "@/pages/mystaff"),
                },
                // 添加员工
                {
                    path: '/companycenter/addstaff',
                    name: 'addstaff',
                    component: () => import(/* webpackChunkName: "myfirm" */ "@/pages/addstaff"),
                },
                // 订单详情
                {
                    path: '/companycenter/myorderDetails',
                    name: 'myorderDetails',
                    component: myorderDetails
                }

            ]
        },

    ],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    },
})