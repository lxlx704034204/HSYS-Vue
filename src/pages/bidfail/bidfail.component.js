
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
      sumprice:'',
      phnumber:'',
      warhouse:'',
      unitint:'',
      manu:'',
      ids:'',
    }
  },
  computed: {

  },
  created() {
    this.failList();
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
  },
  mounted() {

  },
  methods: {
    failList(){
      var that = this;
       this.axios.get("bidding/record/info?id="+this.$route.query.id + '&date='+ new Date().getTime() )
       .then(function (data) {
        console.log(data,'9');
          that.status = data.biddingStatus.desc;
          that.productList = [data.sku];
          that.number = data.biddingQuantity;
          that.phnumber = data.sku.product.gradeCode;
          that.warhouse = data.sku.warehouseCode;
          that.unitint = data.sku.unitCode;
          that.manu = data.sku.product.manufacturerCode;
          that.ids = data.id;
      // warhouse:'',
      // unitint:'',
          that.biddingPrice = data.biddingPrice;
          that.sumprice = data.biddingPrice *  that.number ;
      })
        .catch(error => console.log(error))
    }
  }
}
