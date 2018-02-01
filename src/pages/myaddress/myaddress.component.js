
export default {
  name: 'myaddress',
  components: {},
  props: [],
  data() {
    return {
      tableData: [],
      formLabelWidth: '90px',
      dialogFormVisible3: false,
      placelist: [],
      celist:[],
      cityList: [],
      countryList: [],
      adrlist:[],
      addIDS: '',
      defas:"",
      submitType: "add",
      ruleForm: {
        userName: '',
        primaryPhone: '',
        address: '',
        province: '',
        city: '',
        area: '',
        id: '',
      },
    }
  },
  computed: {

  },
  created() {
   this.shamsg();
   this.defa();
   this.selectChange();
  },
  mounted() {
  },
  updated(){
    
  },
  methods: {
    newadd() {
      this.dialogFormVisible3 = true;
      this.submitType = "add";
      this.resetForm(this.ruleForm);
    },
    selectChange() {
      this.axios.get("area/list").then((res) => {
        this.placelist = res;
      })
    },
    // 市
    changeValue() {
      var proId = this.ruleForm.province;
      this.modelArea = '';
      this.modelcity = '';
      var that = this;
      this.axios.get(`area/list?parent=${proId}`).then((res) => {
        that.cityList = res;
      })

    },
    //县
    changeCity() {
      var cityId = this.ruleForm.city;
      this.modelArea = '';
      var that = this;
      this.axios.get(`area/list?parent=${cityId}`).then((res) => {
        that.countryList = res;
      })
    },
    submitForm2() {
      if (this.ruleForm.userName == '') {
        this.$alert('用户名不能为空', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
        });
      } else if (this.ruleForm.primaryPhone == '') {
        this.$alert('联系电话不能为空', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
        });
      } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.ruleForm.primaryPhone))) {
        this.$alert('请输入正确手机号', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
        });
      } else if (this.ruleForm.province == '') {
        this.$alert('省份不能为空', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
        });
      } else if (this.ruleForm.city == '') {
        this.$alert('城市不能为空', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
        });
      } else if (this.ruleForm.area == '') {
        this.$alert('地区不能为空', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
        });
      } else if (this.ruleForm.address == '') {
        this.$alert('地址不能为空', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
        });
      } else {
        var that = this;
        const data = {
          userName : that.ruleForm.userName,
          province : that.ruleForm.province,
          city : that.ruleForm.city,
          area : that.ruleForm.area,
          address : that.ruleForm.address,
          primaryPhone : that.ruleForm.primaryPhone
        };
        const handler = {
          add() {
            that.axios.post("address/addAddress", data)
            .then((res) => {
              that.$alert('信息添加成功', '提示', {
                confirmButtonText: '确定',
                type: 'success',
              }).then(() => {
                that.dialogFormVisible3 = false
                that.shamsg();
                that.resetForm(that.ruleForm);
              })
            })
          },
          edit() {
            data.id = that.ruleForm.id
            if (isNaN(data.city * 1)) {
              data.city = that.cityList.filter(v => v.name === data.city)[0].id
            }
            if (isNaN(data.area * 1)) {
              data.area = that.countryList.filter(v => v.name === data.area)[0].id
            }
            that.axios.put("address/edit", data)
            .then((res) => {
              that.$alert('修改成功', '提示', {
                confirmButtonText: '确定',
                type: 'success',
              }).then(() => {
                that.dialogFormVisible3 = false
                that.shamsg();
                that.resetForm(that.ruleForm);
              })
            })
          }
        };
        handler[this.submitType]();
      }
    },
    shamsg() {
      // this.dialogFormVisible2 = true;
      var that = this;
      this.axios.get("address/addressList").then((res) => {
        console.log(11111111);
        console.log(res);
        that.adrlist = res;
      })
    },
    resetForm(data) {
      Object.keys(data).forEach(v => {
        this.ruleForm[v] = ""
      })
    },
    //修改地址
    changemsg(id) {
      this.dialogFormVisible3 = true;
      this.submitType = "edit";
      var that = this;
      this.axios.get("address/init/" + id).then((res) => {
        that.ruleForm.userName = res.userName;
        that.ruleForm.primaryPhone = res.primaryPhone;
        that.ruleForm.province = res.province;
        // that.ruleForm.province1= JSON.parse(localStorage.proObj)[res.province];
        that.ruleForm.city = res.city;
        that.ruleForm.area = res.area;
        that.ruleForm.address = res.address;
        that.ruleForm.id = res.id;
        var cityObj = {};
        that.axios.get(`area/list?parent=${that.ruleForm.province}`).then((cityList) => {
          for (var i = 0; i < cityList.length; i++) {
            cityObj[cityList[i].id] = cityList[i].name;
          }
          that.ruleForm.city = cityObj[that.ruleForm.city];
          that.cityList = cityList;
        })
        var countryObj = {};
        that.axios.get(`area/list?parent=${that.ruleForm.city}`).then((countryList) => {
          for (var i = 0; i < countryList.length; i++) {
            countryObj[countryList[i].id] = countryList[i].name;
          }
            that.ruleForm.area = countryObj[that.ruleForm.area];
            that.countryList = countryList;
        })
      })
    },
    // 设为默认地址
    defaults(id,event){
      var that = this;
      this.axios.post("address/isdefault/" + id).then((res) => {
        this.defa();
      })
    },
    // 读取默认地址
    defa(){
      var that = this;
      this.axios.get("address/defaultaddress").then((res) => {
        that.defas = res || {};
      })
    }
  }
}
