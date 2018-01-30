import storage from "store2";
export default {
  name: 'cash',
  components: {},
  props: [],
  data() {
    return {
      havemoney:'',
      phone:'',
      btntxt: "获取验证码",
      time: 0,
      disabled: false,
      remind:'',
      remind2:'',
      cashmoney:'',
      cashForm: {
          money:'',
      },
      voidcode:'',
      rules: { 
        money: [
        
        ],

      }
    };
  },
  created() {
    var urlId = this.$route.path;
    if (urlId.indexOf('cash') > 0) {
      this.$store.state.headerType = 10;
    }
    this.residue();
    this.cashmoney = this.$store.state.cash;
    this.cashForm.money = this.$store.state.cash;
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    addcash(){
      this.$router.push('/recharge')
    },
    // 账户余额
    residue(){
      this.axios.get('account/with').then((res) => {
        console.log(res,'ll'); 
         this.havemoney = res.avaliableAmount ;
         this.phone = res.phone ;
      })
    },
    // 获取验证码
    voidcodes(){
        var that = this;
        this.axios.post("msg/sendVerificationCode", {
          bizType: "OTHER",
          phones: [that.phone],
          }).then((res) => {
            that.time = 60;
            that.disabled = true;
            that.timer();
        })
      
    },
    timer() {
      if (this.time > 0) {
        this.time--;
        this.btntxt = this.time + "s后重新获取";
        setTimeout(this.timer, 1000);
        console.log($(this.$refs.codebtn));
        $('.havecode').css('border','#D1D1D1 1px solid');
        $('.havecode').css('background','#D1D1D1');
        
      } else {
        this.time = 0;
        this.btntxt = "获取验证码";
        this.disabled = false;
        $('.havecode').css('background','#009FE2');
        $('.havecode').css('border','#009FE2 1px solid')
        
      }
    },
    changecode(){
      if(this.voidcode == ''){
        this.remind2 = '请输入验证码';
      }else{
        this.remind2 = '';
      }
    },
    topay(){
      var that = this;
      if(that.voidcode == ''){
        that.remind2 = '请输入验证码'
      }else{
         this.axios.post("bidding/deposit/add", {
            "biddingProductId": that.$route.query.id,
            "deposit": that.cashForm.money,
            "verifyCode": that.voidcode,
            "mobileNumber": that.phone,
            }).then((res) => {
              console.log(res);
              if(res == null || res == undefined){
                that.$alert('保证金缴纳成功，请返回竞价专区出价', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'success',
                }).then(() => {
                  that.$router.push('auctiondetail?id='+ that.$route.query.id)
                })
              }else{
                that.remind2 = res;
              }
             
             
          })
        }
      }
     
  }
}
