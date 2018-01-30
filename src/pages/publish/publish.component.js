import storage from "store2";
import { mapState } from "vuex";
import initializeMap from "./map";

const areaCache = {};

export default {
    name: "publish",
    components: {},
    data() {
        return {
            ishide: false,
            failReasonl: '',

            id: storage.get("id"),
            povince: [],
            master_product: [], //主营产品
            city: [],
            area: [],
            model: [], //公司规模
            firmtype: [], //公司类型
            accounts: [], //账户类型
            flage: false,
            isshow: true,
            upload: this.axios.defaults.baseURL + "upload",
            isremind: false,
            zhus: false,
            customer: {
                logoUrl: "",
                name: "",
                industry: "",
                province: "",
                city: "",
                area: "",
                address: "",
                scale: "",
                secondPhone: "",
                primaryPhone: "",
                email: "",
                fax: "",
                linker: "",
                description: "",
                bizLogoUrl: "",
                bizCreditCode: "",
                bizType: "",
                registeredCapital: "",
                accountType: "",
                accountName: "",
                bank: "",
                accountNo: "",
            },
            rules: {
                name: { required: true, validator: this.validName, trigger: "blur" },
                industry: { required: true, message: "请选择主营产品", trigger: "blur" },
                scale: { required: true, message: "请选择公司规模", trigger: "blur" },
                email: [
                    { required: true, message: "请输入邮箱", trigger: "blur" },
                    { type: "email", message: "请输入正确的邮箱", trigger: "blur" },
                ],
                area: { required: true, message: "请选择地址", trigger: "blur" },
                address: { required: true, message: "请输入地址", trigger: "blur" },
                primaryPhone: { required: true, message: "请输入手机号码", trigger: "blur" },
                secondPhone: { validator: this.validSecondPhone, trigger: "blur" },
                linker: { required: true, message: "请输入企业联系人", trigger: "blur" },
                bizLogoUrl: { required: true, message: "请上传营业执照", trigger: "blur" },
                bizCreditCode: [
                    { required: true, message: "请输入统一社会信用代码", trigger: "blur" },
                ],
                bizType: { required: true, message: "请选择公司类型", trigger: "blur" },
                registeredCapital: [
                    { required: true, message: "请输入注册资金", trigger: "blur" },
                    { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
                    // { type: "number", message: "请输入数字格式", trigger: "blur" },
                ],
                accountName: { required: true, message: "请输入开户名", trigger: "blur" },
                bank: { required: true, message: "请输入开户行", trigger: "blur" },
                accountNo: { required: true, message: "请输入银行账号", trigger: "blur" },
                latitude: { required: true, message: "请选择公司地理位置", trigger: "blur" }

            },
        };
    },
    computed: {
        ...mapState(["token"])
    },
    created() {
        //公司类型
        this.firmtype = this.$util.getCodeMap("CAMPANY");
        //公司规模
        this.model = this.$util.getCodeMap("MODEL");
        console.log(this.model, '41')
            //账户类型
        this.accounts = this.$util.getCodeMap("ACCOUNT");
        //主营产品
        this.master_product = this.$util.getCodeMap("MASTER_PRODUCT");
        this.getMessage();
    },
    mounted() {
        this.getArea().then(data => {
            this.povince = data;
        });
        this.axios.get("customer/" + this.id, {
            params: {
                noInterceptor: 1 // hack
            }
        }).then(result => {
            let data = {};
            if (result.code === 0) {
                data = result.data;
            }
            this.customer = data;
            if (this.customer.province) {
                this.getArea(this.customer.province).then(area => {
                    this.city = area;
                });
            }
            if (this.customer.city) {
                this.getArea(this.customer.city).then(area => {
                    this.area = area;
                });
            }
            if (this.customer.status == 'AWAIT' || this.customer.status == 'SUCCESS' || this.customer.status == 'FROZEN') {
                this.flage = true;
                this.isshow = false;
            }
            this.$refs.form.clearValidate();
            initializeMap().then(BMap => {
                let point = {};
                if (this.customer.latitude && this.customer.longitude) {
                    point = {
                        latitude: this.customer.latitude,
                        longitude: this.customer.longitude,
                    };
                }
                this.initMap(BMap, point);
            });
        });
    },
    methods: {
        getMessage() {
            var that = this;
            var id = storage.get("id");
            this.axios.get('customer/detail/' + id)
                .then((data) => {
                    if (data != "") {
                        if (data.status == 'FAIL') {
                            that.failReasonl = data.failReasonl;
                            that.ishide = true;
                        } else {
                            that.ishide = false;
                        }
                    }
                })
        },
        initMap(BMap, point) {
            const map = new BMap.Map(this.$refs.map);
            map.centerAndZoom(new BMap.Point(116.404, 39.915), 16);
            map.addControl(new BMap.NavigationControl());

            const setMaker = point => {
                map.clearOverlays();
                const marker = new BMap.Marker(new BMap.Point(point.lng, point.lat));
                map.addOverlay(marker);
                this.customer.longitude = point.lng;
                this.customer.latitude = point.lat;
            };

            map.addEventListener("click", e => {
                setMaker(e.point);
            });

            if (point.latitude && point.latitude) {
                setMaker({
                    lng: point.longitude,
                    lat: point.latitude,
                });
                map.centerAndZoom(new BMap.Point(point.longitude, point.latitude), 16);
            } else {
                // 根据 ip 定位
                new BMap.LocalCity().get(result => {
                    map.setCenter(result.name);
                });
            }
        },
        validName(rule, val, cb) {
            if (!val) {
                return cb("请输入公司名称");
            }
            this.checkName(val).then(err => {
                if (err) {
                    cb(err);
                } else {
                    cb();
                }
            });
        },
        validSecondPhone(rule, val, cb) {
            if (!val) {
                cb();
                return;
            }
            if (!(/^1\d{10}$/.test(val) || /^(0\d{2,3}-?)?\d{7,8}$/.test(val))) {
                cb("请输入正确的号码");
                return;
            }
            this.checkPhone(val).then(err => {
                if (err) {
                    cb(err);
                } else {
                    cb();
                }
            });
        },
        changeProvince(id) {
            this.customer.city = undefined;
            this.customer.area = undefined;
            this.getArea(id).then(data => {
                this.city = data;
            });
        },
        changeCity(id) {
            this.customer.area = undefined;
            this.getArea(id).then(data => {
                this.area = data;
            });
        },
        areaChange() {
            this.$forceUpdate();
        },
        successUploadLogo(res) {
            if (res.code === 0) {
                this.customer.logoUrl = res.data.url;
                this.$forceUpdate();
            }
        },
        successUploadBizLogo(res) {
            if (res.code === 0) {
                this.customer.bizLogoUrl = res.data.url;
                this.$forceUpdate();
                this.isremind = false;
            }
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt1M = file.size / 1024 / 1024 < 1;
            if (!isJPG) {
                this.$message.error("上传图片只能是 JPG 格式!");
            }
            if (!isLt1M) {
                this.$message.error("上传图片大小不能超过 1MB!");
            }
            return isJPG && isLt1M;
        },
        getArea(id = 0) {
            const caches = areaCache[id];
            if (caches && caches.length) {
                return Promise.resolve(caches);
            }
            return this.axios.get("area/list", {
                params: {
                    parent: id,
                    noInterceptor: 1 // hack
                }
            }).then(result => {
                if (result.code !== 0) {
                    return Promise.resolve([]);
                }
                areaCache[id] = result.data;
                return Promise.resolve(result.data);
            });
        },
        perfect() {
            if (this.customer.name == undefined) {
                $("input[name='name']").focus();
                console.log(this.customer.latitude, '345')
            } else if (this.customer.province == undefined) {
                $("#provin").focus();
            } else if (this.customer.city == undefined) {
                $("#cit").focus();
            } else if (this.customer.area == undefined) {
                $("#are").focus();
            } else if (this.customer.scale == undefined) {
                $("#guimo").focus();
            } else if (this.customer.industry == undefined) {
                $("#zhuying").focus();
            } else if (this.customer.address == undefined) {
                $("input[name='adre']").focus();
            } else if (this.customer.email == undefined) {
                $("input[name='email']").focus();
            } else if (this.customer.secondPhone && !(/^1\d{10}$/.test(this.customer.secondPhone) || /^(0\d{2,3}-?)?\d{7,8}$/.test(this.customer.secondPhone))) {
                $("input[name='secondPhone']").focus();
            } else if (!/^([a-zA-Z0-9_-])+\@([a-zA-Z0-9_-])+.([a-zA-Z])+$/.test(this.customer.email)) {
                $("input[name='email']").focus();
            } else if (this.customer.linker == undefined) {
                $("input[name='linker']").focus();
            } else if (this.customer.latitude == undefined) {
                //          	$("#ditu").scrollIntoView();
                window.location.href = "#ditu"
            } else if (this.customer.bizLogoUrl == undefined) {
                $("#zhizhao").focus();
            } else if (this.customer.bizCreditCode == undefined) {
                $("input[name='tongyi']").focus();
            } else if (this.customer.bizType == undefined) {
                $("#leixing").focus();
            } else if (this.customer.registeredCapital == undefined) {
                $("#zijin").focus();
            } else if (!/^[0-9]*$/.test(this.customer.registeredCapital) || this.customer.registeredCapital.length > 10) {
                $("input[name='zijin']").focus();
                this.zhus = true;
            } else if (this.customer.accountName == undefined) {
                this.zhus = false;
                $("input[name='huming']").focus();
            } else if (this.customer.bank == undefined) {
                $("input[name='huhang']").focus();
            } else if (this.customer.accountNo == undefined) {
                $("input[name='accountNo']").focus();
            }

            this.$refs.form.validate(valid => {
                if (!valid) {
                    if (!this.customer.bizLogoUrl) {
                        this.isremind = true;
                        return;
                    }
                    return;
                }
                console.log(valid, 'valid');
                if (!this.customer.bizLogoUrl) {
                    this.isremind = true;
                    return;
                }
                this.save(this.customer).then(err => {
                    if (err) {
                        this.$message.error(err);
                    } else {
                        this.$message.success("修改成功");
                        this.$router.push("/companycenter/myfirm");
                    }
                });
            });
        },
        save(customer) {
            return this.axios.put("customer/updateCustomer", customer, {
                params: {
                    noInterceptor: 1 // hack
                }
            }).then(result => {
                if (result.code !== 0) {
                    let msg = result.msg || "操作失败";
                    if (Array.isArray(result.data)) {
                        msg = result.data[0].defaultMessage || "字段验证失败";
                    }
                    return Promise.resolve(msg);
                }
                return Promise.resolve("");
            });
        },
        checkName(name) {
            return this.axios.get(`customer/editCheckName`, {
                params: {
                    name,
                    id: this.id,
                    noInterceptor: 1 // hack
                }
            }).then(result => {
                if (result.code !== 0) {
                    return Promise.resolve(result.msg || "名称验证未通过");
                }
                return Promise.resolve(result.data ? "" : "该名称已存在");
            });
        },
        checkPhone(phone) {
            return this.axios.get(`customer/checkPhone/${phone}`, {
                params: {
                    noInterceptor: 1 // hack
                }
            }).then(result => {
                if (result.code !== 0) {
                    return Promise.resolve(result.msg || "手机号码验证未通过");
                }
                return Promise.resolve(result.data ? "" : "该手机号码已存在");
            });
        },
    }
};