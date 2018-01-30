import { getProductListByParams, getCompanyList,getBannerList,getExpertList } from "@/api/api";

export default  {
  name: 'case-2',
  components: {}, 
  props: [],
  data () {
    return {
      companyList:[], // 公司
      banner:[],// 轮播
      expertList:[] //专家
    }
  },
  computed: {

  },
  created () {
    this._getCompanyList();
    this._bannerList();
    this._expertList();
    this._getProductList();
  },
  mounted () {

  },
  methods: {
      // 异步调取数据
    _getProductList() {
      getProductListByParams({}).then(res => {
        this.tableData = res.data.slice(0,6);
      })
    },
    // 专家数据
    _expertList(){
      getExpertList({}).then(res=>{
        console.log(res.data);
         this.expertList = res.data;
      })
    },  
    _bannerList(){
       let params = {
        params:{}
      }
      getBannerList(params).then(data=>{
        console.log(data)
         this.banner = data;
      })
    },
    // 调取首页公司数据
    _getCompanyList(){
      let params = {
        params:{}
      }
      getCompanyList(params).then(data=>{
        this.companyList = data;
      });
    }
  }
}
