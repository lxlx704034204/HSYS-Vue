import axios from 'axios';
export default  {
  name: 'case-1',
  components: {},
  props: [],
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  created() {
    console.log("case1 init...");
    axios.get('http://localhost:3000/sy_shop/api/index.do')
      .then((res) => {
        // console.log(res)
        this.tableData = res.data.seller.productList.data;
      })
  },
  computed: {

  },
  mounted() {
    console.log(999, this);
  },
  methods: {
    // 处理操作
    cellActionFormatter() {
      return '自定义内容';
    },
    // 处理升了，还是降了
    updownFormatter() {
      console.log('updown info: ', this, arguments);
    },

    // 定制更新时间头部
    renderHeaderUpdateTime() {
      console.log(arguments);
      return '时间时间'
    }
  }
}
