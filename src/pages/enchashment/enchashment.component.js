export default {
  name: 'enchashment',
  components: {},
  props: [],
  data() {
		return {
			btntxt: "获取验证码",
      time: 0,
      disabled: false,
      cusBank:'',
      bank:'',
      accountName:'',
      accountNo:'',
      avaliableAmount:'',
      phone:'',
      needMoy:'',
      notices:'',
      codenum:'',
      putremind:'',
		};
  },
  created() {
    // this.$store.state.headerType = 8;
    this.$store.commit("switchHeaderType", 8);
  	var that = this;
  	this.axios.get("account/with")
		.then(function(data) {
      console.log(data,'data');
				that.cusBank 				 = data.customerBank;
		    that.bank 					 = that.cusBank.bank;
		    that.accountName 		 = that.cusBank.accountName;
		    that.accountNo 			 = that.cusBank.accountNo;
		    that.avaliableAmount = data.avaliableAmount;
		    that.phone					 = data.phone;
		});
  },
  computed: {
		
  },
  mounted() {

  },
  methods: {
  	//  	验证手机号码部分
    sendcode() {
    	console.log(this.needMoy);
       var g = /^[1-9]*[1-9][0-9]*$/;  
       var money =  g.test(this.needMoy); 
    	if(this.needMoy <= this.avaliableAmount && money ){
    		var that = this;
    		that.axios.post("msg/sendVerificationCode",{
    			bizType: "OTHER",
          phones: [that.phone],
    		})
				.then(function(data) {
          console.log(data);
						that.time = 60;
     			  that.disabled = true;
      			that.timer();
				});
    	} else{
				$('#input_enc').focus();
    	}
    },
    timer() {
      if (this.time > 0) {
        this.time--;
        this.btntxt = this.time + "s后重新获取";
        setTimeout(this.timer, 1000);
        $('#btn_enc').css('background','#D1D1D1');
        $('#btn_enc').css('border','#D1D1D1 1px solid')
        
      } else {
        this.time = 0;
        this.btntxt = "获取验证码";
        this.disabled = false;
        $('#btn_enc').css('background','#009FE2');
        $('#btn_enc').css('border','#009FE2 1px solid')
        
      }
    },
    //		输入金额失焦
		inputmon(){
       var g = /^[1-9]*[1-9][0-9]*$/;  
       var money =  g.test(this.needMoy); 
       if(money){
        if(this.needMoy > this.avaliableAmount){
          this.notices = '请输入正确提现金额';
        }else{
          this.notices = '';
        }
       }else{
            if(this.needMoy == ''){
              this.notices = '请输入提现金额';
            }else{
              this.notices = '请输入整数金额';

            }
       }
      
		},
    // 申请提现
    withdrap(){
    	var g = /^[1-9]*[1-9][0-9]*$/;  
      var money =  g.test(this.needMoy); 
       
      if(this.needMoy == ''){
        this.notices = '请输入提现金额';
        $('#input_enc').focus();
      } else if(!money){
        this.notices = '请输入正确提现金额';
        $('#input_enc').focus();
      } else if(this.needMoy > this.avaliableAmount){
        this.notices = '请输入正确提现金额';
        $('#input_enc').focus();
      } else if(this.codenum == ''){
      	$('.put_moy22').focus();
        this.putremind = '请输入验证码';
      } else if(this.needMoy <= this.avaliableAmount ){
        var that = this;
        that.axios.post("accountapply/withdraw",{
          amount: this.needMoy/1,
          code: this.codenum,
        },{params:{noInterceptor:1}})
        .then(function(data) {
          console.log(data,'data');
          if(data.code == 0){
            that.putremind = '';
            that.$alert('您的提现申请已提交，我们会尽快为您提现。', '提示', {
              confirmButtonText: '确定',
              type: 'success',
            }).then(() => {
              that.$router.push('/companycenter/myasset')
            }).catch(() => {
              
            });
          }else{
            that.putremind = data.msg
          }
     
        });
      } else{
        $('#input_enc').focus();
      }
    }
  }
}
