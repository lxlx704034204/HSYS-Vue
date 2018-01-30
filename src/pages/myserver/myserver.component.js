import { myservertable } from "@/api/api";
export default  {
  name: 'myserver',
  components: {}, 
  props: [],
  data () {
    return {
      myservertable: [],
      tableData: [],
      option: [],
      value: '',
      value1: '',
      pageNum: 1,
      total:200,
      pageSize:10
    }
  },
  computed: {
  },
  created(){
    this._myservertable();   
  },
  mounted () {
    
  },
  methods: {
    
    likeSearch(){
      this._myservertable()
    },
    _myservertable(){
      let params = {
        params: {}
      }
      myservertable(params).then(res => {
        
        // //收货人信息 orderConsignee
        
        this.myservertable = res.data;
        // console.log(222,res);
        console.log(111,this.myservertable)
        this.tableData=this.myservertable
        // //供应商 orderSupplier
        // this.orderSupplier = res.data.Odata.slice(0,1);
      })
    },
     // 分页
     pageChange(num) {
      this.pageNum = num
      this._myservertable()
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
        if (this.pageNum === this.total / this.pageSize) {
          this.pageNum = this.total / this.pageSize
          return pageNum
        }
      // this._productList()
    }
  }
}
