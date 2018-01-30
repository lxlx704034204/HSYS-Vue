export default {
  name: 'propert-detail',
  components: {}, 
  props: [],
  data () {
    return {
      phyParData: [],
      propeId:'',
      propert:[],
    }
  },
  created () {
    this.propeId= this.$route.query.id;
    this._getDetList();
  },
  computed: {

  },
  mounted () {
    
  },
  methods: {
    // 合并参数信息列表行
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 6 === 0) {
          return {
            rowspan: 6,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    // 详情页数据渲染
    _getDetList(){
      var _this = this;
       _this.axios.get('baseproduct/findbaseproductdetailbyproductid?productId='+this.propeId)
      .then(function(res){
        console.log(res);
             _this.propert=res;
             _this.phyParData=res.baseProductTestDTO
      })
      .catch(function(err){

      })

    }
  }
}
