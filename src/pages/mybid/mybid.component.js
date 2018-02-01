export default {
  name: 'mybid',
  components: {},
  props: [],
  data() {
    return {
      value: '',
      value9: '',
      pageNum: 1,
      total: 0,
      option: '',
      pageSize: 6,
      orderList: [],
      orderLists: [],
      warehouse:'',
      warejson:[],
      unit:'',
      unitjson:[],
    }
  },
  computed: {

  },
  created() {
    this.$store.commit("switchHeaderType", 1);
    this.warehouse = this.$util.getCodeMap("KUBE");    // 库别
    this.unit = this.$util.getCodeMap("UNIT");    // 单位
    var json2 = {};
    this.warehouse.forEach(v => {
      json2[v.dictCode] = v.dictName
    })
    this.warejson = json2;  // 库别

     var json3 = {};
    this.unit.forEach(v => {
      json3[v.dictCode] = v.dictName
    })
    this.unitjson = json3;  // 单位
  },
  mounted() {
    this._orderList();
  },
  methods: {
    likeSearch() {
      this._orderList()
    },
    _orderList() {
      //订单列表
      const that = this;
      this.axios.get("bidding/record/my/list?size=6&current="+ this.pageNum + '&nameOrSkuCode=' + this.value9).then(function (data) {
          console.log(data,'9');
            that.orderLists = data.data;
            that.total = data.total;
            that.pageNum = data.current;
            that.orderList =that.transform(data.records);

      })
        .catch(error => console.log(error))
    },
    transform(data = []){
      data.forEach(item => {
        item.status = item.biddingStatus.desc;

      })
      return data;
    },

    // 分页
    pageChange(num) {
      this.pageNum = num;
      this._orderList();
    },
    // 上一页
    prevPage() {
      this.pageNum--
      if (this.pageNum === 1) {
        this.pageNum = 1
        return pageNum
      }
    },
    // 下一页
    nextPage() {
      this.pageNum++
      if (this.pageNum >= this.total / this.pageSize) {
        this.pageNum = this.total / this.pageSize;
        return pageNum
      }
    },
    findcontent(row){
      if(row.biddingStatus.value == 1){
         this.$router.push('/auctiondetail?id=' + row.biddingProductId);
      }
      if(row.biddingStatus.value == 0 || row.biddingStatus.value== 3 ){
         this.$router.push('/companycenter/bidfail?id=' + row.id)
      }else 
      if(row.biddingStatus.value == 2 || row.biddingStatus.value == 4){
        this.$router.push('/companycenter/bidsuccess?id=' + row.id)

      }
    }
  }
}
