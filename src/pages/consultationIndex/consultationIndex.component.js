import { getExpertList, getProblemList } from "@/api/api";
export default {
  name: 'consultation-index',
  components: {}, 
  props: [],
  data () {
    return {
      problemList:[],
      consultationUser:'',
      total: 200,
      pageSize: 10,
      pageNum: 1,
    }
  },
  computed: {

  },
  created () {
    this._getProblemList();
    this._getExpertList();
  },
  mounted () {

  },
  methods: {
    _getProblemList() {
      let params = {
        params: {}
      }
      getProblemList(this.params).then(res => {
        this.problemList = res.data;
      })
    },
    //专家数据
    _getExpertList() {
      let params = {
        params: {}
      }
      getExpertList(this.params).then(res => {
        this.consultationUser = res.data.slice(0, 1);
      })
    },
    // 分页
    pageChange(num) {
      this.pageNum = num
      this.getProblemList()
    },
    // 上一页
    prevPage() {
      this.pageNum--
      if (this.pageNum === 0) {
        this.pageNum = 1
        return
      }
      this.getProblemList()
    },
    // 下一页
    nextPage() {
      this.pageNum++
      if (this.pageNum === this.total / this.pageSize) {
        this.pageNum = this.total / this.pageSize
        return
      }
      this.getProblemList()
    }
  }
}
