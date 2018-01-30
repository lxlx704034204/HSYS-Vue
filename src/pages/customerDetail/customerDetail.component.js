
import { Custresources} from "@/api/api";
export default {
  name: 'customer-detail',
  components: {}, 
  props: [],
  data () {
    return {
      //接收数据
      Transfer:[],
      custList:[],
      total:400,
      pageSize:10,
      pageNum:1,

       // 条件
       params: {
        // 搜索关键字
        keyword: '',
     
      }
    }
  },
  created () {
    this._dataList();
   
  },
  computed: {

  },
  mounted () {

  },
  methods: {
 // 搜索
 goSearch() {
  this._dataList();
},
   //分页
   pageChange(num){
    this.pageNum=num
    this._dataList()
     },

// 上一页
prevPage(event){
  this.pageNum--
  if(this.pageNum === 0){
    this.pageNum=1;
    console.log(event.currentTarget)
    return 
  }
 
},
// 下一页
nextPage(){
  this.pageNum++
  if(this.pageNum===this.total/this.pageSize){
    this.pageNum=this.total/this.pageSize
    return
  }
 
},

    _dataList(){
      let params = {
        params:{}
      }
      Custresources(params).then(data=>{
       this.custList=data.data.custome_list.slice(0,15)
        this. Transfer=data.data.pany_list
        // console.log(data)
         
      });
    }
  }
}
