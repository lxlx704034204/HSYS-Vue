export default {
  name: 'company',
  components: {},
  data() {
    return {
      pageNo: 1,
      pageSize: 12,
      pageSizesList: [10, 15, 20, 30, 50],
      total: 1, //数据的总数,
      cominf: [],
      goodinf: [],
      descrip: '',
      userId: '',
      cp:false,
    }
  },
  created() {
    // this.$store.state.headerType = 5;
    this.$store.commit("switchHeaderType", 5);
    var that = this;
    this.userId = this.$route.query.userId;
    //  企业详细信息
    this.axios.get("customer/detail/" + this.userId)
      .then(function (data) {
        that.cominf = data;
        that.descrip = that.cominf.description;
      });
    //  用户产品
    this.conpanylist();

  },

  methods: {
    conpanylist() {
      var that = this;
      this.axios.get("customerproduct/all?size=12&user_id=" + this.userId + '&current=' + this.pageNo)
        .then(function (data) {
          if (data == '没有数据') {
            that.goodinf = [];
            that.pageSize = 1;
            that.total = 0;
            that.cp = true;
          } else {
            that.goodinf = data.records;
            that.total = data.total;
            that.pageSize = data.size;
          }
        });
    },
    // 分页
    pageChange(num) {
      this.pageNo = num;
      this.conpanylist();
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
        if (this.pageNum === this.total / this.pageSize) {
          this.pageNum = this.total / this.pageSize
          return pageNum
        }
    },
  }
}
