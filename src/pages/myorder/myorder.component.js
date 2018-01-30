
export default {
  name: 'myorder',
  components: {},
  props: [],
  data() {
    return {
      value: '',
      pageNum: 1,
      // pageNo: "",
      total: parseFloat("0"),
      option:'',
      pageSize: 5,
      tableData: [],
      orderList: [],
      orderLists: [],
    }
  },
  computed: {

  },
  created() {
    this.$store.state.headerType = 1;
    //牌号
    this.ph = this.$util.getCodeMap("GRADE");
  },
  mounted() {
    this._orderList();
  },
  methods: {
    likeSearch() {
      this._orderList()
    },
    getPhName(code) {
      let name = '';
      this.ph.some(v => {
        if (v.dictCode === code) {
          name = v.dictName;
        }
      })
      return name;
    },

    _orderList() {
      //订单列表
      const that = this;
      var data = {
        current: that.pageNum,
        size: 6,
        orderCode: this.value
      }
      this.axios.get(`order/my`,{params: data}).then(res => {
        that.orderList = res.records;
        that.total = parseFloat(res.total);
        that.pageNum = res.current;
      })
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
      // this._productList()
    },
    // 下一页
    nextPage() {
      this.pageNum++
      if (this.pageNum >= this.total / this.pageSize) {
        this.pageNum = this.total / this.pageSize;
        console.log( this.pageNum)
        return pageNum
      }
      // this._productList()
    },
    details(row) {
      console.log(row.orderStatus);
      this.$router.push({ path: '/companycenter/toaudited', query: { id: row.id } })
      // if (row.orderStatus.desc == "待审核") {
      //   this.$router.push({ path: '/companycenter/toaudited', query: { id: row.id } })
      // }else if(row.orderStatus.desc == "待确认"){
      //   this.$router.push({ path: '/companycenter/todetermined', query: { id: row.id } })        
      // }else if(row.orderStatus.desc == "待发货"){
      //   this.$router.push({ path: '/companycenter/togoods', query: { id: row.id } })        
      // }else if(row.orderStatus.desc == "待支付"){
      //   this.$router.push({ path: '/companycenter/topayment', query: { id: row.id } })        
      // }else if(row.orderStatus.desc == "待收货"){
      //   this.$router.push({ path: '/companycenter/togoods', query: { id: row.id } })        
      // }else if(row.orderStatus.desc == "已签收"){
      //   this.$router.push({ path: '/companycenter/tosigning', query: { id: row.id } })        
      // }else if(row.orderStatus.desc == "已取消"){
      //   this.$router.push({ path: '/companycenter/cancel', query: { id: row.id } })        
      // }
    }
  }
}
