export default {
  name: 'toaudited',
  components: {},
  props: [],
  data() {
    return {
      orderTable: [],
      userid: "",
      admin: '',
      orderid: '',
      orderStatus: '',
      step: 0,
      orderTime: '', // 订单提交时间
      audittime: '',
      querytime: '',
      paymenttime: '',
      deliverytime: '',
      signingtime: '',
      addName: '', // 收货人姓名
      event: '', // 备注
      addphone: '',
      address: '', // 收货地址
      payinfo: '', // 付款方式
      payinfovalue: '', //付款方式value 0-先款后货 1-货到付款
      abbtype: '', // 发票类型
      shipMethod: '', // 配送方式
      paytitle: '', // 公司抬头
      bizcode: '', // 信用代码
      totalmoney: 0, // 应付金额
      paymentInfo: {}, // 付款凭证图
      paymentStatus: false, // 付款状态
      number: '',
      io: '', //库别
      dw: "", //单位
      cd: "", //产地
      ph: "", //牌号
      sm: "", //交货方式
      orderExpireConfirm: '', //订单几分钟不确认失效
      orderExpirePay: '', //订单几分钟不付款失效

      //签署合同相关
      centerDialogVisible: false,
      toread:false,
      agree:false,
    }
  },
  computed: {

  },
  created() {
    this.orderid = this.$route.query.id;
    this.orderInf();
    this.getSystem();
    this.io = this.$util.getCodeMap("KUBE");
    this.dw = this.$util.getCodeMap("UNIT");
    this.cd = this.$util.getCodeMap("PRODUCINGAREA");
    this.ph = this.$util.getCodeMap("GRADE");
    this.fs = this.$util.getCodeMap("SHIPPING_METHOD");

  },
  updated() {
    $(this.$refs.downfile).attr('href', $(this.$refs.imgfalse).attr('src'));
  },
  methods: {
    //同意电子合同
    surebtn() {
      if (this.agree == false) {
        this.toread = true;
      } else {
        this.centerDialogVisible = false;
        // this.$router.push('/cash?id=' + this.$route.query.id)
        this.axios.post('order/' + this.orderid + "/confirm").then((res) => {
          if (typeof res !== 'string') {
            this.orderInf();
          }
        }).catch(function (response) {
          // console.log(response);//发生错误时执行的代码  
        });
      }
    },
    orderInf() {
      var that = this;
      this.axios.get('order/' + this.orderid).then(function (res) {
        if (typeof res !== 'string') {
          // that.orderTime = res.order.createDate;
          that.datatime = res.events; // 进度时间
          res.events.map(v => {
            if (v.orderEvent.value === "create") that.orderTime = v.createDate;
            if (v.orderEvent.value === "audit") that.audittime = v.createDate;
            if (v.orderEvent.value === "confirm") that.querytime = v.createDate;
            if (v.orderEvent.value === "payment") that.paymenttime = v.createDate;
            if (v.orderEvent.value === "deliver") that.deliverytime = v.createDate;
            if (v.orderEvent.value === "receive") that.signingtime = v.createDate;
          })
          that.addName = res.address.userName;
          that.number = res.order.orderCode;
          that.addphone = res.address.primaryPhone;
          that.address = res.address;
          that.orderTable = [res.order];
          that.userid = res.order.items[0].sku.userId;
          that.orderStatus = res.order.orderStatus.desc;
          that.payinfo = res.order.paymentMethod.desc;
          that.payinfovalue = res.order.paymentMethod.value;
          that.paytitle = res.user.customer.name; // 发票抬头
          res.user.attributes.some(rep => {
            if (rep.group === "CUSTOMER_BUSINESS") {
              that.bizcode = rep.bizCreditCode
            } // 信用代码
          })
          //判断付款状态
          if (res.order.paymentStatus === 'YES') {
            that.paymentStatus = true;
          }else {
            that.paymentStatus = false;
          }
          if (res.payments == null) {
            that.paymentInfo = '';
          } else {
            that.paymentInfo = JSON.parse(res.payments[res.payments.length - 1].paymentInfo)
          };
          //如果是货到付款的进度处理
          that.step = res.order.orderStatus.value;
          if (that.payinfovalue == '1'){
            if (that.step == 4) that.step = 3;
            if (that.step == 5) that.step = 4;
            if (res.order.orderStatus.value == 3 && res.order.orderStatus.desc == '待支付') that.step = 5;
          }
          //如果是先款后货的进度处理
          // else {
          //   if (that.step == 3) that.step = 4;
          // }
          that.shipMethod = res.order.shippingMethod.desc;
          // that.bizcode = res.user.attributes[res.user.attributes.length-1].bizCreditCode;  
          that.totalmoney = res.order.total;
          that.abbtype = res.order.shippingPaymentMethod.desc; // 发票结算方式
          that.event = res.order.remark; //备注
          that.axios.get('sys/user/' + that.userid)
            .then(function (response) {
              if (response) {
                that.admin = response.nick;
              }
            })
        }
      })
    },
    // 取消订单
    del() {
      console.log(this.orderid)
      this.axios.post(baseURL + 'order/' + this.orderid + '/cancel').then((res) => {
        this.orderInf();
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 确认订单
    confirm() {
      this.centerDialogVisible = true;
      // this.axios.post('order/' + this.orderid + "/confirm").then((res) => {
      //   if (typeof res !== 'string') {
      //     this.orderInf();
      //   }
      // }).catch(function (response) {
      //   // console.log(response);//发生错误时执行的代码  
      // });
    },
    // 确认收货
    confirmReceived() {
      console.log(11111111);
      this.axios.post(baseURL + 'order/' + this.orderid + "/receive").then((res) => {
        console.log(res);
        if (typeof res !== 'string' && !res) {
          this.orderInf();
        }
      }).catch(function (response) {
        console.log(response); //发生错误时执行的代码  
      });
    },
    //获取系统配置
    getSystem() {
      var that = this;
      this.axios.get('platform/config').then((res) => {
        if (res) {
          if (res.orderExpireConfirm / 60 >= 1) {
            that.orderExpireConfirm = Math.floor(res.orderExpireConfirm / 60) + '小时';
          } else {
            that.orderExpireConfirm = res.orderExpireConfirm + '分钟';
          }
          if (res.orderExpirePay / 60 >= 1) {
            that.orderExpirePay = Math.floor(res.orderExpirePay / 60) + '小时';
          } else {
            that.orderExpirePay = res.orderExpirePay + '分钟';
          }
        }
      }).catch(function (response) {
        console.log(response); //发生错误时执行的代码  
      });
    },
    // 获取牌号名
    getPhName(code) {
      let name = '';
      this.ph.some(v => {
        if (v.dictCode === code) {
          name = v.dictName;
        }
      })
      return name;
    },
    // 获取单位
    getDwName(code) {
      console.log(this.dw);
      let name = '';
      this.dw.some(v => {
        if (v.dictCode === code) {
          name = v.dictName;
        }
      })
      return name;
    },
    // 获取库别
    getIoName(code) {
      let name = '';
      this.io.some(v => {
        if (v.dictCode === code) {
          name = v.dictName;
        }
      })
      return name;
    },
    // 获取产地
    getCdName(code) {
      let name = '';
      this.cd.some(v => {
        if (v.dictCode === code) {
          name = v.dictName;
        }
      })
      return name;
    },
  }
}
