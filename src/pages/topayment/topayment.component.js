
import axios from 'axios';
export default {
  name: 'topayment',
  components: {}, 
  props: [],
  data () {
    return {
      orderTable: [],
      datatime:[],
      userid: "",
      admin: '',
      orderid: '',
      orderTime: '',   // 订单提交时间
      audittime: '', //审核时间
      confirmationtime: '',// 确认时间
      addName: '',   // 收货人姓名
      event: '',   // 备注
      addphone: '',
      address: '',   // 收货地址
      payinfo: '',   // 付款方式
      abbtype: '',   // 发票类型
      shipMethod: '',   // 配送方式
      paytitle: '',  // 公司抬头
      bizcode: '',   // 信用代码
      totalmoney: '',  // 应付金额
      io: localStorage.kubeinfo, //库别
      dw: "", //单位
      cd: "", //产地
      ph: "", //牌号
      sm: "", //交货方式
    }
  },
  computed: {

  },
  created(){
    this.orderid = this.$route.query.id;
    this.orderInf();

    //库别
    this.io = JSON.parse(this.io);
    //单位
    this.dw = JSON.parse(localStorage.unitinfo);
    //产地
    this.cd = JSON.parse(localStorage.producingareainfo);
    //牌号
    this.ph = JSON.parse(localStorage.gradeinfo);
    //交货方式
    this.sm = JSON.parse(localStorage.shipping_methodinfo)
  },
  mounted () {

  },
  methods: {
    orderInf() {
      var that = this;
      $.ajax({
        url: baseURL + 'order/' + this.orderid,
        headers: {
          token: sessionStorage.token
        },
        type: 'get',
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
          if (data.code == 0) {
            if (data.data != "") {
              that.datatime = data.data.events;
              // console.log(that.datatime.length,1111)
              for(var i=0;i<that.datatime.length;i++){
                if(that.datatime[i].orderEvent.value == "create"){
                  that.orderTime =that.datatime[i].createDate
                }else if(that.datatime[i].orderEvent.value == "audit"){
                  that.audittime =that.datatime[i].createDate
                }else if(that.datatime[i].orderEvent.value == "confirm"){
                  that.confirmationtime =that.datatime[i].createDate                  
                }
              }
              that.addName = data.data.address.userName;
              that.number = data.data.order.orderCode;
              that.event = data.data.events[0].remark;
              that.addphone = data.data.address.primaryPhone;
              that.address = data.data.address.address;
              that.orderTable = [data.data.order];
              that.userid = data.data.order.items[0].sku.userId;
              if (data.data.order.paymentMethod.value == 0) {
                that.payinfo = '款到发货'
              } else {
                that.payinfo = '货到付款'
              }
              if (data.data.order.shippingMethod.value == 0) {
                that.shipMethod = '配送'
              } else {
                that.shipMethod = '自提'
              }
              that.abbtype = data.data.order.shippingPaymentMethod.desc;   // 发票
              that.paytitle = data.data.address.companyName;  // 发票抬头
              that.bizcode = data.data.user.attributes[1].bizCreditCode;  // 信用代码
              that.totalmoney = data.data.order.total;
              $.ajax({
                url: baseURL + 'sys/user/' + that.userid,
                headers: {
                  token: sessionStorage.token
                },
                type: 'get',
                contentType: "application/json",
                dataType: 'json',
                success: function (data) {
                  console.log(data)
                  that.admin = data.data.nick;
                }
              })
            }
          } else {

          }
        }
      })
    },
  }
}
