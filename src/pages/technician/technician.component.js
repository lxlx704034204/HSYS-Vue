import { getExpertList, gettableData, getbanner} from "@/api/api";
export default {
  name: 'technician',
  components: {},
  props: [],
  data() {
    return {
      tableData: [],
      classification:[],
      technical:[],
      
      //分类列表
      banner : '',// 轮播
      expert: [] ,//专家
      // 条件
      params: {
        // 选择类型
        selectType: 0,
        // 搜索关键字
        keyword: '',
        category: [],
        company: [],
        city: ''
      },
      total: 200,
      pageSize: 10,
      pageNum: 1,
    }
  },
  computed: {

  },
  created() {
    this._gettableData();
    this._getbanner();                                                                          
    this._getExpertList();
  },
  mounted() {

  }, 
  methods: {

    // 选择分类
    selectFilter(type, title) {
      // TODO list
      if (type === 1) { //分类条件
        if(this.params.category.indexOf(title) == -1){
            this.params.category.push(title);
        }
      } else if(type === 2) { // 公司条件
        if(this.params.company.indexOf(title) == -1){
          this.params.company.push(title);
        }
        // this.params.company = title;
      } 
    },
    removeFilter(type,data) {
      if (type === 1) {
        for(var i=0;i<this.params.category.length;i++){
          if(this.params.category[i] == data){
            this.params.category.splice(i,1);
          }
        }
      } else if (type === 2) {
        for(var i=0;i<this.params.company.length;i++){
          if(this.params.company[i] == data){
            this.params.company.splice(i,1);
          }
        }
      }
    },
    // 分类列表数据
    _gettableData() {
      let params = {
        params: {}
      }
      gettableData(this.params).then(res => {
        this.tableData = res.data;
        this.classification = this.tableData.classification;
        this.technical = this.tableData.technical;
      })
    },
    // banner数据
    _getbanner() {
      let params = {
        params: {}
      }
      getbanner(this.params).then(res => {
        this.banner = res.data.ReImg;
      })
    },
    // 专家列表数据
    _getExpertList() {
      let params = {
        params: {}
      }
      getExpertList(this.params).then(res => {
        this.expert = res.data;
      })
    },
    // 搜索
    goSearch() {
      this.expertData();
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
      this.expert()
    },
    // 下一页
    nextPage() {
      this.pageNum++
      if (this.pageNum === this.total / this.pageSize) {
        this.pageNum = this.total / this.pageSize
        return
      }
      this.expert()
    }
  }
}
