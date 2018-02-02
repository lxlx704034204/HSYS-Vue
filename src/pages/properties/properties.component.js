export default {
  name: 'properties',
  components: {},
  props: [],
  data() {
    return {
      total: 0,
      pageSize: 10,
      pageNum: 1,
      kindData: [],
      ficatLen: 11,
      ficatLens: 11,
      // 级别
      rtrank: [],
      rtranktwo: [],
      rtrankData: [],
      rtrank2: [],
      rtranktwo2: [],
      rtrankData2: [],
      // 特性作用
      features: [],
      featLen: 8,
      featLens: 8,
      // 数据暂存
      stagdata: {
        btnUse: [],
        btnPro: [],
        btnFea: []
      },
      // 详细数据
      // tableData: [],
      tableDatas: [],
      // 搜索传参
      params: {
        useCateDetailCodes:'',  // 用途
        craftCateDetailCodes:'',  //加工
        specialCateDetailCodes:'',  // 特性
        productSign: '',
        meltmin: '',  // 熔指
        meltmax: '',
        pullupmin: '',
        pullupmax: '',
        bendmin: '',
        bendmax: '',
        impactmin: '',
        impactmax: '',
       
      },
    }
  },
  created() {
    // this.$store.state.headerType = 1;
    this.$store.commit("switchHeaderType", 1);
  },
  mounted(){
    this._getProList();
    this._getPropertRank();
  },
  computed: {
  },
  methods: {
    // 级别数据接口
    _getPropertRank() {
      var that = this;
      this.axios.get( "baseproprankdetail/findproprankdetail")
      .then(function(data){
           console.log(data,'009');
          that.rtrankData = data.purposelevel;
          that.rtrankData2 = that.rtrankData.slice(0, that.ficatLen);
          that.rtranktwo = data.processlevel;
          that.rtranktwo2 = that.rtranktwo.slice(0, that.ficatLen);
          that.rtrank = data.characterlevel;
          that.rtrank2 = that.rtrank.slice(0, that.ficatLen);
      })
    },


    // 用途级别点击更多
    showMoreR() {
      this.rtrankData2 = this.rtrankData;
    },
    // 用途级别点击隐藏
    hideMoreR() {
      this.rtrankData2 = this.rtrankData.slice(0, this.ficatLen);
    },

    // 加工级别点击更多
    showMoreT() {
      this.rtranktwo2 = this.rtranktwo;
    },
    // 加工级别点击隐藏
    hideMoreT() {
      this.rtranktwo2 = this.rtranktwo.slice(0, this.ficatLen);
    },

    // 特性点击更多
    showMoreF() {
      this.rtrank2 = this.rtrank;
    },
    // 特性点击隐藏
    hideMoreF() {
      this.rtrank2 = this.rtrank.slice(0, this.ficatLen);
    },


    // 模糊搜索
    likeSearch() {
      this._getProList();
    },

    // 全部产品
    allproduct(){
      this.pageNum = 1;
      this.params.useCateDetailCodes ='';
      this.params.craftCateDetailCodes ='';
      this.params.specialCateDetailCodes ='';
      this.stagdata.btnUse = [];
      this.stagdata.btnPro = [];
      this.stagdata.btnFea = [];
      this._getProList();
    },
    // 清空
    emptySearch() {
      this.params.productSign = ""
      this.params.meltmin = ""
      this.params.meltmax = ""
      this.params.pullupmin = ""
      this.params.pullupmax = ""
      this.params.bendmin = ""
      this.params.bendmax = ""
      this.params.impactmin = ""
      this.params.impactmax = ""
      this.likeSearch()
    },

    // 筛选条件添加
    kindBtn(type, item) {
      this.pageNum = 1;
      if (type === 2) {
        if (this.stagdata.btnUse.indexOf(item) == -1) {
          console.log(item);
          this.params.useCateDetailCodes =  encodeURI(item.rankDetailName);
          this.stagdata.btnUse=[];
          this.stagdata.btnUse.push(item);
        }
      } else if (type === 3) {
        if (this.stagdata.btnPro.indexOf(item) == -1) {
          this.params.craftCateDetailCodes = encodeURI(item.rankDetailName);
          this.stagdata.btnPro=[];
          this.stagdata.btnPro.push(item);
        }
      } else if (type === 4) {
        if (this.stagdata.btnFea.indexOf(item) == -1) {
          this.params.specialCateDetailCodes =  encodeURI(item.rankDetailName);
          this.stagdata.btnFea = [];
          this.stagdata.btnFea.push(item);
        }
      }
      this._getProList()
    },
    //  清空筛选条件
    removeFilter(type, data) {
      if (type === 2) {
        this.params.useCateDetailCodes =='';
        for (var i = 0; i < this.stagdata.btnUse.length; i++) {
          if (this.stagdata.btnUse[i] == data) {
            this.stagdata.btnUse.splice(i, 1);
          }
        }
      } else if (type === 3) {
        this.params.craftCateDetailCodes='';
        for (var i = 0; i < this.stagdata.btnPro.length; i++) {
          if (this.stagdata.btnPro[i] == data) {
            this.stagdata.btnPro.splice(i, 1);
          }
        }
      } else if (type === 4) {
        this.params.specialCateDetailCodes = '';
        for (var i = 0; i < this.stagdata.btnFea.length; i++) {
          if (this.stagdata.btnFea[i] == data) {
            this.stagdata.btnFea.splice(i, 1);
          }
        }
      }
      this._getProList()
    },

    // 产品列表数据
    _getProList() {
      var _this = this;
       this.axios.get( "baseproduct/findbaseproductbycondition?useCateDetailNames=" +  this.params.useCateDetailCodes + "&craftCateDetailNames=" + this.params.craftCateDetailCodes + "&specialCateDetailNames=" + this.params.specialCateDetailCodes + '&productSign='+ this.params.productSign + '&meltmin='+this.params.meltmin+'&meltmax='+ this.params.meltmax + '&pullupmin='+ this.params.pullupmin+  '&pullupmax='+ this.params.pullupmax+'&bendmin='+ this.params.bendmin+'&bendmax='+ this.params.bendmax+'&impactmin='+ this.params.impactmin+'&impactmax='+ this.params.impactmax+'&size=10'+'&current='+ this.pageNum)
      .then(function(data){
            _this.tableDatas = data.records;
              _this.pageNum = data.current;
              _this.total = data.total;
      })
    },

    //表格点击
    tableClick(row) {
       var routeData = this.$router.resolve({ path: '/properties/propertDetail', query: { id: row.id } });
       window.open(routeData.href, '_blank')
    },

    // 分页
    pageChange(num) {
      this.pageNum = num
      this._getProList()
    },
    // 上一页
    prevPage() {
      this.pageNum--
      if (this.pageNum === 0) {
        this.pageNum = 1
        return
      }
    },
    // 下一页
    nextPage() {
      this.pageNum++
      if (this.pageNum === this.total / this.pageSize) {
        this.pageNum = this.total / this.pageSize
        return
      }
    }
  }
}
