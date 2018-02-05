
export default {
  name: 'bidsuccess',
  components: {},
  props: [],
  data() {
    return {
      status:'',
      productList:[],
      cd:'',
      io:'',
      ph:'',
      unit:'',
      phjson:[],
      iojson:[],
      cdjson:[],
      unitjson:[],
      categoryName:'',
      number:'',
      biddingPrice:'',
      biddPrice:'',
      sumprice:'',
      phnumber:'',
      warhouse:'',
      unitint:'',
      manu:'',
      ids:'',
      bidrequire:'',  // 备注
      changeAdd:false,
      defaultName:'',
      defaultPhone:'',
      defaultAdd:'',
      newAdd:false,
      choseaddList:[],
      haveName:'',
      havephone:'',
      haveadd:'',
      skuid:'',
      bizcreditcode:'',
      companyname:'',
      proname:[],
      cityname:[],
      country:[],
      parentid:'',
      defaultid:'',
      addid:'',
      success:false,
      ishaveDefault:false,
      haveDefault:false,
      defaultPro:'',
      donthaveadd:false,
      ruleForm: {
          name: '',
          phone:'',
          pro1: '',
          city: '',
          country: '',
          desc: ''
        },
       rules: {
        name: [
          { required: true, message: '请输入收货人姓名', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入收货人电话', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确电话', trigger: 'blur' }
        ],
        pro1: [
          { required: true, message: '请选择省/直辖市', trigger: 'change' }
        ],
         pro2: [
          { required: true, message: '请选择省/直辖市', trigger: 'change' }
        ],
         pro3: [
          { required: true, message: '请选择省/直辖市', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请填写详细地址', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.failList();
    // this.haveaddress();
    var that = this;
    that.cd = that.$util.getCodeMap("PRODUCINGAREA");   // 产地
    that.io = that.$util.getCodeMap("KUBE");    // 库别
    that.ph = that.$util.getCodeMap("GRADE");   // 牌号
    that.unit = that.$util.getCodeMap("UNIT");   // 单位
    var json = {};
    that.ph.forEach(v => {
      json[v.dictCode] = v.dictName
    })
    this.phjson = json;    // 牌号
    
    var json2 = {};
    that.io.forEach(v => {
      json2[v.dictCode] = v.dictName
    })
    this.iojson = json2;  // 库别

     var json3= {};
    that.cd.forEach(v => {
      json3[v.dictCode] = v.dictName
    })
    this.cdjson = json3;  // 产地

    var json4 = {};
    that.unit.forEach(v => {
      json4[v.dictCode] = v.dictName
    })
    this.unitjson = json4;  // 单位
    this.defaultadd();   // 默认地址
    this.addinformation();   // 新增信息
  },
  mounted() {

  },
  methods: {
    failList(){
      var that = this;
       this.axios.get("bidding/record/info?id="+this.$route.query.id +'&date=' + new Date().getTime())
       .then(function (data) {
        console.log(data,888);
          that.status = data.biddingStatus.desc;
          if(data.biddingStatus.value == '2'){
            that.success = true;
            
          }else{
            that.success = false;
          }
          that.productList = [data.sku];
          that.number = data.biddingQuantity;
          that.phnumber = data.sku.product.gradeCode;
          that.warhouse = data.sku.warehouseCode;
          that.unitint = data.sku.unitCode;
          that.manu = data.sku.product.manufacturerCode;
          that.ids = data.id;
          that.skuid = data.sku.id;   // skuid
          String.prototype.getAns = function() {
            var pattern = /(?=((?!\b)\d{3})+$)/g;
            return this.replace(pattern, ',');
          } 
          that.biddPrice = data.biddingPrice
          that.biddingPrice = JSON.stringify(data.biddingPrice).getAns();
          that.sumprice = JSON.stringify(data.biddingPrice *  that.number).getAns();
          that.axios.get("order/purchase/"+that.skuid)
          .then(function (data) {
            console.log(data,'daeee');
            that.bizcreditcode = data.customerInfo.attributes[2].bizCreditCode;
            that.companyname = data.customerInfo.customer.name;
          })
      })
        .catch(error => console.log(error))
    }, 

    // 默认收货地址
    defaultadd(){
      var that = this;
      this.axios.get("address/defaultaddress?date="+ new Date().getTime())
       .then(function (data) {
        console.log(data,'datadef');
        if( data != null || data != undefined){
          that.ishaveDefault = false;
          that.haveDefault = true;
          that.defaultName = data.userName;  // 默认名字
          that.defaultPhone = data.primaryPhone;   // 默认电话
          that.defaultAdd = data.address;  // 默认地址
          that.defaultPro = data.provinceName + data.cityName + data.areaName;
          that.addid= data.id;   // 地址id
        }else if(data == null){
          that.ishaveDefault = true;
          that.haveDefault = false;
         
        }
        
      })
        .catch(error => console.log(error))
    },
    //  新增收货地址
    submitForm(formName) {
        var that = this;
        this.$refs[formName].validate((valid) => {
          if(valid){
              this.axios.post("address/addAddress", {
                "userName": that.ruleForm.name,
                "province": that.ruleForm.pro1,
                "city": that.ruleForm.city,
                "area": that.ruleForm.country,
                "address": that.ruleForm.desc,
                "primaryPhone": that.ruleForm.phone,
              }).then((res) => {
                console.log(res,'res');
                this.choseaddress(res.id);
                that.newAdd = false;
                that.haveDefault = true;
                that.ishaveDefault = false;
                that.$refs[formName].resetFields();

            })
          }
           
        })
      }, 
      //取消收货地址
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.newAdd = false;
      },

      //所有地址
      manyadd(){
        this.changeAdd = true ;
        var that = this;
        this.axios.get("address/addressList?date="+new Date().getTime())
         .then(res => {
          if(typeof res != 'string'){
              that.choseaddList = res;

          }
        })
      },
      chosethis(index,id){
        var that = this;
        $('.changadd-wrap').css('border','1px solid #CCC');
         $($('.changadd-wrap')[index]).css('border','1px solid #009EF0');
        that.defaultid = id;
      },
      choseaddress(id){
        var that = this;
        var ids = this.defaultid;
        console.log(this.defaultid);  // 设置默认地址
        that.axios.post(`address/isdefault/${id || ids}`)
        .then((res) => {
            that.defaultadd();
            that.changeAdd = false;
        })
      },
      addinformation(){
        var that = this;
        this.axios.get("area/list?parent=" + this.parentid)
        .then(function (data) {
          that.proname = data;
        })
      },
      prochange(){
        console.log(this.ruleForm.pro1)
        var that = this;
        that.cityname = [];
        that.ruleForm.city='';
        that.ruleForm.country='';

        this.axios.get("area/list?parent=" + this.ruleForm.pro1 + '&data='+new Date().getTime())
        .then(function (data) {
          console.log(data,'932');
          that.cityname = data
        })
      },
      ciytchange(){
        var that = this;
        that.country = [];
        that.ruleForm.country='';
        this.axios.get("area/list?parent=" + this.ruleForm.city + '&data='+new Date().getTime())
        .then(function (data) {
          console.log(data,'932');
          that.country = data
     
        })
      }, 
      // 确认订单
      affirmorder(){
        var that = this;
        that.axios.post("bidding/product/order",
          {
            "recordId": that.ids,
            "addressId": that.addid,
            "remark": that.bidrequire,
            "itemList": [
              {
                "skuId": that.skuid,
                "retailPrice": that.biddPrice,
                "quantity": that.number,
                "productId": that.ids
              }
            ]
        },{params:{noInterceptor:1}})
        .then((res) => {
          console.log(res,'er');
          if(res.code == 500){
            this.donthaveadd = true;
          }else{
            that.changeAdd = false;
            this.$router.push('/companycenter/mybid')
          }
         
        })
      },
      // 关闭弹出框
      handleClose(done){
        done()
      },
      mastadd(){
        this.donthaveadd = false;
        this.newAdd = true
      },

  }
}
