export default  {
  name: 'myincome',
  components: {}, 
  props: [],
  data () {
    return {
      options: [{
        value: '0',
        label: '收入'
      }, {
        value: '1',
        label: '支出'
      }, {
        value: '2',
        label: '调整'
      }, {
        value: '3',
        label: '冻结'
      }, {
        value: '4',
        label: '解冻'
      }],
      value: '',
      value1: '',
      value9: '',
      pageNum: 1,
      tableData: [],
      total:200,
      pageSize:6,
      option:[],
      incometable:[],
      timevalue:'',
      startTime:'',
      endTiem:'',
      pag:true,
       pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              picker.$emit('pick', [start, end]);
            }
          }]
        },
    }
  },
  computed: {

  },
  created(){
    this._incometable();
  
  },
  mounted () {

  },
  methods: {
    timechange(){
      console.log(this.timevalue,0);
      if(this.timevalue == null || this.timevalue == ''){
        this.startTime = '';
          this.endTime = undefined;
      }else{
          this.startTime = new Date(this.timevalue[0]).getTime()/1000;
          this.endTime = new Date(this.timevalue[1]).getTime()/1000;
          
      }
          this._incometable()
    },
    likeSearch(){
      this._incometable()
    },
    Search(){

    },
    _incometable(){
      var _this = this;
      this.axios.get("accounttrans/page" ,{ params: {
      size: 6,
      current:this.pageNum,
      startTime:this.startTime,
      endTime: this.endTime
    }})
      .then(function(data){
        console.log(data,'aaaaaa');
          _this.incometable = data.records;
          if (data.records.length == 0){
          	_this.pag = false;
          }
          console.log( _this.incometable,'ddd')
          _this.total = data.total;
          
      })
      .catch(error => console.log(error))

    },
     // 分页
     pageChange(num) {
      this.pageNum = num
      this._incometable()
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
