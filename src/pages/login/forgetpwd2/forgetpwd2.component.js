export default {
  data: function () {
    return {
      disabled: false,
      isshow:true,
      time: 0,
      phone: '',
      btntxt: "获取验证码",
      biz: 1,
      verif: '',
      formMess: {
        email: this.email,
        phone: this.phone
      },
      phones: false,
      phonea: "",
      verifs: false,
      verifa: ""
    }
  },
  created() {
    // 调用数据
    var urlId = this.$route.path;
    this.$store.commit("switchHeaderType", 3);
  },
  mounted: function () {

  },
  methods: {
    //验证手机号码部分
    sendcode() {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.phone == '') {
        this.$alert('请先填写手机号码', '提示', {
          confirmButtonText: '确定',
          type: 'error'
        })
      } else if (!reg.test(this.phone)) {
        this.$alert('手机号码格式不正确', '提示', {
          confirmButtonText: '确定',
          type: 'error'
        })
      } else {
        this.time = 60;
        this.disabled = true;
        this.isshow= false,
        this.timer();

        var Msg = {
          bizType: "" + this.biz + "",
          phones: ["" + this.phone + ""]
        }
        this.axios.post("msg/sendVerificationCodeNoLogin", Msg).then((res) => {
          this.time = 60;
          this.disabled = true;
          this.isshow = false,
          this.timer();
          // this.$alert("验证码已发送", '提示', {
          //   confirmButtonText: '确定',
          // })
        })
      }
    },

    login_btn() {
      if (this.phone == '' && this.verif == "") {
        this.phones = true;
        this.phonea = "手机号码不能为空";
        this.verifs = true;
        this.verifa = "验证码不能为空";
      } else if (this.phone != '' && this.verif == "") {
        this.phones = false;
        this.phonea = "";
        this.verifs = true;
        this.verifa = "验证码不能为空";
      } else if (this.phone == '' && this.verif !== "") {
        this.phones = true;
        this.phonea = "手机号码不能为空";
        this.verifs = false;
        this.verifa = "";
      } else {
        var that = this;
        var msgs={
          bizType : this.biz,
          phone : this.phone,
          verificationCode: this.verif
        }
        this.axios.post('msg/verifyRandomCodeNoLogin', msgs).then((res) => {
          if (!!res) {
            that.$router.push({ path: "forgetpwd3", query: { phone: that.phone } });
          } else {
            that.phone = '';
            that.verif = '';
            that.verifs = true;
            that.verifa = "验证码错误";
          }
        })
      }
    },
    timer() {
      if (this.time > 0) {
        this.time--;
        this.btntxt = this.time + "s后重新获取";
        setTimeout(this.timer, 1000);
        $('#fg').css({"background": "D1D1D1"})
      } else {
        this.time = 0;
        this.btntxt = "获取验证码";
        this.disabled = false;
        this.isshow = true,
        $('#fg').css({"background": "009FE2"})
      }
    },
    query() {
      var formMess = this.formMess
      this.axios.post("/order/select/reception", formMess).then((res) => {
        this.productResult = res;
        this.productResult.length = 3;
      });
    },
    data: function () {
      return {
        disabled: false,
        isshow : true,
        time: 0,
        btntxt: "获取验证码",
        formMess: {
          email: this.email,
          phone: this.phone
        }
      }
    },
    phoneq() {
      var reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.phone == '') {
        this.phones = true;
        this.phonea = "手机号码不能为空";
      } else if (!reg.test(this.phone)) {
        this.phones = true;
        this.phonea = "手机号码格式不正确";
      } else {
        this.phones = true;
        this.phonea = "";
        var that = this;
        this.axios.get('customer/checkPhone/' + that.phone).then((res) => {
          if (!!res) {
            that.phones = true;
            that.phonea = '当前手机号码与账号不匹配';
          } else {
            that.phones = false;
            that.phonea = '';
          }
        });
      }
    },
    verifq() {
      if (this.verif == "") {
        this.verifs = "true";
        this.verifa = "验证码不能为空";
      } else {
        this.verifs = "false";
        this.verifa = "";
      }
    },
  }
}
