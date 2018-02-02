//import axios from 'axios';

export default {
  name: 'orderlist',
  components: {}, 
  props: [],
  data () {
    return {
      urlid:'',
      orderList:[],
      sendway:'',
      sendwayscop:'',
      orderName:'',
      payMethod:'',
      payMethodscop:'',
      gradeinfo:'',

    }
  },
  created(){
    console.log(234234);
    this.urlid = this.$route.query.id;
    this.selectChange();
    this.gradeinfo = this.$util.getCodeMap("GRADE");
    // this.gradeinfo = JSON.parse(localStorage.gradeinfo);
  },
  computed: {

  },
  mounted () {
  },
  methods: {
    // 获取牌号名
    getPhName(code) {
      let name = '';
      this.gradeinfo.some(v => {
        if (v.dictCode === code) {
          name = v.dictName;
        }
      })
      return name;
    },
     selectChange() {
      var that = this;
      this.axios.get(`order/${this.urlid}`).then(res => {
        if (typeof res !== 'string') {
          console.log(res)
          that.orderList = [res.order];
          that.sendwayscop = res.order.shippingMethod.desc;
          that.payMethodscop = res.order.paymentMethod.desc;
          that.orderName = this.getPhName(that.orderList[0].items[0].gradeCode);
          // if(that.sendway.value == 0 ){
          //   that.sendwayscop = '配送 '
          // }else  if(that.sendway.value == 1 ){
          //   that.sendwayscop = '自提 '
          // }
          // if(that.payMethod.value == 0 ){
          //   that.payMethodscop = '先款后货 '
          // }else  if(that.payMethod.value == 1 ){
          //   that.payMethodscop = '货到付款 '
          // }
        }
      });
    },
    watchorder(){
     this.$router.push({path: '/companycenter/toaudited?id=' +this.urlid});
    }
  }
}
