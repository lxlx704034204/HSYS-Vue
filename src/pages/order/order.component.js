//import $ from 'jquery'
//import axios from 'axios';
export default {
    name: 'order',
    components: {},
    props: [],
    data() {

        return {
            tableData: [],
            order_value: null,
            tabledata: [],
            dialogTableVisible1: false,
            dialogFormVisible1: false,
            dialogTableVisible2: false,
            dialogFormVisible2: false,
            dialogTableVisible3: false,
            dialogFormVisible3: false,
            dialogTableVisible4: false,
            dialogFormVisible4: false,
            orderNum: 1,
            allPrice: 0,
            addIDS: '',
            maxlength: 50,
            props: {
                label: 'name',
                value: 'id',
                children: 'childrens'
            },
            producingArea: [], // 产地数据
            form: {
                name: '',
                phone: '',
                desc: ''
            },
            ruleForm1: {
                userName: '',
                primaryPhone: '',
                areaArr: [], //地区
                address: '',
                id: '',
            },
            ruleForm2: {
                userName: '',
                primaryPhone: '',
                areaArr: [], //地区
                address: '',
            },
            formLabelWidth: '120px',
            msg: '',
            Usermsg: '',
            maymesg: '',
            pay: '',
            send: '',
            computer: '',
            salePrice: '',

            payWay: 0, // 0 款到发货, 1 线下支付
            sendWay: 1, // 0 配送 ,1 自提
            endWay: 0, // 0 一票制 ,1 二票制	
            placelist: [], //省
            cityList: [],
            countryList: [],
            //			新增
            adrlist: [],
            molist: '',
            celist: [],
            buylist: [],
            ids: '',
            io: "", // 库别
            dw: '', // 单位
            cd: '', // 产地
            ph: '', // 牌号
            fs: '', // 方式
            shippingMethod: '', // 配送方式
            sendother: true, // 配送方式
            userInfor: false, //收货人信息
            skuiditem: 1,
            ordertext: '',
            customId: '',

            skuiditem: 1,
            allForm: {
                paymentMethod: 0, // 支付方式,默认先款
                shippingMethod: 1, //  配送方式 自提
                shippingPaymentMethod: 0, // 结算方式   一票制
            },
            orderid: '',
            companyName: '', // 开票公司
            bizcode: '', // 社会代码
            porvinceId: '',
            admin: '',
            proIndex1: true,
            proIndex2: true,
            proIndex3: true,

            numberDecimal: 2,//产品数量小数限制
            priceDecimal: 2,//产品价格小数限制
        }
    },

    created() {
        // 地区数据
        if(this.dialogFormVisible3  || this.dialogFormVisible1 ){
           this.getAreaData().then(res => {
                res.map(v => { v.childrens = [] })
                this.producingArea = res;
            }); 
        }
        
        this.ids = this.$route.query.id;
        // this.selectChange();
        this.defaultaddress();
        this.purchaseOrder();
        this.getLimitRuler();//获取后台系统配置
        //		展示货物信息
        this.io = this.$util.getCodeMap("KUBE");
        this.dw = this.$util.getCodeMap("UNIT");
        this.cd = this.$util.getCodeMap("PRODUCINGAREA");
        this.ph = this.$util.getCodeMap("GRADE");
        this.fs = this.$util.getCodeMap("SHIPPING_METHOD");
    },
    computed: {

    },
    mounted() {

    },
    methods: {

        // <----------------------------------------------------- 地址 --------------------------------------------------------->
        // 地区选择
        handleAreaChange(val) {
            if (val.length === 1) {
                this.getAreaData(val[0]).then(res => {
                    res.map(v => { v.childrens = [] })
                    this.producingArea.some((v, k) => {
                        if (val[val.length - 1] === v.id) {
                            this.producingArea[k].childrens = res;
                        }
                    })
                })
            }
            if (val.length === 2) {
                this.getAreaData(val[1]).then(res => {
                    this.producingArea.some((v, k) => {
                        if (val[0] === v.id) {
                            this.producingArea[k].childrens.some((v1, k1) => {
                                if (val[1] === v1.id) {
                                    this.producingArea[k].childrens[k1].childrens = res;
                                }
                            })
                        }
                    })
                })
            }
        },
        // 获取地区数据
        getAreaData(id = '') {
            return new Promise(resolve => {
                this.axios.get(`area/list${id && '?parent=' + id}`).then(res => {
                    resolve(res);
                });
            })
        },
        // 默认收获地址
        defaultaddress() {
            //    显示默认收货人接口
            var that = this;
            this.axios.get(`address/defaultaddress` + '?t=' + Math.random()).then(res => {
                if (typeof res !== 'string') {
                    if (res) {
                        that.userInfor = true;
                        console.log(res);
                        that.molist = res;
                        that.addIDS = that.molist.id;
                        that.ruleForm1 = JSON.parse(JSON.stringify(res));
                        that.ruleForm1.areaArr = [res.province, res.city, res.area];
                    }
                } else {
                    that.userInfor = false;
                }
            }).then(res => {
                // 地区初始数据
                this.getAreaData().then(res => {
                    res.map(v => { v.childrens = [] })
                    this.producingArea = res;
                    if (this.ruleForm1.areaArr.length > 0) {
                        this.getAreaData(this.ruleForm1.areaArr[0]).then(res => {
                            res.map(v => { v.childrens = [] })
                            this.producingArea.some((v, k) => {
                                if (v.id === this.ruleForm1.areaArr[0]) {
                                    v.childrens = res;
                                    this.getAreaData(this.ruleForm1.areaArr[1]).then(res => {
                                        v.childrens.some((v1, k1) => {
                                            if (v1.id === this.ruleForm1.areaArr[1]) {
                                                v1.childrens = res;
                                            }
                                        })
                                    });
                                }
                            })
                        });
                    }
                });
            })
        },
        // 新增收货地址
        submitForm2() {
            console.log(this.ruleForm2, '111')
            this.$refs['ruleForm2'].validate((valid) => {
                if (valid) {
                    // alert('submit!');
                    let obj = {};
                    obj.userName = this.ruleForm2.userName; // 收货人
                    obj.primaryPhone = this.ruleForm2.primaryPhone; // 联系方式
                    obj.address = this.ruleForm2.address; // 详细地址
                    obj.province = this.ruleForm2.areaArr[0]; // 地区
                    obj.city = this.ruleForm2.areaArr[1];
                    obj.area = this.ruleForm2.areaArr[2];
                    this.axios.post(`address/addAddress`, obj).then(res => {
                        console.log(typeof res);
                        if (typeof res !== 'string') {
                            console.log(res,'ll');
                            this.submitForm3(res.id);
                            this.$message({ message: '新增地址成功', type: 'success' });
                            this.$refs['ruleForm2'].resetFields();
                            this.dialogFormVisible3 = false;
                        } else {
                            this.$message({ message: res, type: 'error' });
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 编辑收货地址
        submitForm1() {
            console.log(this.ruleForm1);
            this.$refs['ruleForm1'].validate((valid) => {
                if (valid) {
                    // alert('submit!');
                    let obj = {};
                    obj.userName = this.ruleForm1.userName; // 收货人
                    obj.primaryPhone = this.ruleForm1.primaryPhone; // 联系方式
                    obj.address = this.ruleForm1.address; // 详细地址
                    obj.province = this.ruleForm1.areaArr[0]; // 地区
                    obj.city = this.ruleForm1.areaArr[1];
                    obj.area = this.ruleForm1.areaArr[2];
                    obj.id = this.ruleForm1.id;
                    this.axios.put(`address/edit`, obj).then(res => {
                        if (typeof res !== 'string') {
                            this.$message({ message: '编辑地址成功', type: 'success' });
                            this.$refs['ruleForm1'].resetFields();
                            this.dialogFormVisible1 = false;
                            this.defaultaddress();
                        } else {
                            this.$message({ message: res, type: 'error' });
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 切换地址
        submitForm3(id) {
            var ids = this.finaId;
            var that = this;
            this.axios.post(`address/isdefault/${id || ids}`).then(res => {
                that.dialogFormVisible2 = false;
                that.defaultaddress();
            });
        },

        // <----------------------------------------------------订单相关---------------------------------------------------->

        // 获取订单信息
        purchaseOrder() {
            var that = this;
            this.axios.get(`order/purchase/${that.ids}` + '?t=' + Math.random()).then(res => {
                if (typeof res !== 'string') {
                    if (res.customerInfo.customer.status != 'SUCCESS') {
                        that.$alert('公司信息尚未完善', '提示', {
                            confirmButtonText: '完善企业信息',
                            type: 'warning',
                            callback: action => {
                                that.$router.push("/companycenter/myfirm");
                            }
                        })
                    } else if (res.customerInfo.customer.status == 'SUCCESS') {
                        that.buylist = res.items;
                        res.customerInfo.attributes.some(rep => {
                            if (rep.group === "CUSTOMER_BUSINESS") { that.bizcode = rep.bizCreditCode } // 信用代码
                        })
                        console.log(res, '123');
                        that.salePrice = res.items[0].salePrice;
                        that.companyName = res.customerInfo.customer.name; // 公司名称
                        that.customId = res.customerInfo.customer.id;
                        that.shippingMethod = res.items[0].shippingMethodCode; //配送方式
                        that.userIds = res.items[0].userId;
                        this.axios.get('sys/user/' + res.items[0].userId + '?t=' + Math.random())
                            .then(function(response) {
                                if (response) {
                                    that.admin = response.nick;
                                } else {
                                    that.admin = '';
                                }
                            })
                        if (that.shippingMethod == 'ZI_TI') {
                            that.sendother = false
                        } else if (that.shippingMethod == 'PEI_SONG') {
                            that.sendother = true
                        }
                        that.allPrice = that.buylist[0].salePrice * that.orderNum;
                    }
                } else {
                    that.$alert('公司信息尚未完善', '提示', {
                        confirmButtonText: '完善企业信息',
                        type: 'warning',
                        callback: action => {
                            that.$router.push("/companycenter/myfirm");
                        }
                    })
                }
            });
        },

        // 提交订单
        submitOrder() {
            console.log(this.allForm.shippingMethod);
            var that = this;
            console.log(this.addIDS);
            if (!this.addIDS) {
                this.$confirm('请填写收货信息', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {});
                return;
            }
            var data = {
                "shippingMethod": this.allForm.shippingMethod.toString(),
                "paymentMethod": this.allForm.paymentMethod.toString(),
                "shippingPaymentMethod": this.allForm.shippingPaymentMethod.toString(),
                "remark": this.ordertext,
                "addressId": this.addIDS,
                "items": [{
                    "skuId": parseInt(this.ids),
                    "quantity": parseFloat(this.orderNum),
                }],
            };
            if (this.orderNum <= 0) {

            } else {
                this.axios.post('order', data).then(res => {
                    console.log(res);
                    if (typeof res !== 'string') {
                        if (res.code !== -1) {
                            that.orderid = res.id;
                            that.$router.push({ path: '/orderlist?id=' + res.id });
                        }
                    } else {
                        that.$alert(res, '提示', {
                            confirmButtonText: '确定',
                            type: 'warning',
                            callback: action => {
                                that.$router.push({ path: '/companycenter/myfirm' });
                            }
                        })

                    }
                })
            }
        },

        // <----------------------------------------------------基础公共方法---------------------------------------------------->

        // 改变数量
        chageNum() {
            var that = this;
            // this.numberDecimal
            // this.priceDecimal
            this.orderNum = this.$util.limitTowDecimals(this.orderNum, this.numberDecimal);//数量
            if (this.orderNum > 0) {
                that.allPrice = that.buylist[0].salePrice * that.orderNum;
                that.allPrice = this.endPrice(that.allPrice, this.priceDecimal)
            } else if (this.orderNum <= 0) {
                this.orderNum = 1
                that.allPrice = that.buylist[0].salePrice;
                that.allPrice = this.endPrice(that.allPrice, this.priceDecimal)
            }
        },
        //计算总价
        endPrice(price,num){
            let endPrice = 0;
            endPrice = Math.round((price) * Math.pow(10 ,num)) / Math.pow(10 ,num);
            return endPrice;
        },
        // 校验数字
        checkPhone(rule, value, callback) {
            if (!value) {}
            setTimeout(() => {
                let flag = this.$util.isPhone(value)
                if (!flag) {
                    callback(new Error('请输入正确的手机号'));
                } else {
                    callback();
                }
            }, 500);
        },
        // 获取牌号名
        getPhName(code) {
            let name = '';
            this.ph.some(v => {
                if (v.dictCode === code) {
                    name = v.dictName;
                }
            })
            return name;
        },
        // 获取单位
        getDwName(code) {
            console.log(this.dw);
            let name = '';
            this.dw.some(v => {
                if (v.dictCode === code) {
                    name = v.dictName;
                }
            })
            return name;
        },
        // 获取库别
        getIoName(code) {
            let name = '';
            this.io.some(v => {
                if (v.dictCode === code) {
                    name = v.dictName;
                }
            })
            return name;
        },
        // 获取产地
        getCdName(code) {
            let name = '';
            this.cd.some(v => {
                if (v.dictCode === code) {
                    name = v.dictName;
                }
            })
            return name;
        },
        // <------------------------------------------------other---------------------------------------------------------->
        
        getLimitRuler() {
            this.axios.get('platform/config' + '?t=' + Math.random()).then((res) => {
                this.numberDecimal = res.numberDecimal;
                this.priceDecimal = res.priceDecimal;
            })
        },
        newadd() {
            this.dialogFormVisible3 = true;
        },

        // 修改信息
        changemsg() {
            this.dialogFormVisible1 = true;
            var that = this;
            this.axios.get('address/init/' + that.addIDS + '?t=' + Math.random()).then(res => {
                if (typeof res !== 'string') {
                    that.proIndex1 = true;
                    that.proIndex2 = true;
                    that.proIndex3 = true;
                    that.celist = res;
                    that.porvinceId = that.celist.province;
                }
            });
        },

        // 切换地址onclick事件
        shamsg() {
            this.dialogFormVisible2 = true;
            var that = this;
            this.axios.get('address/addressList' + '?t=' + Math.random()).then(res => {
                if (typeof res !== 'string') {
                    that.adrlist = res;
                }
            });
        },

        orderClick(index) {
            console.log($('.cha2').parent()[index])
            $('.cha2').css({ "color": "#333333", "border": "1px solid #cccccc", });
            $($('.cha2')[index]).css({ "color": "#00a0e9", "border": "1px solid #00a0e9", });

            console.log($(this.$refs.cha2[index]).attr('data'));
            this.finaId = $(this.$refs.cha2[index]).attr('data')

        },

        addBg(ev) {
            const e = ev.target;
            if (e.className === "") {
                $(e).addClass("clickactive")
                $(e).siblings().removeClass("clickactive")
            } else {
                $(e).removeClass("clickactive")
            }
        },

        changeWay(type, num) {
            this[type] = num;
            if (type == 'payWay') {
                this.allForm.paymentMethod = num;
            } else if (type == 'sendWay') {
                this.allForm.shippingMethod = num;

            } else if (type == 'endWay') {
                this.allForm.shippingPaymentMethod = num
                console.log(this.allForm.shippingPaymentMethod);
            }
        },
        textaretorder() {
            if (this.ordertext.length > 100) {
                console.log(this.ordertext.length);
                this.ordertext = this.ordertext.slice(0, 100)
            }
        },

    },
}