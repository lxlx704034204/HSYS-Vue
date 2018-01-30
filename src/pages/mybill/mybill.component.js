import { billtable } from "@/api/api";
export default  {
  name: 'mybill',
  components: {}, 
  props: [],
  data () {
    return {
      value: '',
      value1: '',
      value9: '',
      pageNum: 1,
      total:200,
      pageSize:10,
      billtable:[],
      tableData: [],
      option:[],
      options: [{
        value: '选项1',
        label: '已开票'
      }, {
        value: '选项2',
        label: '未开票'
      }],
    }
  },
  computed: {

  },
  created(){
    this._billtable();
  
  },
  mounted () {

  },
  methods: {
    filterTag(value, row) {
      return row.tag === value;
    },
    likeSearch(){
      this._billtable()
    },
    _billtable(){
      let params = {
        params: {}
      }
      billtable(params).then(res =>  { 
        this.billtable = res.data;
        // console.log(222,res);
        console.log(111,this.billtable)
        this.tableData=this.billtable
      })
    },
     // 分页
     pageChange(num) {
      this.pageNum = num
      this._billtable()
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
