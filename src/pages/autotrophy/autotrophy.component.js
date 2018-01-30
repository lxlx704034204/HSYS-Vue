import chartDemo from '@/examples/k-line/index';
import storage from "store2";
import loginauct from "@/pages/loginauct";
export default {
  name: 'autotrophy',
  components: { chartDemo, loginauct },
  props: ['searchData'],
  data() {
    return {
      token: '',
      data: '',
      isLogin: false,
      // 搜索关键字
      tableData: [],
      // product:[],
      io: '',
      ios: '',
      ioa: '',
      dw: '',
      cd: '',
      cds: '',
      cda: '',
      ph: '',
      fs: '',
      pageNo: 1,
      pageSize: 10,
      pageSizesList: [10, 15, 20, 30, 50],
      total: 0,//数据的总数,

      //分类id
      categoryId:'',
      // 产地
      manufacturerCode:'',
      // 库别
      warehouseCode:'',

      join: "加入自选",
      // 分类数据
      category: [],
      categorya: [],
      companies: [],
      cities: [],

      typeLen: 11,//分类
      typeShowLen: 11,
      cdlen: 11,//产地
      cgShowLen: 11,
      ctLen: 11,//库别
      ctShowLen: 11, // 默认显示多少条，和ctLen一样大

      // 选择类型
      selectType: 0,
      // 搜索关键字
      keyword: '',
      categorys: [],
      company: [],
      city: [],
      prod: [],
      sale: [],
      series:[],
      oneprice:false,
      changeprice:false,
      downprice:false,
      echartData:[],
      name:'',
      loading: true,
      salse:[],
      // 排序
      updateOrder: "",
      priceOrder: "",
    }
  },
  created() {
  	this.$store.state.headerType = 1;
    this.token = storage.get("token");
    var that = this;

    that.cds = this.$util.getCodeMap("PRODUCINGAREA");   // 产地
    that.cd = this.cds.slice(0, that.cdlen);

    that.ios = this.$util.getCodeMap("KUBE");    // 库别
    that.io = this.ios.slice(0, that.ctLen);

    that.dw = this.$util.getCodeMap("UNIT");
    that.ph = this.$util.getCodeMap("GRADE");
    that.fs = this.$util.getCodeMap("SHIPPING_METHOD");
    that.cda = this.$util.getCodeMap("PRODUCINGAREA");// 产地
    that.ioa = this.$util.getCodeMap("KUBE");// 库别
    // console.log(that.fs.filter(v => v.dictCode === "ZI_TI")[0])


    var name = that.$route.query.name?that.$route.query.name:'';
    that.keyword = name;
    that.categoryId = that.$route.query.categoryId?that.$route.query.categoryId:'';
    that.manufacturerCode = that.$route.query.manufacturerCode?that.$route.query.manufacturerCode:'';
    that.warehouseCode = that.$route.query.warehouseCode?that.$route.query.warehouseCode:'';

    //加载默认数据

    this.getCategory()
    this._ajax()
    console.log(this.category,'ddd')
  },
  computed: {
    getCities() {
      return this.cities.slice(0, this.ctLen);
    }
  },
  watch:{
    $route: function (route) {
      if (route.query.name) {
        this.keyword =  route.query.name;
      }
      if (route.query.warehouseCode) {
        this.warehouseCode =  route.query.warehouseCode;
      }
      if (route.query.manufacturerCode) {
        this.manufacturerCode =  route.query.manufacturerCode;
      }
      if (route.query.categoryId) {
        this.categoryId =  route.query.categoryId;
      }

      this._ajax();
    },
  },
  methods: {
    getCategory(){
      var _this = this;
      _this.axios.get("product/category").then((res) => {
        _this.categorya = res;
        _this.category = _this.categorya.slice(0, this.typeLen);
        var categoryParents0 = {};
        storage.set("categoryParents0", res)
        if (res && _this.categoryId) {
          $.each(res, function (index, el) {
            if (_this.categoryId == el.id) {
              _this.categorys.push(el);
            }
          });
        }
      })
      // var categoryParents0 =  storage.get("categoryParents0");
      // if(categoryParents0 == '' || categoryParents0 == undefined ){
      //   _this.axios.get("product/category").then((res) => {
      //     _this.categorya = res;
      //     _this.category = _this.categorya.slice(0, this.typeLen);
      //     var categoryParents0 = {};
      //     storage.set("categoryParents0", res)
      //     if(res && _this.categoryId){
      //       $.each(res, function(index, el) {
      //          if(_this.categoryId == el.id){
      //             _this.categorys.push(el);
      //          }
      //       });
      //     }
      //   })
      // }else{
      //   _this.categorya = categoryParents0;
      //   _this.category = _this.categorya.slice(0, this.typeLen);
      // }

    },

    // 设置查询条件
    setSearchResult(){
      var that = this;
      var category = storage.get("categoryParents0");
      if(category){
         $.each(category,function(index, el) {
            if(that.categoryId == el.id){
               that.categorys = [];
               that.categorys.push(el);
            }
         });
      }
      var manufacturerCode = that.manufacturerCode;
      if(that.manufacturerCode){
        that.company = [];
        that.company.push(that.cd.filter(v => v.dictCode === that.manufacturerCode)[0])
      }
      if(that.warehouseCode){
        that.city = [];
        that.city.push(that.io.filter(v => v.dictCode === that.warehouseCode)[0]);
      }
    }
    ,
    searchKeyWord(){
      this.keyword = this.searchKeyWord;
      this._ajax();
    },
    switbtn(){
      alert(0)
    },

    // echart
    pop(row){
      let that = this;
      that.echartData = [];
      storage.set("echartId", row.id);
        this.axios.get('product/record?id='+ row.id).then((res) => {
          let chartData = res;
          for (var i = 0; i < chartData.length; i++) {
            that.echartData.push({value:[chartData[i].createDate,chartData[i].price]});
          }
        });
    },

    // //显示更多厂家(产地)
    // showAllCategory() {
    //   this.cdlen = this.companies.length;
    // },
    // hideAllCategory() {
    //   this.cdlen = this.cgShowLen;
    // },
    // // 显示更多城市(库别)
    // showAllCity() {
    //   this.ctLen = this.cities.length;
    // },
    // hideAllCity() {
    //   this.ctLen = this.ctShowLen;
    // },
    showAllCat() {
      this.category = this.categorya;
    },
    hideAllCat() {
      this.category = this.categorya.slice(0, this.typeLen);
    },
    //显示更多产地
    showAllCategory() {
      this.cd = this.cds;
    },
    hideAllCategory() {
      this.cd = this.cds.slice(0, this.cdlen);
    },
    // 显示更多库别
    showAllCity() {
      this.io = this.ios;
    },
    hideAllCity() {
      this.io = this.ios.slice(0, this.ctLen);
    },

    // 搜索
    goSearch() {
      this._ajax();
    },


    // 选择分类
    selectFilter(type, title ,code) {
      // TODO list
      // this.company.push({name:12111});
      if (type === 1) { //分类条件
        if (this.categorys.indexOf(title) == -1) {
          this.categoryId = title.id;
          this.categorys = [];
          this.categorys.push(title);
        }
      } else if (type === 2) { // 公司条件
        if (this.company.indexOf(title) == -1) {
          this.manufacturerCode = title.dictCode;
          this.company = [];
          this.company.push(title);
        }

      } else if (type === 3) { // 交货地址条件
        if (this.city.indexOf(title) == -1) {
          this.warehouseCode = title.dictCode;
          this.city = [];
          this.city.push(title);
        }
      }
      this._ajax();
      this.productlists();
    },
    productlists(){
      var usename = [];
      for (var i = 0; i < this.categorys.length; i++) {
        usename[i] = this.categorys[i].id;
      }
      this._ajax();
    },


    //公用数据查询
    _ajax(){
      var _this = this;
      _this.setSearchResult();

      this.axios.get("product/list?categoryId=" + this.categoryId + "&manufacturerCode=" + this.manufacturerCode + "&warehouseCode=" + this.warehouseCode + "&name=" + this.keyword +'&current=' + this.pageNo + '&size=10' + "&updateOrder=" + this.updateOrder + "&priceOrder=" + this.priceOrder)
      .then((res) => {
        _this.loading = false;
        const { records = [], pages = 1 } = res || {};
        _this.prod = _this.transform(records);
        _this.pageNo = res.current;
        _this.total = res.total;
        _this.prod.forEach(function(i,element){
          (function(element){
            if(_this.prod[element].oldPrice == null){
              _this.oneprice = true;
              _this.changeprice = false;
              _this.downprice = false;
            }else if(_this.prod[element].oldPrice != null){
              if(_this.prod[element].salePrice > _this.prod[element].oldPrice){
                _this.salse = _this.prod[element].salePrice - _this.prod[element].oldPrice
                _this.changeprice = true;
                _this.oneprice = false;
                _this.downprice = false;
              }else{
                _this.salse = _this.prod[element].oldPrice - _this.prod[element].salePrice
                _this.downprice = true;
                _this.changeprice = false;
                _this.oneprice = false;
              }
            }
          })(element)
        })
      });
    },
    removeFilter(type, data) {
      if (type === 1) { // 删除分类条件
        this.categoryId = '';
        for (var i = 0; i < this.categorys.length; i++) {
          if (this.categorys[i] == data) {
            this.categorys.splice(i, 1);
          }
        }
      } else if (type === 2) {// 删除公司条件
        this.manufacturerCode = '';
        for (var i = 0; i < this.company.length; i++) {
          if (this.company[i] == data) {
            this.company.splice(i, 1);

          }
        }
      } else {// 删除交货地址条件
        this.warehouseCode = '';
        for (var i = 0; i < this.city.length; i++) {
          if (this.city[i] == data) {
            this.city.splice(i, 1);

          }
        }
      }

      var usename = [];
      for (var i = 0; i < this.categorys.length; i++) {
        usename[i] = this.categorys[i].name;
      }
      this._ajax();
    },

    //  全部结果
    remove() {
      this.categoryId ='';
      this.manufacturerCode ='';
      this.warehouseCode='';
      this.biddstatu='';
      this.keyword = '';
      this.categorys=[];
      this.company=[];
      this.city=[];
      var _this = this;
      this.axios.get("product/list").then((res) => {
        const { records = [], pages = 1 } = res || {};
        _this.prod = _this.transform(records);
        _this.pageNo = res.current;
        _this.total = res.total;
      })
    },

    // 分页
    pageChange(num) {
      this.pageNo = num;
      var _this = this;
      var prop = {
        current: this.pageNo,
        name: this.keyword,
        categoryId: this.categoryId,
        warehouseCode:this.warehouseCode,
        manufacturerCode:this.manufacturerCode
      }
      this._ajax();

    },
    // 排序
    sortChange ({ column, prop, order }) {
      this[prop] = order.replace("ending", "")
      this._ajax();

    },

    // 显示名片
    service(row) {
      var id = row.userId;
      var _this = this;
      this.axios.get("sys/user/" + id).then((res) => {
      	console.log(res,'gg')
        _this.sale = res || {};
      })
    },
    openQQ(qq){
        window.open('http://wpa.qq.com/msgrd?v=3&uin='+qq+'&site=qq&menu=yes','_brank');
    },

     transform(data = []) {
      data.forEach(item => {
        var dateStr = item.updateDate;
        var date = new Date(dateStr).getTime();
        var timestamp = Date.parse(new Date());
        var nTime = timestamp - date;
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var monthC = nTime / month;
        var weekC = nTime / (7 * day);
        var dayC = nTime / day;
        var hourC = nTime / hour;
        var minC = nTime / minute;
        let updateStr = "";
        // if (monthC >= 1) {
        //   updateStr = parseInt(monthC) + "个月前";
        // }
        // else if (weekC >= 1) {
        //   updateStr = parseInt(weekC) + "周前";
        // }
        // else if (dayC >= 1) {
        //   updateStr = parseInt(dayC) + "天前";
        // }
        // else if (hourC >= 1) {
        //   updateStr = parseInt(hourC) + "个小时前";
        // }
        // else if (minC >= 1) {
        //   updateStr = parseInt(minC) + "分钟前";
        // } else {
        //   updateStr = "刚刚发表";
        // }
        if (monthC >= 1) {
          updateStr = "1天前";
        }
        else if (weekC >= 1) {
          updateStr = "1天前";
        }
        else if (dayC >= 1) {
          updateStr = "1天前";
        }
        else if (hourC >= 1) {
          updateStr = "1小时前";
        }
        else if (minC >= 1) {
          updateStr = "1分钟前";
        } else {
          updateStr = "刚刚发表";
        }
        item.updateStr = updateStr;
      });
      return data;
    },

    //向订单传递信息
    logining() {
      this.isLogin = false;
      this.token = storage.get("token")
    },
    getRowlist(row) {
      //判断登陆状态
      var that = this;
      var token = storage.get("token");
      var userId = storage.get("id");
      if (!token || token == "") {
        this.isLogin = true;
        return;
      }
      //判断企业验证状态
      if (!!userId) {
        this.axios.get('customer/detail/' + userId)
          .then(function (data) {
            if (data != "") {
              if (data.status !== 'SUCCESS') {
                that.$alert('公司信息尚未完善', '提示', {
                  confirmButtonText: '完善企业信息',
                  type: 'warning',
                  callback: action => {
                    that.$router.push("/companycenter/myfirm");
                  }
                })
              } else {
                that.$router.push({ path: '/order', query: { id: row.id } });
              }
            }
          })
      }
    },
    // getRowlist(row) {
    //   var token = storage.get("token");
    //   if (token && token !== "") {
    //     this.$router.push({ path: '/order', query: { id: row.id } })
    //   } else {
    //     this.$alert('请在登录后进行采购！', '提示', {
    //       confirmButtonText: '确定',
    //       type: 'error',
    //       callback: action => {
    //         this.$router.push("/login");
    //       }
    //     })
    //   }
    // },

    selection(id, rid, event) {
      var that = this;
      var even = $(event.currentTarget);
      var roid = id;
      var sele = {
        skuId: roid
      }
      var sel = JSON.stringify(sele);


      this.axios.post("product/collection", sele).then((res) => {
        that.$alert(res || "已加入", '提示', {
          confirmButtonText: '确定',
        })
        this._ajax();
      })
    }
  }

}
