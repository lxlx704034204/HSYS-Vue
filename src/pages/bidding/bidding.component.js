import richTextEditor from '../../components/quill/richTextEditor.vue';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {
    name: 'bidding',
    components: {
        richTextEditor
    },
    props: [],
    data() {
        return {
            top: 'top',
            props: {
                label: 'name',
                value: 'id',
                children: 'childrens'
            },
            producingArea: [], // 产地数据
            options: [], // 分类数据
            unitData: [], // 单位数据
            isSuccess: false,
            // 表单数据与校验规则
            date: '',
            ruleForm: {
                name: '',
                category: '1',
                spec: '',
                categoryArr: [], //分类
                areaArr: [], //产地
                minSale: '', // 最小起订量
                salePrice: '',
                delivery: false,
                type: false,
                unitCode: '', // 单位
                customerProductIntervals: [{
                    id: 0,
                    startNumber: '',
                    endNumber: '',
                    salePrice: ''
                }], // 区间价格
                brand: '', // 品牌
                a_content: '',
                editorOption: {},
            },
            rules: {
                name: [{
                        required: true,
                        message: '请输入产品名称',
                        trigger: 'change,blur'
                    },
                    {
                        min: 0,
                        max: 30,
                        message: '输入0到30个字符',
                        trigger: 'change,blur'
                    }
                ],
                categoryArr: [{
                    required: true,
                    message: '请选择产品分类',
                    trigger: 'change'
                }],
                spec: [{
                    required: true,
                    message: '请输入规格',
                    trigger: 'blur,change'
                }],
                areaArr: [{
                    required: true,
                    message: '请选择产地',
                    trigger: 'change,blur'
                }],
                minSale: [{
                        required: true,
                        message: '请输入最小起订量',
                        trigger: 'change,blur'
                    },
                    {
                        validator: this.checkNumber,
                        trigger: 'blur'
                    },
                ],
                salePrice: [{
                        required: true,
                        message: '请输入销售单价',
                        trigger: 'change'
                    },
                    {
                        validator: this.checkNumber,
                        trigger: 'blur'
                    },
                ],
                unitCode: [{
                    required: true,
                    message: '请选择基本单位',
                    trigger: 'change'
                }],
                resource: [{
                    required: true,
                    message: '请选择活动资源',
                    trigger: 'change'
                }],
                brand: [{
                    required: true,
                    message: '请输入品牌',
                    trigger: 'blur,change'
                }],
            },
            // 上传照片
            dialogImageUrl: '',
            dialogVisible: false,
            images: '',
            fileList: [],
            flagStatus: false, // 新增状态
            addFlagStatus: false,
            upLoadUrl: '',
            content: '',
            isremind: false,
            isremind1: false,
        }
    },
    created() {
        this.upLoadUrl = this.axios.defaults.baseURL + 'upload';
        this.initData();
        this.isremind = false;
        this.isremind1 = false;
    },
    watch: {
        '$route' (to, from) {
            this.ruleForm = {
                name: '',
                category: '1',
                spec: '',
                categoryArr: [], //分类
                areaArr: [], //产地
                minSale: '', // 最小起订量
                salePrice: '',
                delivery: false,
                type: false,
                unitCode: '', // 单位
                customerProductIntervals: [{
                    id: 0,
                    startNumber: '',
                    endNumber: '',
                    salePrice: ''
                }], // 区间价格
                brand: '', // 品牌
                a_content: '',
                editorOption: {},
            }
            this.dialogImageUrl = '',
                this.dialogVisible = false,
                this.images = '',
                this.fileList = [];
        }
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill
        }
    },
    mounted() {

    },
    methods: {
        // 初始化数据
        initData() {
            let detailId = this.$route.query.id;
            this.detailId = detailId;
            if (detailId) {
                this.getDetailData(detailId).then(resp => {
                    this.date = new Date().getTime();
                    this.ruleForm.name = resp.name;
                    this.ruleForm.categoryArr = [resp.categoryOne, resp.categoryTwo];
                    this.ruleForm.spec = resp.spec;
                    this.ruleForm.areaArr = [resp.producingAreaOne, resp.producingAreaTwo, resp.producingAreaThree]
                    this.ruleForm.minSale = resp.minSale;
                    this.ruleForm.unitCode = resp.unitCode;
                    this.ruleForm.salePrice = resp.salePrice;
                    this.ruleForm.type = !!(resp.priceSpecification === 1);
                    this.ruleForm.customerProductIntervals = resp.customerProductIntervals;
                    this.ruleForm.brand = resp.brand;
                    this.images = resp.images;
                    let imgArr = [];
                    if (resp.images) {
                        resp.images.split(',').map(v => {
                            imgArr.push({
                                url: v
                            })
                        })
                    }
                    this.fileList = imgArr;
                    this.ruleForm.a_content = resp.productContent.content;
                    // 地区初始数据
                    this.getAreaData().then(res => {
                        res.map(v => {
                            v.childrens = []
                        })
                        this.producingArea = res;
                        if (detailId) {
                            this.getAreaData(resp.producingAreaOne).then(res => {
                                res.map(v => {
                                    v.childrens = []
                                })
                                this.producingArea.some((v, k) => {
                                    if (v.id === resp.producingAreaOne) {
                                        v.childrens = res;
                                        this.getAreaData(resp.producingAreaTwo).then(res => {
                                            v.childrens.some((v1, k1) => {
                                                if (v1.id === resp.producingAreaTwo) {
                                                    v1.childrens = res;
                                                }
                                            })
                                        });
                                    }
                                })
                            });
                        }
                    });
                    // 分类初始数据
                    this.getCategoryData().then(res => {
                        res.map(v => {
                            v.childrens = []
                        })
                        this.options = res;
                        if (detailId) {
                            this.getCategoryData(resp.categoryOne).then(res => {
                                // res.map(v => { v.childrens = [] })
                                this.options.some((v, k) => {
                                    if (v.id === resp.categoryOne) {
                                        v.childrens = res;
                                    }
                                })
                            });
                        }
                    });
                })
            }
            // 分类数据
            this.getCategoryData().then(res => {
                res.map(v => {
                    v.childrens = []
                })
                this.options = res;
            });
            // 地区数据
            this.getAreaData().then(res => {
                res.map(v => {
                    v.childrens = []
                })
                this.producingArea = res;
            });
            // 基本单位
            this.unitData = this.$util.getCodeMap("UNIT");
        },
        // 提交
        submitForm(formName, type) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ruleForm.customerProductIntervals.map(v => {
                        v.startNumber = parseFloat(v.startNumber) || '';
                        v.endNumber = parseFloat(v.endNumber) || '';
                        v.salePrice = parseFloat(v.salePrice) || '';
                    })
                    const obj = {};
                    obj.date = new Date().getTime();
                    obj.name = this.ruleForm.name; // 商品名称
                    obj.categoryOne = this.ruleForm.categoryArr[0]; // 一级分类
                    obj.categoryTwo = this.ruleForm.categoryArr[1]; // 二级分类 
                    obj.spec = this.ruleForm.spec // 规格
                    obj.producingAreaOne = this.ruleForm.areaArr[0]; // 产地
                    obj.producingAreaTwo = this.ruleForm.areaArr[1];
                    obj.producingAreaThree = this.ruleForm.areaArr[2];
                    obj.minSale = parseFloat(this.ruleForm.minSale); // 最小起订量
                    obj.unitCode = this.ruleForm.unitCode; // 单位
                    obj.salePrice = parseFloat(this.ruleForm.salePrice); // 销售单价
                    obj.priceSpecification = this.ruleForm.type ? 1 : 0;
                    obj.customerProductIntervals = this.ruleForm.customerProductIntervals; //区间价格
                    obj.brand = this.ruleForm.brand; //品牌 
                    obj.productContent = {
                        content: this.ruleForm.a_content
                    }; //富文本数据
                    obj.images = this.images; // 全部图片
                    obj.masterImage = this.masterImage; // 主图
                    obj.show = true;
                    obj.id = this.detailId ? this.detailId : 0;

                    this.isremind1 = this.ruleForm.a_content != '' ? false : true;
                    this.isremind = obj.images != '' ? false : true;
                    if (!this.isremind && !this.isremind1 && obj.id != '') {
                        this.editPro(obj).then(res => {
                            if (res.code == 0) {
                                this.$message({
                                    message: '编辑产品成功',
                                    type: 'success'
                                });
                                this.$router.push({
                                    path: '/companycenter/management'
                                });
                            } else if (res.code == 401) {
                                this.$message({
                                    message: res.msg,
                                    type: 'warning'
                                });
                            }
                        })
                    } else if (!this.isremind && !this.isremind1 && obj.id == '') {
                        this.releasePro(obj).then(res => {
                            if (res.code == 0) {
                                this.$message({
                                    message: '发布产品成功',
                                    type: 'success'
                                });
                                this.$router.push({
                                    path: '/companycenter/management'
                                });
                            } else if (res.code == 401) {
                                this.$message({
                                    message: res.msg,
                                    type: 'warning'
                                });
                            }

                        });
                    }
                }
            });
        },
        submitForm2(formName, type) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ruleForm.customerProductIntervals.map(v => {
                        v.startNumber = parseFloat(v.startNumber) || '';
                        v.endNumber = parseFloat(v.endNumber) || '';
                        v.salePrice = parseFloat(v.salePrice) || '';
                    })
                    const obj = {};
                    obj.date = new Date().getTime();
                    obj.name = this.ruleForm.name; // 商品名称
                    obj.categoryOne = this.ruleForm.categoryArr[0]; // 一级分类
                    obj.categoryTwo = this.ruleForm.categoryArr[1]; // 二级分类 
                    obj.spec = this.ruleForm.spec // 规格
                    obj.producingAreaOne = this.ruleForm.areaArr[0]; // 产地
                    obj.producingAreaTwo = this.ruleForm.areaArr[1];
                    obj.producingAreaThree = this.ruleForm.areaArr[2];
                    obj.minSale = parseFloat(this.ruleForm.minSale); // 最小起订量
                    obj.unitCode = this.ruleForm.unitCode; // 单位
                    obj.salePrice = parseFloat(this.ruleForm.salePrice); // 销售单价
                    obj.priceSpecification = this.ruleForm.type ? 1 : 0;
                    obj.customerProductIntervals = this.ruleForm.customerProductIntervals; //区间价格
                    obj.brand = this.ruleForm.brand; //品牌 
                    obj.productContent = {
                        content: this.ruleForm.a_content
                    }; //富文本数据
                    obj.images = this.images; // 全部图片
                    obj.masterImage = this.masterImage; // 主图
                    obj.show = false;
                    obj.id = this.detailId ? this.detailId : 0;
                    this.isremind1 = this.ruleForm.a_content != '' ? false : true;
                    this.isremind = obj.images != '' ? false : true;
                    if (!this.isremind && !this.isremind1 && obj.id != '') {
                        this.editPro(obj).then(res => {
                            if (res.code == 0) {
                                this.$message({
                                    message: '编辑产品成功',
                                    type: 'success'
                                });
                                this.$router.push({
                                    path: '/companycenter/management'
                                });
                            } else if (res.code == 401) {
                                this.$message({
                                    message: res.msg,
                                    type: 'warning'
                                });
                            }
                        })
                    } else if (!this.isremind && !this.isremind1 && obj.id == '') {
                        this.releasePro(obj).then(res => {
                            if (res.code == 0) {
                                this.$message({
                                    message: '发布产品成功',
                                    type: 'success'
                                });
                                this.$router.push({
                                    path: '/companycenter/management'
                                });
                            } else if (res.code == 401) {
                                this.$message({
                                    message: res.msg,
                                    type: 'warning'
                                });
                            }
                        });
                    }
                }
            });
        },
        // 取消
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.$router.push({
                path: '/companycenter/management'
            })
        },
        // 分类多级选择
        handleItemChange(val) {
            this.getCategoryData(val[0]).then(res => {
                if (val.length === 1) {
                    this.options.some((v, k) => {
                        if (val[val.length - 1] === v.id) {
                            this.options[k].childrens = res;
                        }
                    })
                }
            })
        },
        handleChange(value) {
            // console.log(value);
        },
        // 地区选择
        handleAreaChange(val) {
            if (val.length === 1) {
                this.getAreaData(val[0]).then(res => {
                    res.map(v => {
                        v.childrens = []
                    })
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

        // 加
        addData(index) {
            let list = this.ruleForm.customerProductIntervals;
            list.splice(index + 1, 0, {
                id: index + 1,
            });
        },
        // 减
        removeData(index) {
            let list = this.ruleForm.customerProductIntervals;
            list.splice(index, 1);
        },
        // 上传照片
        handleRemove(file, fileList) {
            this.isremind = false;
            if (file.status === 'success') {
                let allImages = [];
                fileList.map(v => {
                    if (v.response) {
                        allImages.push(v.response.data.url);
                    } else {
                        allImages.push(v.url);
                    }
                })
                this.masterImage = allImages[0];
                this.images = allImages.join(',');
            }
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        imageChange(file, fileList) {
            this.isremind = false;
            if (file.status === 'success') {
                let allImages = [];
                fileList.map(v => {
                    if (v.response) {
                        allImages.push(v.response.data.url);
                    } else {
                        allImages.push(v.url);
                    }
                })
                this.masterImage = allImages[0];
                this.images = allImages.join(',');
            }
        },
        onEditorReady(editor) {},
        editorChange: function(html) {
            this.ruleForm.a_content = html
            this.isremind1 = false;
        },
        // <---------------------------------------数据获取------------------------------------------------------>
        // 获取分类数据
        getCategoryData(id = 10000) {
            return new Promise(resolve => {
                this.axios.get(`product/category?parent=${id}`).then(res => {
                    resolve(res);
                });
            })
        },
        // 获取地区数据
        getAreaData(id = '') {
            return new Promise(resolve => {
                this.axios.get(`area/list${ id && '?parent='+id }`).then(res => {
                    resolve(res);
                });
            })
        },
        // 发布商品
        releasePro(params) {
            return new Promise(resolve => {
                this.axios.post(`customerproduct/add`, params, { params: { noInterceptor: 1 } }).then(res => {
                    console.log(res, 'ddd')
                    resolve(res);
                });
            })
        },
        // 编辑商品
        editPro(params, show) {
            return new Promise(resolve => {
                this.axios.put(`customerproduct/edit`, params, { params: { noInterceptor: 1 } }).then(res => {
                    resolve(res);
                });
            })
        },
        // 获取产品详情数据
        getDetailData(id) {
            return new Promise(resolve => {
                this.axios.get(`customerproduct/info?id=${id}&date=` + new Date().getTime()).then(res => {
                    resolve(res);
                });
            })
        },
        // 校验数字
        checkNumber(rule, value, callback) {
            if (!value) {}
            setTimeout(() => {
                let flag = this.$util.isNumber(value)
                if (!flag) {
                    callback(new Error('输入0-10位数字'));
                } else {
                    callback();
                }
            }, 500);
        },
        beforeAvatarUpload(file) {
            const isJPEG = file.type === "image/jpeg";
            const isPNG = file.type === "image/png";
            const isGIF = file.type === "image/gif";
            const isJPG = file.type === "image/jpg";
            const isLt1M = file.size / 1024 / 1024 < 1;
            if (!isJPEG && !isPNG && !isGIF && !isJPG) {
                this.$message.error("上传图片只能是 JPG/PNG/GIF/JPEG 格式");
            }
            if (!isLt1M) {
                this.$message.error("上传图片大小不能超过 1MB!");
            }
            return (isJPG || isPNG || isJPEG || isGIF) && isLt1M;
        },
        // <---------------------------------------------------------------------------------------->
    }
}