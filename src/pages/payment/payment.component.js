export default {
  name: 'payment',
  components: {},
  props: [],
  data() {
    return {
      tableData: [],
      imageUrl: '',
      bank:'',
      bankName:'',
      bankAddress:'',
      bankAccount:'',
      markCode: '',
      total:'',
      upload:'',
    }
  },
  created() {
    this.$store.state.headerType = 2;
    this.orderid = this.$route.query.id;
    this.orderInf();
    this.information();
    this.upload = baseURL + 'upload'
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    orderInf() {
      var that = this;
      this.axios.get('order/' + this.orderid).then((res) => {
        that.total = res.order.total;
        that.tableData = [res];
        that.markCode = res.order.reserveAttribute2;//付款识别码
        if (res.order.paymentMethod.value == 0) {
          that.payinfo = '款到发货'
        } else {
          that.payinfo = '货到付款'
        }
        if (res.order.shippingMethod.value == 0) {
          that.shipMethod = '配送'
        } else {
          that.shipMethod = '自提'
        }
        that.abbtype = res.order.shippingPaymentMethod.desc;   // 发票
        that.paytitle = res.address.companyName;  // 发票抬头
        that.bizcode = res.user.attributes[1].bizCreditCode;  // 信用代码
        that.totalmoney = res.order.total;
      })
    },
    handleAvatarSuccess(res, file) {
      if(res.code == 0){
        this.imageUrl = res.data.url;
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isGIF = file.type === 'image/gif';
      const isPNG = file.type === 'image/png';
      const isBMP = file.type === 'image/bmp';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.common.errorTip('上传图片必须是JPG/GIF/PNG/BMP 格式!');
      }
      if (!isLt2M) {
        this.common.errorTip('上传图片大小不能超过 2MB!');
      }
      return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
    },

    open() {
      var that =this;
      var data = {
        markCode: that.markCode
      }
      this.axios.post('order/mypay/' + that.orderid + '?markCode='+ that.markCode + '&imageUrl=' + that.imageUrl, data).then((res) => {
          if (!res && typeof res !== "string") {
            that.$alert('提交成功!', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                that.$router.push("/companycenter/myorder")
              }
            });
            // that.$message({ message: '提交成功!', type: 'success' });
            // that.$router.push({ path: '/companycenter/myorder' });
          } else {
            that.$alert(res, '提示', {
              confirmButtonText: '确定',
              type: 'error'
            });
            // that.$message({ message: res, type: 'error' });
          }
      });
    },
    information(){
      this.axios.get('platform/bank').then((res) => {
        this.bank = res.platformBank.bank;
        this.bankName = res.platformBank.bankName;
        this.bankAddress = res.platformBank.bankAddress;
        this.bankAccount = res.platformBank.bankAccount;
        // this.markCode = res.markCode;
      })
    },
    sendinfo(){
      var that = this;
      var datas = {
        markCode: that.markCode,
        money: JSON.stringify(that.total)
      }
      this.axios.post(`msg/send?markCode=${datas.markCode}&money=${datas.money}`).then((res) => {
        console.log(res);
        if (typeof res !== 'string' && !res) {
          that.$alert('付款信息已发送到手机，请注意查收', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
        } else {
          // that.$alert(res, '提示', {
          //   confirmButtonText: '确定',
          //   type: 'warning'
          // })
        }
        
      })
    }
  }
}
