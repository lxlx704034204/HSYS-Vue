import storage from "store2";
export default {
  name: 'servicebox',
  components: {},
  props: ['srbox'],
  data() {
    return {
      inputs: '',
      keyWord: [],
      sele: [],
      cd: [],
      io: [],
      cds: '',
      swinput: '',
      ioo: '',
      seles: '',
      financing: '',
      isFindShow: false,
      timer: '',
      boxStatus: 1,
      // 显示隐藏图片
      show_1: true,
      show_2: false,
      show_3: true,
      show_4: false,
      show_5: true,
      show_6: false,
      show_7: true,
      show_8: false,
      pwdisshow: false,
      phone: "",
      company: "",
      namea: "",
      phones: "",
      input: '',
      showxl: false,
      newcom: [],
      customeName: '',
      master_product: [], // 主营产品
      masterjson: [],
      ruleForm: {
        region: '',
        tel: '',
        company: '',
        yourname: '',
      },
      rules: {
        region: [{
          required: true,
          message: '请选择融资额度',
          trigger: 'change'
        }],
        tel: [{
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            min: 11,
            max: 11,
            message: '请输入正确手机号',
            trigger: 'blur'
          }
        ],
        company: [{
            required: true,
            message: '请输入公司名称',
            trigger: 'blur'
          },
          {
            min: 2,
            message: '公司名称不得小于两位',
            trigger: 'blur'
          }
        ],
        yourname: [{
            required: true,
            message: '姓名不能为空',
            trigger: 'blur'
          },
          {
            min: 2,
            message: '姓名不得小于两位',
            trigger: 'blur'
          }
        ],
      },

    }
  },
  created() {
    
    this.io = this.$util.getCodeMap("KUBE");
    this.cd = this.$util.getCodeMap("PRODUCINGAREA");
    this.financing = this.$util.getCodeMap("FINANCING");

    this.master_product = this.$util.getCodeMap("MASTER_PRODUCT");
    var json = {};
    this.master_product.forEach(v => {
      json[v.dictCode] = v.dictName
    })
    this.masterjson = json; // 主营产品
    // 获取热搜数据
  },
  watch: {
    srbox() {
      this.isFindShow = false;
    },
  },
  mounted() {
  },
  methods: {
    chosecategory(){
      this.axios.get("product/category").then((res) => {
        this.sele = res;
      });
    },
    hotsearch(){
      this.axios.get("/word/1").then((res) => {
        this.keyWord = res;
      });
    },
    newcustome() {
      var that = this;
      this.axios.get("customer/newcomer/6")
        .then(function (data) {
          //                  console.log(data,'data');
          that.newcom = that.transform(data);
          //                  console.log(that.newcom,'newcome');
        });
    },
    transform(data = []) {
      data.forEach(item => {
        if (item.attributes != '') {
          item.industrys = item.attributes[0];
        } else {
          item.industrys = '';
        }
      })
      return data;
    },
    submitForm(formName) {
      const financing = this.financing;
      this.$refs[formName].validate((valid) => {
        var forminf = $('.demo-ruleForm').serialize();
        if (valid) {
          var FinancingApply = {
            'financingCode': financing.filter(v => v.dictName === $("input[name='financingCode']").val())[0].dictCode,
            'mobile': $("input[name='mobile']").val(),
            'companyName': $("input[name='companyName']").val(),
            'userName': $("input[name='userName']").val(),
          };
          var token = sessionStorage.token;
          var that = this;
          this.axios.post("financing/add", FinancingApply).then((res) => {
            that.$confirm('信息提交成功', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success',
              callback() {
                that.$refs.ruleForm.resetFields();
                that.ruleForm = {
                  region: '',
                  tel: '',
                  company: '',
                  yourname: '',
                }

              }
            })
          });
        } else {
          //                  console.log('error submit!!');
          return false;
        }
      });
    },

    find() {
      this.$emit('search')
      location.href = "#/autotrophy" + "?name=" + this.inputs;
      this.$emit('search')
    },

    searchcus() {
      this.$emit('search');
      this.$router.push('/searchResult?name=' + this.customeName || "")

      this.$emit('search');
      this.customeName = '';
    },
    morecustom() {
      this.$emit('search');
      location.href = "#/searchResult?name=";
    },

    findBtn() {
      this.$emit('search')
      this.$router.push({
        path: "autotrophy",
        query: {
          categoryId: this.seles,
          manufacturerCode: this.cds,
          warehouseCode: this.ioo,
          name: this.swinput
        }
      })
      this.$emit('search')
    },

    open(e) {
      if (this.phone == "" && this.company == "" && this.namea == "") {
        this.$alert('内容不能为空', '提交失败', {
          confirmButtonText: '确定'
        });
      } else {
        this.$alert('等待审核', '提交成功', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push({
              path: '#/financial'
            });
          }
        });
      }
    },
    num() {
      const regu = /^1[3|4|5|7|8][0-9]{9}$/;
      // const regu = /^[0-9a-z]{6,16}$/i;
      if (regu.test(this.phone)) {
        this.pwdisshow = false;
      } else if (this.phone == '') {
        this.phones = "您的手机号码不能为空"
        this.pwdisshow = true;
      } else {
        this.pwdisshow = true;
        this.phones = "请输入正确的手机号码！"
      }
    },

    // 切换贴心服务
    parentMsg(msg) {
      return this.isFindShow = msg
    },
    parent(res) {
      this.timer = setTimeout(() => {
        $('.el-select-dropdown').hide()
        return this.isFindShow = res
      }, 100);
    },
    // 控制显示图片
    switchBox(num) {
      // $('.el-select-dropdown').hide()
      if (num == 1) {
        this.hotsearch();
        this.chosecategory();
        this.show_1 = true,
        this.show_2 = false,
        this.show_3 = true,
        this.show_5 = true,
        this.show_6 = false,
        this.show_4 = false,
        this.show_7 = true,
        this.show_8 = false
      } else if (num == 2) {
        this.show_1 = false,
          this.show_2 = true,
          this.show_3 = false,
          this.show_4 = true,
          this.show_5 = true,
          this.show_6 = false,
          this.show_7 = true,
          this.show_8 = false

      } else if (num == 3) {
        this.newcustome();
        this.show_1 = false,
        this.show_2 = true
        this.show_3 = true,
        this.show_4 = false,
        this.show_5 = false,
        this.show_6 = true,
        this.show_7 = true,
        this.show_8 = false

      } else if (num == 4) {
        this.show_1 = false,
          this.show_2 = true,
          this.show_3 = true,
          this.show_4 = false
        this.show_5 = true,
          this.show_6 = false
        this.show_7 = false,
          this.show_8 = true
      }
      this.boxStatus = num;

    },
    // 移入显示
    wrapmovein() {
      clearTimeout(this.timer)
      this.isFindShow = true;

    },
    //  移出隐藏
    // wrapmoveout() {

    //   // this.timer = setTimeout(() => {
    //   //         this.isFindShow = false;
    //   //   //      $('.el-select-dropdown').hide()
    //   // }, 100);
    // },
    swtClose() {
      this.isFindShow = false;
      $('.el-popper').hide();
      //    $('.el-select-dropdown').hide()
    },
    tocym(id) {
      window.open('#/mainproduct?userId=' + id);
      var that = this;
      that.axios.post("customer/browse/" + id)
        .then(function (data) {
          //						console.log(data,'33')
        });
    },
  }
}
