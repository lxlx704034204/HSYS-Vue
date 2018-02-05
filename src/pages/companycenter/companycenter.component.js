import storage from "store2";
export default {
    name: 'companycenter',
    components: {},
    data() {
        return {
            defaultOpenArr: ['0', '1', '2', '3'], //默认展开
            defaultActive: '0-0',
            menuArr: [{
                    'icons': require('./images/1.png'),
                    'title': '订单管理',
                    'hasChild': false,
                    'index': '1',
                    'subItem': [{
                            'title': '我的订单',
                            'component': 'myorder',
                            'hasChild': true
                        },
                        {
                            'title': '我的竞价',
                            'component': 'mybid',
                            'hasChild': true,
                        },
                        // {
                        //   'title': '我的服务',
                        //   'component': 'myserver',
                        //   'hasChild': true,
                        // }
                    ]
                },
                {
                    'icons': require('./images/2.png'),
                    'title': '财务管理',
                    'hasChild': false,
                    'index': '2',
                    'subItem': [{
                            'title': '我的资产',
                            'component': 'myasset',
                            'hasChild': true,
                        }, {
                            'title': '收支明细',
                            'component': 'myincome',
                            'hasChild': true,
                        },
                        // {
                        //   'title': '我的发票',
                        //   'component': 'mybill',
                        //   'hasChild': true,
                        // }
                    ]
                },
                {
                    'icons': require('./images/3.png'),
                    'title': '产品管理',
                    'hasChild': false,
                    'index': '3',
                    'subItem': [{
                        'title': '产品管理',
                        'component': 'management',
                        'hasChild': true,
                    }, {
                        'title': '发布产品',
                        'component': 'bidding',
                        'hasChild': true,
                    }]
                },
                {
                    'icons': require('./images/4.png'),
                    'title': '企业中心',
                    'hasChild': false,
                    'index': '4',
                    'subItem': [{
                        'title': '我的企业',
                        'component': 'myfirm',
                        'hasChild': true,
                    }, {
                        'title': '个人信息',
                        'component': 'myinform',
                        'hasChild': true,
                    }, {
                        'title': '员工管理',
                        'component': 'mystaff',
                        'hasChild': true,
                    }, {
                        'title': '收货地址',
                        'component': 'myaddress',
                        'hasChild': true,
                    }]
                }
            ]
        }
    },
    created() {
        this.$store.commit("switchHeaderType", 11);
        this.$store.commit("switchFooterType", 1);
        let _this = this,
            name = this.$router.history.current.name;
        this.menuArr.forEach((element, index) => {
            element.subItem.forEach((ele, indexs) => {
                if (ele.component == name) {
                    _this.defaultActive = index + '-' + indexs;
                }
            })
        });
    }, //记录路由地址,绑定到默认active
    computed: {},
    mounted() {
        $('.companycenter1').show();
    },
    methods: {
        goMenuItem(item, index) {
            if (index == '2-1') {
                var that = this;
                var userId = storage.get("id");
                //判断企业验证状态
                if (!!userId) {
                    that.axios.get('customer/detail/' + userId)
                        .then(function(data) {
                            if (data != "") {
                                if (data.status !== 'SUCCESS') {
                                    that.$alert('请先完善公司信息，等待审核通过才能发布产品', '温馨提示', {
                                        confirmButtonText: '完善企业信息',
                                        type: 'warning',
                                    }).then(() => {
                                        that.$router.push("/companycenter/publish");
                                        that.defaultActive = '3-0';
                                    }).catch(() => {
                                        that.defaultActive = '3-0';
                                    });
                                } else {
                                    that.$router.push({
                                        path: item.component
                                    });
                                }
                            }
                        })
                }
            } else {
                this.$router.push({
                    path: item.component
                });
            }
        },
        // 选择导航
        handleSelect(key, keyPath) {
            console.log(key, keyPath, '7');
        },
    }
}