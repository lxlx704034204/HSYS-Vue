
export default {
  name: 'bidsuccess',
  components: {},
  props: [],
  data() {
    return {
      tableData: [],
      formLabelWidth: '90px',
      dialogFormVisible3: false,
      dialogFormVisible1: false,
      placelist: [],
      celist:[],
      cityList: [],
      countryList: [],
      adrlist:[],
      addIDS: '',
      defas:"",
      submitType: "add",
      ruleForm1: {
        userName: '',
        primaryPhone: '',
        address: '',
        province: '',
        city: '',
        area: '',
        id: '',
      },
      ruleForm2: {
        userName: '',
        primaryPhone: '',
        address: '',
        province: '',
        city: '',
        area: '',
      },
    }
  },
  computed: {

  },
  created() {
    if(this.dialogFormVisible3){
      this.selectChange();
    }
   this.shamsg();
   this.defa();
  },
  mounted() {

  },
  methods: {
    newadd() {
      this.dialogFormVisible3 = true;
      this.submitType = "add";
      this.resetForm(this.ruleForm2);
    },
    selectChange() {
      var that = this;
      var token = sessionStorage.token ? sessionStorage.token : '';
      this.axios.get("area/list").then((res) => {
        that.placelist = res;
      })
    },
    // 市
    changeValue() {
      var proId = this.ruleForm2.province;
      this.modelArea = '';
      this.modelcity = '';
      var that = this;
      this.axios.get(`area/list?parent=${proId}`).then((res) => {
        that.cityList = res;
      })

    },
    //县
    changeCity() {
      var cityId = this.ruleForm2.city;
      this.modelArea = '';
      var that = this;
      this.axios.get(`area/list?parent=${cityId}`).then((res) => {
        that.countryList = res;
      })
    },
    submitForm2() {
      if (this.ruleForm2.userName == '') {
        this.$alert('用户名不能为空', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
        });
      } else if (this.ruleForm2.primaryPhone == '') {
        this.$alert('联系电话不能为空', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
        });
      } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.ruleForm2.primaryPhone))) {
        this.$alert('请输入正确手机号', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
        });
      } else if (this.ruleForm2.province == '') {
        this.$alert('省份不能为空', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
        });
      } else if (this.ruleForm2.city == '') {
        this.$alert('城市不能为空', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
        });
      } else if (this.ruleForm2.area == '') {
        this.$alert('地区不能为空', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
        });
      } else if (this.ruleForm2.address == '') {
        this.$alert('地址不能为空', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
        });
      } else {
        var that = this;
        const data = {
          userName : that.ruleForm2.userName,
          province : that.ruleForm2.province,
          city : that.ruleForm2.city,
          area : that.ruleForm2.area,
          address : that.ruleForm2.address,
          primaryPhone : that.ruleForm2.primaryPhone
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
                that.resetForm(that.ruleForm2);
              })
            })
          },
          edit() {
            data.id = that.ruleForm2.id
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
                that.resetForm(that.ruleForm2);
              })
            })
          }
        };
        handler[this.submitType]();
      }
    },
    shamsg() {
      this.dialogFormVisible2 = true;
      var that = this;
      this.axios.get("address/addressList").then((res) => {
        console.log(11111111);
        console.log(res);
        that.adrlist = res;
      })
    },
    resetForm(data) {
      Object.keys(data).forEach(v => {
        this.ruleForm2[v] = ""
      })
    },
    //修改地址
    changemsg(id) {
      this.dialogFormVisible3 = true;
      this.submitType = "edit";
      var that = this;
      this.axios.get("address/init/" + id).then((res) => {
        that.ruleForm2.userName = res.userName;
        that.ruleForm2.primaryPhone = res.primaryPhone;
        that.ruleForm2.province = res.province;
        // that.ruleForm2.province1= JSON.parse(localStorage.proObj)[res.province];
        that.ruleForm2.city = res.city;
        that.ruleForm2.area = res.area;
        that.ruleForm2.address = res.address;
        that.ruleForm2.id = res.id;
        var cityObj = {};
        that.axios.get(`area/list?parent=${that.ruleForm2.province}`).then((cityList) => {
          for (var i = 0; i < cityList.length; i++) {
            cityObj[cityList[i].id] = cityList[i].name;
          }
          that.ruleForm2.city = cityObj[that.ruleForm2.city];
          that.cityList = cityList;
        })
        var countryObj = {};
        that.axios.get(`area/list?parent=${that.ruleForm2.city}`).then((countryList) => {
          for (var i = 0; i < countryList.length; i++) {
            countryObj[countryList[i].id] = countryList[i].name;
          }
            that.ruleForm2.area = countryObj[that.ruleForm2.area];
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
