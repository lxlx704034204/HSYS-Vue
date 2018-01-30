/* hello  */
import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
/* login页面组件引入  开始*/
import login from '@/pages/login'
import loginauct from '@/pages/loginauct'
import register from '@/pages/register'
import forgetpwd1 from '@/pages/login/forgetpwd1'
import forgetpwd2 from '@/pages/login/forgetpwd2'
import forgetpwd3 from '@/pages/login/forgetpwd3'
import forgetpwd4 from '@/pages/login/forgetpwd4'
/* login页面组件引入 结束  */
/* 企业中心个人信息 开始  */
import myinform1 from '@/pages/myinform/myinform1'
import myinform2 from '@/pages/myinform/myinform2'
import myinform4 from '@/pages/myinform/myinform4'
/* 企业中心个人信息 结束  */
import autotrophy from '@/pages/autotrophy' //自营商城
import order from '@/pages/order' //订单编辑
import orderlist from '@/pages/orderlist' //订单信息
import financial from '@/pages/financial' // 塑云金融
import applyFinance from '@/pages/applyFinance' // 申请塑云金融
import customer from '@/pages/customer' // 客户资源
// import customerDetail from '@/pages/customerDetail'    // 客户资源详情 
import detailsclass from '@/pages/detailsclass' //大类详情
import mainproduct from '@/pages/mainproduct' //主营产品
import company from '@/pages/company' //企业首页
import sidebar from '@/pages/sidebar' //侧边栏
import productDetail from '@/pages/productDetail' // 产品详情
import customcontact from '@/pages/customcontact' // 客户资源联系方式

import technician from '@/pages/technician' // 技术专家
import technicianConsultation from '@/pages/technicianConsultation' // 技术专家电话咨询页
import technicianConInter from '@/pages/technicianConInter' // 技术专家网络咨询页
import consultationIndex from '@/pages/consultationIndex' // 技术专家个人首页
import information from '@/pages/information' // 资讯中心
import pleaseconsult from '@/pages/pleaseconsult' // 资讯中心-咨询详情
import auction from '@/pages/auction' // 竞价专区
import auctiondetail from '@/pages/auctiondetail' // 竞价详情
import cash from '@/pages/cash' // 保证金收银台
import properties from '@/pages/properties' // 物性库
import propertDetail from '@/pages/propertDetail' //物性库详情
import submitorder from '@/pages/submitorder' // 提交订单

import companycenter from '@/pages/companycenter' // 企业中心

import myorder from '@/pages/myorder' // 我的订单
import todetermined from '@/pages/todetermined' // 待确定
import topayment from '@/pages/topayment' // 待付款 
import payment from '@/pages/payment' //付款
import togoods from '@/pages/togoods' // 待收货
import toaudited from '@/pages/toaudited' // 待审核 
import tosigning from '@/pages/tosigning' //已完成
import cancel from '@/pages/cancel' //已取消


import myorderDetails from '@/pages/myorderDetails' // 我的订单详情
import mybid from '@/pages/mybid' // 我的竞价
import bidsuccess from '@/pages/bidsuccess' // 竞价成功
import bidfail from '@/pages/bidfail' // 竞价失败
import addressadmin from '@/pages/addressadmin' // 竞价地址管理
import myserver from '@/pages/myserver' // 我的服务

import myasset from '@/pages/myasset' // 我的资产
import myincome from '@/pages/myincome' // 收支明细
// import mybill from '@/pages/mybill' // 我的发票

import management from '@/pages/management' // 产品管理
import bidding from '@/pages/bidding' // 发布产品

import myfirm from '@/pages/myfirm' // 我的企业
import publish from '@/pages/publish' //完善企业信息
import myinform from '@/pages/myinform' // 个人信息
import mystaff from '@/pages/mystaff' // 员工管理
import myaddress from '@/pages/addressadmin' // 收货地址管理
import addstaff from '@/pages/addstaff' // 添加员工
import searchResult from '@/pages/searchResult' // 搜索结果
import recharge from '@/pages/recharge' // 充值
import enchashment from '@/pages/enchashment' // 提现
import protocol from '@/pages/protocol' // 用户注册协议




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
            component: home
        },
        // 自营商城
        {
            path: '/autotrophy',
            name: 'autotrophy',
            component: autotrophy,
        },
        // 订单编辑
        {
            path: '/order',
            name: 'order',
            component: order,
            meta: {
                requireAuth: true
            },
        },
        //订单信息
        {
            path: '/orderlist',
            name: 'orderlist',
            component: orderlist,
            meta: {
                requireAuth: true
            },
        },
        // 塑云金融
        {
            path: '/financial',
            name: 'financial',
            component: financial
        },
        // 客户资源
        {
            path: '/customer',
            name: 'customer',
            component: customer
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
            component: detailsclass
        },
        // 侧边栏 
        {
            path: '/sidebar',
            name: 'sidebar',
            component: sidebar
        },
        // 主营产品 
        {
            path: '/mainproduct',
            name: 'mainproduct',
            component: mainproduct
        },
        // 企业首页 
        {
            path: '/company',
            name: 'company',
            component: company
        },
        // 客户资源--联系信息
        {
            path: '/customcontact',
            name: 'customcontact',
            component: customcontact
        },
        //产品详情
        {
            path: '/productDetail',
            name: 'productDetail',
            component: productDetail
        },
        // 技术专家
        {
            path: '/technician',
            name: 'technician',
            component: technician
        },
        // 技术专家电话咨询页
        {
            path: '/technicianConsultation',
            name: 'technicianConsultation',
            component: technicianConsultation
        },
        // 技术专家网络咨询页
        {
            path: '/technicianConInter',
            name: 'technicianConInter',
            component: technicianConInter
        },
        // 技术专家个人首页
        {
            path: '/consultationIndex',
            name: 'consultationIndex',
            component: consultationIndex
        },
        // 资讯中心
        {
            path: '/information',
            name: 'information',
            component: information
        },
        //  资讯中心-咨询详情
        {
            path: '/pleaseconsult',
            name: 'pleaseconsult',
            component: pleaseconsult
        },
        // 竞价专区
        {
            path: '/auction',
            name: 'auction',
            component: auction
        },
        // 竞价详情
        {
            path: '/auctiondetail',
            name: 'auctiondetail',
            component: auctiondetail
        },
        // 保证金收银台
        {
            path: '/cash',
            name: 'cash',
            component: cash
        },
        // 物性库
        {
            path: '/properties',
            name: 'properties',
            component: properties,

        }, // 物性库详情
        {
            path: '/properties/propertDetail',
            name: 'propertDetail',
            component: propertDetail
        },
        // 提交订单
        {
            path: '/submitorder',
            name: 'submitorder',
            component: submitorder
        },

        /* 登录  开始 */
        {
            path: '/login',
            name: 'login',
            component: login
        },
        /* 登录  竞价 */
        {
            path: '/loginauct',
            name: 'loginauct',
            component: loginauct
        },
        // 注册
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/forgetpwd1',
            name: 'forgetpwd1',
            component: forgetpwd1
        },
        {
            path: '/forgetpwd2',
            name: 'forgetpwd2',
            component: forgetpwd2
        },
        {
            path: '/forgetpwd3',
            name: 'forgetpwd3',
            component: forgetpwd3
        },
        {
            path: '/forgetpwd4',
            name: 'forgetpwd4',
            component: forgetpwd4
        },
        /* 登陆结束*/

        // 付款页面
        {
            path: '/payment',
            name: 'payment',
            component: payment,
        },

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

        // 注册协议
        {
            path: '/protocol',
            name: 'protocol',
            component: protocol,
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
                    component: myorder,
                    // children: [
                    //   //待付款

                    // ]
                },

                //待审核
                {
                    path: '/companycenter/toaudited',
                    name: 'toaudited',
                    component: toaudited,
                },
                //待确定 todetermined
                {
                    path: '/companycenter/todetermined',
                    name: 'todetermined',
                    component: todetermined,
                },
                //待付款
                {
                    path: '/companycenter/topayment',
                    name: 'topayment',
                    component: topayment,
                },
                //待收货
                {
                    path: '/companycenter/togoods',
                    name: 'togoods',
                    component: togoods,
                },
                //已完成 
                {
                    path: '/companycenter/tosigning',
                    name: 'tosigning',
                    component: tosigning,
                },
                //已取消 
                {
                    path: '/companycenter/cancel',
                    name: 'cancel',
                    component: cancel,
                },
                // 我的竞价
                {
                    path: '/companycenter/mybid',
                    name: 'mybid',
                    component: mybid
                },
                // 竞价成功
                {
                    path: '/companycenter/bidsuccess',
                    name: 'bidsuccess',
                    component: bidsuccess
                },
                // 竞价失败
                {
                    path: '/companycenter/bidfail',
                    name: 'bidfail',
                    component: bidfail
                },
                // 竞价地址管理
                {
                    path: '/companycenter/addressadmin',
                    name: 'addressadmin',
                    component: addressadmin
                },
                // 我的服务
                {
                    path: '/companycenter/myserver',
                    name: 'myserver',
                    component: myserver
                },
                // 我的资产
                {
                    path: '/companycenter/myasset',
                    name: 'myasset',
                    component: myasset
                },
                // 收支明细
                {
                    path: '/companycenter/myincome',
                    name: 'myincome',
                    component: myincome
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
                    component: management
                },
                //发布产品
                {
                    path: '/companycenter/bidding',
                    name: 'bidding',
                    component: bidding
                },


                // 我的企业
                {
                    path: '/companycenter/myfirm',
                    name: 'myfirm',
                    component: myfirm
                },
                // 完善企业信息
                {
                    path: '/companycenter/publish',
                    name: 'publish',
                    component: publish
                },
                // 个人信息
                {
                    path: '/companycenter/myinform',
                    name: 'myinform',
                    component: myinform
                },
                // 个人信息1
                {
                    path: '/companycenter/myinform1',
                    name: 'myinform1',
                    component: myinform1
                },
                // 个人信息2
                {
                    path: '/companycenter/myinform2',
                    name: 'myinform2',
                    component: myinform2
                },

                // 个人信息4
                {
                    path: '/companycenter/myinform4',
                    name: 'myinform4',
                    component: myinform4
                },
                // 收获地址管理
                {
                    path: '/companycenter/myaddress',
                    name: 'myaddress',
                    component: myaddress
                },
                // 员工管理
                {
                    path: '/companycenter/mystaff',
                    name: 'mystaff',
                    component: mystaff
                },
                // 添加员工
                {
                    path: '/companycenter/addstaff',
                    name: 'addstaff',
                    component: addstaff
                },
                // 订单详情
                {
                    path: '/companycenter/myorderDetails',
                    name: 'myorderDetails',
                    component: myorderDetails
                }

            ]
        },
        {
            path: '/applyFinance',
            name: 'applyFinance',
            component: applyFinance
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    },
})