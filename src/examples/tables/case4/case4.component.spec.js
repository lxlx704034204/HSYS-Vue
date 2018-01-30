// import axios from 'axios';

import { getProductListByParams } from "@/api/api";

export default {
  name: 'case-4',
  components: {},
  props: [],
  data() {
    return {
      tableData: [],
      // 分类数据
      category: ["PP", "PE", "PVC", "ABS", "PS", "AS", "PA", "PC", "茂金属", "EAA", "塑料制品"],
      companies: ['阿里巴巴', '智者天下', '百度网讯', '诺亚方舟', '大庆石化'],
      // cities: ['北京市', '天津市', '河北省', '山西省', '辽宁省', '吉林省', '黑龙江省', '上海市', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '海南省', '重庆市', '四川省', '贵州省', '云南省', '**自治区', '陕西省', '甘肃省', '青海省'],
      cities: ['北京市', '天津市', '河北省', '山西省', '辽宁省', '吉林省', '甘肃省', '青海省'],
      times: 0,
      params: {
        keyword: '',
        // 分类
        category: '',
        // 厂家
        company: '',
        // 城市
        city: '',
        // 交货方式
        sendWay: 0
      },

      // 翻页参数
      total: 0,
      pageNo: 1,
      pageSize: 10
    }
  },
  created() {
    console.log("case1 init...");
    this._productList();
  },
  computed: {

  },
  mounted() {
    console.log(999, this);
  },
  methods: {
    // 抽取复用
    _productList() {
      // let params = {
      //   pageNo: this.pageNo,
      //   pageSize: this.pageSize
      // }

      this.params['pageNo'] = this.pageNo;
      this.params['pageSize'] = this.pageSize;
      console.log(JSON.stringify(this.params));
      // axios.get('http://localhost:3000/sy_shop/api/index.do', {
      //   params: this.params
      // })
      //   .then((res) => {
      //     // console.log(res)
      //     this.tableData = res.data.seller.productList.data;
      //     this.total = res.data.seller.productList.total;
      //   })

      getProductListByParams(this.params).then(res => {
        this.tableData = res.data;
        this.total = res.total;
      })
    },

    // 搜索
    goSearch() {
      this._productList();
    },

    // 过滤函数
    filterItem(type, item) {
      if (type === 1) {// 分类
        this.params.category = item;
      } else if (type === 2) {// 厂家
        this.params.company = item;
      } else {// 交货地
        this.params.city = item;
      }

      this._productList();
    },
    // 删除标签
    removeFilterParam(type) {
      if (type === 1) {// 分类
        this.params.category = '';
      } else if (type === 2) {// 厂家
        this.params.company = '';
      } else {// 交货地
        this.params.city = '';
      }

      this._productList();
    },
    // 选择配送方式
    sendWayChange() {
      console.log(this.times++);
      this._productList();
    },
    haha() {
      console.log(888888);
      console.log(arguments);
    },
    // 上一页
    goPrevPage() {
      this.pageNo--;
      if (this.pageNo === 0) {
        this.pageNo = 1;
        return;
      }
      // this._productList();
    },
    // 下一页
    goNextPage() {
      this.pageNo++;
      if (this.pageNo === (Math.ceil(this.total / this.pageSize))) {
        this.pageNo--;
        return;
      }
      // this._productList();
    },
    // 当前变化页
    currentPageHandler(num) {
      this.pageNo = num;
      this._productList();
    },
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
