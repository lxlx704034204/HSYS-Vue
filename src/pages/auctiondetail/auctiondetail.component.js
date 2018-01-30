import storage from "store2";
import loginauct from "@/pages/loginauct";
export default  {
  name: 'auctiondetail',
  components: {loginauct}, 
  props: [],
  data () {
    return {
      isLogin:false,
      istaking:false,
      isuntaking:false,
      autdetailist:[],
      brandNum:[],
      hotlist:[],
      deposit:'',
      takinglist:[],
      pageSize:6,
      pageNo:1,
      total:0,
      injumpprice:'',
      injumpquantity:'',
      countdown:'',
      // loading:false,
      centerDialogVisible: false,
      agree:false,
      toread:false,
      warehouse:'',
      warehouseitem:'',
      brand:'',
      branditem:'',
      manufacture:'',
      manufactureitem:'',
      hotlist:[],  // 热门拍卖列表
      hotlistid:'',  // 热门拍卖id
      hotName:'',   // 热门拍卖
      hotimt:'',   // 倒计时
      intday:'',
      inthour:'',
      intmin:'',
      token :'',
      ontaking:false,
      auctnum:'',  // 竞价数量
      auctprice:'',   // 竞拍价格
      number:'',  // 默认竞拍数量
      evenprice:'',  // 默认起拍价格
      toauctprice:'', // 出价
      listtaking:false,
      disablesub:false ,   // 无法出价
      ablesub:false ,   // 无法出价
      willtaktime:false,
      
      phjson:[],
      iojson:[],
      cdjson:[],
      unitjson:[],

      contactName:'',
      contacephone:'',
      sum:'',
      pdcom:'',
      urlid:'',
      flag:false,
      time:'',
      endTime:'',
      unitelement:'',
      times:'',
      websock: null,
      remain:'',
      newprice:'',
      willtaking:false,
      nowday:'',
      nowhour:'',
      nowmin:'',
      nowsec:'',
      startDate:'',
      ids:'',
      setime:'',
      ispass:false,
      loading:true,
      nowDate:'',
      nowrevers:'',
    }
  },
  created() {
    this.$store.state.headerType = 1;
    this.urlid =  this.$route.query.id || '';
    var that = this;
    this.brandNum = that.$util.getCodeMap("GRADE");   // 牌号
    this.warehouse = that.$util.getCodeMap("KUBE");    // 库别
    this.manufacturerCode = that.$util.getCodeMap("PRODUCINGAREA");   // 产地
    this.unit = this.$util.getCodeMap("UNIT");    // 单位
    this.token = storage.get("token")
    this.looker();
    this.hotlooker();
    this.auctList();
    this.taking();
    var json = {};
    this.brandNum.forEach(v => {
      json[v.dictCode] = v.dictName
    })
    this.phjson = json;    // 牌号
    var json2 = {};
    this.warehouse.forEach(v => {
      json2[v.dictCode] = v.dictName
    })
    this.iojson = json2;  // 库别

     var json3= {};
    this.manufacturerCode.forEach(v => {
      json3[v.dictCode] = v.dictName
    })
    this.cdjson = json3;  // 产地

    var json4= {};
    this.unit.forEach(v => {
      json4[v.dictCode] = v.dictName
    })
    this.unitjson = json4;  // 单位
  },
  mounted () {
    this.setime = setInterval(()=>{
       this.timeDown();
    },1000)
  },
  methods: {
    // 交保证金
    getRowlist(){
        this.centerDialogVisible = true;
    },
    // 登录
    logining(){
      this.isLogin = false;
      this.token = storage.get("token");
      this.ids = storage.get("id");
      this.isendding = false;
      this.isaddcash();
    },
    // 竞拍信息
    auctList(){
      var _this = this;
      if(this.urlid != ''){
        this.axios.get("bidding/product/info?id=" + this.urlid)
        .then(function(data){
          console.log(data,'datas');
            if(data.biddingStatus.value == 2){
              _this.willtaktime = true;
              _this.isaddcash();
            }else if(data.biddingStatus.value == 1){
                // 竞价未开始
              _this.isuntaking = true;
              _this.ontaking = false;
              _this.listtaking = false;
            }
            _this.nowDate = data.nowDate;
            _this.autdetailist = data;  
            _this.unitelement = data.unitCode;  
            _this.endTime = data.endDate;  
            _this.startDate = data.startDate;  
            _this.contactName = data.contactName;    // 企业名字
            _this.contacephone = data.contactPhone;    // 企业电话
            _this.injumpprice = data.biddingRule.minJumpPrice;   // 跳价
            _this.injumpquantity = data.minJumpQuantity;   //  增长数量
            if(_this.auctnum == ''){
              _this.auctnum = data.startQuantity;   // 竞拍数量
            }
            _this.number = data.startQuantity;  // 默认起拍数量
            _this.sum = data.quantity;  // 拍卖总数
            if(data.maxBiddingPrice != null){
              _this.evenprice = data.maxBiddingPrice;  // 默认起拍价格
            }else{
               _this.evenprice = data.startUnitPrice;
            }
            _this.countdown = data.biddingRule.countdownTime;
            _this.auctprice = _this.evenprice ;   // 起拍价

            if(_this.evenprice  >= _this.toauctprice){
               _this.toauctprice = _this.evenprice + _this.injumpprice;  // 出价
            }
            var deposit =(data.quantity/1)*( data.startUnitPrice/1)*( data.biddingRule.deposit)/100;   // 保证金
            if(deposit >= 5000){
              _this.deposit = 5000;
            }else if(deposit<5000){
              _this.deposit = deposit;
            }

            _this.$store.state.cash =  _this.deposit;

        })
        .catch(error => console.log(error))
      }else{

      }
     
    },
    // 倒计时
    timeDown () {
        var re = new RegExp("-", "g");  
        this.endTime  = this.endTime.replace(re, "/");
        this.startDate  = this.startDate.replace(re, "/");
        this.nowDate  = this.nowDate.replace(re, "/");
        const endTime = parseInt(new Date(this.endTime).getTime()/1000);
        const startDate =parseInt(new Date(this.startDate).getTime()/1000);
        var nowTime = parseInt(new Date(this.nowDate).getTime()/1000);
        if(endTime < nowTime){
          this.time = '00天00小时00分00秒';
          this.disablesub = true;
          this.willtaktime = true;
          this.ablesub = false;
          this.ontaking = true;
          this.remain = '产品竞价结束',
          clearInterval(this.setime);
        }else{
           if(startDate > nowTime){
            var tempTime = startDate - nowTime;
            if(tempTime == 0){
              this.willtaking = true;
              this.willtaktime = true;
              this.isuntaking = false;
              this.isuntaking = false;
              this.islogincash();
            }
          }else if(endTime > nowTime){
            this.willtaktime = true;
            this.isuntaking = false;
            var tempTime = endTime - nowTime;
          }
          if(tempTime > 0){
            var day = parseInt(tempTime / 60 / 60 / 24);
            var hour = parseInt(tempTime  / 60 / 60 % 24);
            var minute = parseInt(tempTime / 60 % 60);
            var seconds = parseInt(tempTime % 60);
            day<10 ? day = '0'+day:day=day;
            hour<10 ? hour = '0'+hour:hour=hour;
            minute<10 ? minute = '0'+minute:minute=minute;
            seconds<10 ? seconds = '0'+seconds:seconds=seconds;
            this.time = day+'天' + hour+'时' + minute+'分' + seconds + '秒';
          }
        }
   },
    // 热门拍卖
    looker(){
      var _this = this;
      this.axios.get("bidding/product/hot")
      .then(function(data){
          _this.hotlist = data;
          console.log(data,'d');
          _this.hotlistid = data.biddingProductId;
          _this.transform(data)
         console.log(_this.hotlist,'11dfa');
         setInterval(()=>_this.transform(_this.hotlist), 60 * 1000);
      })
      .catch(error => console.log(error))
    },
     transform(data = []) {
      data.forEach(item => {
        var re = new RegExp("-", "g");  
        item.endDate  = item.endDate.replace(re, "/");
        item.nowDate  = item.nowDate.replace(re, "/");
        var endDate = new Date(item.endDate).getTime();
        var nowtime = new Date(item.nowDate).getTime();
        if(endDate > nowtime){
          var time_distance =  endDate - nowtime;
          this.intday = Math.floor(time_distance/86400000);  // 天
          time_distance -= this.intday * 86400000;
          this.inthour = Math.floor(time_distance/3600000);  // 时
          time_distance -= this.inthour * 3600000;
          this.intmin = Math.floor(time_distance/60000);  // 分钟
          if(this.intday < 10){
            this.intday = '0'+ this.intday;
          }
          if(this.inthour < 10){
            this.inthour = '0'+ this.inthour 
          }
          if(this.intmin < 10){
            this.intmin = '0' + this.intmin 
          }
          item.updateStr = this.intday+'天' + this.inthour + '时' + this.intmin + '分';
        }else{
           item.updateStr = '00天00时00分'
        }
      });
      return data;
    },
    //  围观
    hotlooker(){
      this.axios.get("bidding/product/onlooker?id=" +this.$route.query.id)
      .then(function(data){
      })
      .catch(error => console.log(error))
    },  

    chpag(val){
        this.pageNo = val;
        this.taking()
     },
     // 出价记录
    taking(){
      var _this = this;
      this.axios.get("bidding/record/list?size=6&current="+ this.pageNo + '&biddingProductId=' + this.$route.query.id)
      .then(function(data){
          _this.loading = false;
          _this.takinglist = data.records;
          _this.total = data.total;

      })
      .catch(error => console.log(error))
     
     },

     surebtn(){
      if(this.agree == false){
        this.toread = true;
      }else{
        this.centerDialogVisible = false;
        this.$router.push('/cash?id='+this.$route.query.id)
      }
     },

     // 竞拍数量
     buynum(num){
        if(num == 1){
          if(this.auctnum >= this.sum){
            this.auctnum = this.sum; 
          }else if(this.auctnum <= this.sum){
            this.auctnum += this.injumpquantity;
            if(this.auctnum > this.sum){
              this.auctnum = this.sum;
            }
          }
        }else if(num == 2){
          if(this.auctnum == this.number ){
            this.auctnum = this.number;
          }else if(this.auctnum > this.number){
            this.auctnum -= this.injumpquantity;
            if(this.auctnum/1 < this.number/1){
              this.auctnum = this.number
            }
          }
        }
     },
     // 出价
     price(type){
      if(type == 1){
        this.toauctprice += this.injumpprice;
      }else if(type == 2){
         if(this.toauctprice == this.evenprice+ this.injumpprice){
            this.toauctprice = this.evenprice + this.injumpprice;
          }else if(this.toauctprice > this.evenprice){
             this.toauctprice -= this.injumpprice;
          }
      }
     },

       // 是否缴纳保证金
  paycash(){
      var that = this;
      if(this.token){  // 是否登录
         this.ids = storage.get("id");
          this.axios.get("customer/" + this.ids)    // 是否认证
          .then(function(data) {
            console.log(data,'d');
            that.pdcom = data;
            if(that.pdcom.status == 'SUCCESS'){
              that.isaddcash();
              if(!that.ispass){
                that.centerDialogVisible = true;   // 教过保证金显示出价

              }
              that.centerDialogVisible = true;
            } else if(that.pdcom.status != 'SUCCESS') {
              that.$alert('请到企业中心完善信息', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
                }).then(() => {
                  that.$router.push('/companycenter/myfirm')
                }).catch(() => {

                });
            }
          });
      }else{
        this.isLogin = true;
        this.willtaking = true;
        this.ontakong = false;
        this.listtaking = true;
      }
    },
    isaddcash(){
      var that = this;
      if(this.token){
        that.axios.get("bidding/product/check?id="+ that.urlid)      // 是否交保证金
        .then(function(data){
          if(data.code == -1){
            return;
          }else{
            that.ispass = data.pass;
            
            if(data.pass == false){      // 未交保证金显示缴纳保证金
              that.willtaking = true;
              that.listtaking = true;
              
            }else{
              that.willtaking = false;
              that.ontaking = true;
              that.ontaling = true;
              that.listtaking = true;
              that.ablesub = true;
            }
          }
        })
        .catch(error => console.log(error))
      }else{
        that.willtaking = true;
     
      }
      
    },
    islogincash(){
      if(this.token){
        this.isaddcash();
      }
    },

     // 最终出价

    submitinf(){
      var that = this;
        that.axios.get("bidding/product/info?id=" + that.$route.query.id)
        .then(function(data){
          console.log(data,'reset');
          that.newprice = data.maxBiddingPrice;
          if(that.newprice == that.evenprice){
            that.evenprice = that.newprice
          }else if(that.newprice >= that.evenprice){
            that.evenprice = that.newprice;
            that.$alert('当前价格发生变化,请重新出价', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
            });
            that.taking();
          }
        })
          // 出价
        that.axios.post("bidding/product/bid", {
           "biddingProductId": that.urlid,
            "biddingQuantity": that.auctnum,
            "biddingPrice": that.toauctprice
          },{params:{noInterceptor: 1}}).then((res) => {
            if(res.code == 0){
              that.$alert('出价成功', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success',
              }).then(() => {
                that.taking();
                that.auctList();
              })
            }else if(res.code == 500){
              this.remin = res.data
            }
           
        })
         
    
     },
     //  热门拍卖
     hotproduct(index){
       var routeData = this.$router.resolve({ path: 'auctiondetail', query: { id:$(this.$refs.hots[index]).attr('data') } });
       window.open(routeData.href, '_blank')
     }
  },
 
}
