import storage from "store2";
import initCodeMapData from "@/initData";
export default  {
  name: 'auction',
  components: {}, 
  props: [],
  data () {
    return {
      loading:true,
      category: [],
      companies: [],
      cities: [],
      io: '',
      dw: '',
      cd: '',
      ph: '',
      fs: '',
      dw:'',
      productnum:'',

      cglen: 5,
      cgShowLen: 5,
      ctLen: 12,
      ctShowLen: 12, // 默认显示多少条，和ctLen一样大
      categorys: [],
      company: [],
      city: [],
      keyword:'',
      biddstatu:'',
      pageNo: 1,
      pageSize: 0,
      pageSizesList: [10, 15, 20, 30, 50],
      total: 0,//数据的总数,
      prod:[],

      biddlist:[],  // 竞价列表
      istakebidd:'',  // 是否竞拍中
      lastime:'',  // 剩余时间
      endtime:'',  // 结束时间
      nowtime:'', // 现在时间
      time_distance:'',  // 时间差
      intday:'',   //倒计时时间天
      inthour:'',   // 小时
      intmin:'',  // 分钟
      intsec:'',  // 秒
       //分类id
      categoryId:'',
      // 产地
      manufacturerCode:'',
      // 库别
      warehouseCode:'',
      gradeNum:'',
      phjson:[],
      iojson:[],
      cdjson:[],
      dwjson:[],
      cds:[],
      ficatLen:11,
      ctLen:11,
      typeLen:11,
      categorya:[],
      nowDate:'',
      serviceTime:0,

    }
  },
  created() {
    this.$store.commit("switchHeaderType", 1);
    this.classfy();
    this.comList();
    this.dicCode();
  },
  mounted () {
  },
  methods: {
    // 数据字典
    dicCode(){
      var that = this;
        that.dw = this.$util.getCodeMap("UNIT");
        that.cds = that.$util.getCodeMap("PRODUCINGAREA");   // 产地
        that.cd = that.cds.slice(0, that.ficatLen);
        that.ios = that.$util.getCodeMap("KUBE");    // 库别
        that.io = that.ios.slice(0, that.ctLen);
        that.ph = that.$util.getCodeMap("GRADE");   // 牌号

        var json = {};
        that.dw.forEach(v => {
          json[v.dictCode] = v.dictName
        })
        this.dwjson = json;    // 牌号
        
        var json = {};
        that.ph.forEach(v => {
          json[v.dictCode] = v.dictName
        })
        this.phjson = json;    // 牌号

        var json2 = {};
        that.ios.forEach(v => {
          json2[v.dictCode] = v.dictName
        })
        this.iojson = json2;  // 库别

         var json3= {};
        that.cds.forEach(v => {
          json3[v.dictCode] = v.dictName
        })
        this.cdjson = json3;  // 产地
    },
    // 分类
    classfy(){
      var that = this;
        this.axios.get( "product/category")
        .then(function(data){
             that.categorya = data;
             // storage.set("categoryParents0", data);
             that.category = data.slice(0, that.typeLen);
        })
        .catch(error => console.log(error))
    },  
     // 选择分类qq
    selectFilter(type, title ,code,item) {
      // TODO list
      var that = this;
      if (type === 1) { //分类条件
        if (this.categorys.indexOf(title) == -1) {
          this.categoryId = title.id;
          this.categorys = [];
          this.categorys.push(title);
        }
      } else if (type === 2) { // 产地
        if (this.company.indexOf(title) == -1) {
          this.manufacturerCode = item.dictCode;
          this.company = [];
          this.company.push(title.target.innerHTML);
        }

      } else if (type === 3) { // 库别
        if (this.city.indexOf(title) == -1) {
          this.warehouseCode = item.dictCode;
          this.city = [];
          this.city.push(title.target.innerHTML);
        }
      }
      this.comList()
      // this.productlists();
    },
    //显示更多分类
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
      this.cd = this.cds.slice(0, this.ficatLen);
    },
    // 显示更多库别
    showAllCity() {
      this.io = this.ios;
    },
    hideAllCity() {
    this.io = this.ios.slice(0, this.ctLen);
    },

    removeFilter(type, data) {
      if (type === 1) { // 删除分类条件
        this.categoryId = '';
         this.categorys.splice(i, 1);
      } else if (type === 2) {// 删除公司条件
        this.manufacturerCode = '';
         this.company.splice(i, 1);
      } else {// 删除交货地址条件
        this.warehouseCode = '';
         this.city.splice(i, 1);
      }

      var usename = [];
      for (var i = 0; i < this.categorys.length; i++) {
        usename[i] = this.categorys[i].name;
      }
      this.comList()
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
      this.comList()
    },
     // 搜索
    goSearch() {
      this.comList()
    },
    selectSendWay(){
      this.comList()
    },
      // 上一页
    prevPage() {
      this.pageNo--;
      if (this.pageNo === 0) {
        this.pageNo = 1;
        this.comList()
        return
      } 
    },
    // 下一页
    nextPage() {
      this.pageNo = this.pageNo + 1;
      if (this.pageNo === this.total / this.pageSize) {
        this.pageNo = this.total / this.pageSize;
        this.comList()
        return
      } 

    },
     pageChange(num) {
      this.pageNo = num;
        this.comList()

    },

    //公用数据查询  
    comList(){
      var _this = this;
      this.axios.get( "bidding/product/list?&current="+ this.pageNo + '&size=10' + '&categoryId=' + this.categoryId + "&manufacturerCode=" + this.manufacturerCode + "&warehouseCode=" + this.warehouseCode +'&biddingStatus=' + this.biddstatu + '&nameOrSkuCode=' +  this.keyword)
      .then(function(data){
        console.log(data);
            _this.loading = false;
            _this.total = data.total;
            _this.nowDate = data.nowDate;
            _this.pageSize = data.size;
            const { records = [], pages = 1 } = data || {};
            _this.biddlist = _this.transform(records);
            setInterval(()=>_this.biddlist = _this.transform(_this.biddlist),  1000);
      })
      .catch(error => console.log(error))
    },
    
     transform(data = []) {
      data.forEach(item => {
        var re = new RegExp("-", "g"); 
        item.endDate  = item.endDate.replace(re, "/");
        item.startDate  = item.startDate.replace(re, "/");
        item.nowDate  = item.nowDate.replace(re, "/");
        var endDate = parseInt(new Date(item.endDate).getTime()/1000)  ;
        var startDate =parseInt(new Date(item.startDate).getTime()/1000)  ;
        var nowtime = parseInt(new Date(item.nowDate).getTime()/1000);
        var mytime = parseInt(new Date().getTime()/1000);

        if(!this.serviceTime){
          this.serviceTime = nowtime - mytime;
        }
        if(this.serviceTime >= 0){
          var lastime =  mytime + this.serviceTime;
        }else{
          var lastime =  mytime + this.serviceTime;
        }
        if(startDate >= lastime){
          var time_distance = startDate - lastime;  // 未开始
          if(time_distance == 0 && lastime < endDate){
            item.biddingStatus.value = 2;
          }
        }else if(endDate >= lastime){
          var time_distance =  endDate - lastime;   //已开始
            if(time_distance == 0){
              item.biddingStatus.value = 0;
            }
        }else if(endDate < lastime){
           var time_distance = 0;
        }
        if(time_distance <=0){
          item.updateStr = '00天00时00分';
        }else if(time_distance <= 60 && time_distance >= 0){
          this.inthour = Math.floor(time_distance/3600);  // 时
          time_distance -= this.inthour * 3600;
          this.intmin = Math.floor(time_distance/60);  // 分钟
          time_distance -= this.intmin * 60;
          this.intsec = Math.floor(time_distance);
          if(this.inthour/1 < 10){
            this.inthour = '0'+ this.inthour/1;
          }
          if(this.intmin/1 < 10){
            this.intmin = '0' + this.intmin/1; 
          }  
          if(this.intsec/1 < 10){
            this.intsec = '0'+ this.intsec/1;
          }
          item.updateStr = this.inthour + '时' + this.intmin + '分' + this.intsec+'秒' ;
        }else{
          this.intday = Math.floor(time_distance/86400);  // 天
          time_distance -= this.intday * 86400;
          this.inthour = Math.floor(time_distance/3600);  // 时
          time_distance -= this.inthour * 3600;
          this.intmin = Math.floor(time_distance/60);  // 分钟
          if(this.intday/1 < 10){
            this.intday = '0'+ this.intday/1;
          }
          if(this.inthour/1 < 10){
            this.inthour = '0'+ this.inthour/1;
          }
          if(this.intmin/1 < 10){
            this.intmin = '0' + this.intmin/1; 
          }
          item.updateStr = this.intday+'天' + this.inthour + '时' + this.intmin + '分';
        }

     });
      return data;
    },
    getRowlist(row){
      this.$router.push({path: '/auctiondetail?id='+ row.id});

    }
  }
}
