export default {
  name: 'recharge',
  components: {},
  props: [],
  data() {
		return {
			amount:'',
			paymentCode:'',
			bankmsg:'',
			bank:'',
			bankName:'',
			bankAddress:'',
			bankAccount:'',
			notice:'',
			ruleForm:{
				amount: '',
			},
			imageUrl:'',
			upload: this.axios.defaults.baseURL + "upload",
			maxamount:'',  // 最多充值
		};
  },
  created() {
		// this.$store.state.headerType = 7;
		this.$store.commit("switchHeaderType", 7);
  	var that = this;
	that.axios.get("accountapply/recharge")
	.then(function(data) {
		console.log(data,'oo');
    	that.myacc  = data;
		that.amount = that.myacc.amount ;
		that.phone = that.myacc.phone;
		that.maxamount = data.maxAmount;
		if(that.amount == null || that.amount == undefined){
			that.amount = '0';
		}
		that.paymentCode = that.myacc.paymentCode;
		that.bankmsg 		 = data.platformBank;
		that.bank 			 = that.bankmsg.bank;
		that.bankName 	 = that.bankmsg.bankName;
		that.bankAddress = that.bankmsg.bankAddress;
		that.bankAccount = that.bankmsg.bankAccount;
	});
  },
  computed: {

  },
  mounted() {

  },
  methods: {
  	handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isGIF = file.type === 'image/gif';
        const isPNG = file.type === 'image/png';
     	const isLt2M = file.size / 1024 / 1024 < 1;

      if (!isJPG && !isGIF && !isPNG ) {
        this.$message.error('上传头像图片是 JPG,GIF,PNG,JPEG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!');
      }
      return (isJPG || isPNG || isGIF)&& isLt2M;
    },
//	提交
		applymon(){
			var g = /^[1-9]*[1-9][0-9]*$/;  
       		var money =  g.test(this.ruleForm.amount);
       		if(money){
				if(this.ruleForm.amount > this.maxamount ){
					this.notice = '按照国家法律规定，本平台每个用户最多充值5000元，您目前的充值额度已经超出限定。您目前最多能充值'+this.maxamount+'元。'
					$('#input1').focus();
				} else {
					this.notice = ''
					var that = this;
					that.axios.post("accountapply/apply",{
						amount: that.ruleForm.amount,
						paymentCode: that.paymentCode,
						picture: that.imageUrl,
					},{params:{'noInterceptor': 1}})
					.then(function(data) {
						if(data.code == 0){
							console.log(data,'dad');
							that.$alert('申请成功，请等待审核', '提示', {
									confirmButtonText: '确定',
									type: 'success',
								}).then(() => {
								that.$router.push('/companycenter/myasset')
				       	    }).catch(() => {
					       	
					        });
						}else{
							that.$alert(data.msg, '提示', {
									confirmButtonText: '确定',
									type: 'warning',
								}).then(() => {
				       	    }).catch(() => {
					       	
					        });
						}
						
					});
				}
       		}else{
       			if(this.ruleForm.amount == ''){
					this.notice = '请输入正确的金额!'
					$('#input1').focus();
				}else{
       				this.notice = '请输入整数金额!';
       				$('#input1').focus();
				}
       		}
			
		},
//		发送到手机
		tophone(){
			var g = /^[1-9]*[1-9][0-9]*$/;  
       		var money =  g.test(this.ruleForm.amount);
       		if(money){
				if(this.ruleForm.amount>this.maxamount || this.ruleForm.amount/1 < 0 ){
					this.notice = '按照国家法律规定，本平台每个用户最多充值5000元，您目前的充值额度已经超出限定。您目前最多能充值'+this.maxamount+'元。'
					$('#input1').focus();
				}else if(this.ruleForm.amount == ''){
					this.notice = '请输入正确的金额!'
					$('#input1').focus();
				}else if(this.ruleForm.amount != ''){
					this.notice = '';
					var that = this;
					that.axios({
				    method: 'post',
				    url: "msg/send",
				    headers: {
				        'Content-type': 'multipart/form-data'
				    },
				    params: {
				        'markCode': that.paymentCode,
				        'money': that.ruleForm.amount,
				        'noInterceptor': 1
				    }
					})
					.then((response) => {
				    	console.log(response,'response');
				      that.$alert('发送付款信息成功', '提示', {
								confirmButtonText: '确定',
								type: 'success',
							});
				    })
				    .catch((error) => {
				        console.log(error);
				    }
					);
				}
       		}else{
       			if(this.ruleForm.amount == ''){
					this.notice = '请输入正确的金额!'
					$('#input1').focus();
				}else{
       				this.notice = '请输入整数金额!';
					$('#input1').focus();

				}
       		}
			
		},
//		输入金额失焦
		inputmon(){
			var g = /^[1-9]*[1-9][0-9]*$/;  
       		var money =  g.test(this.ruleForm.amount); 
       		if(this.ruleForm.amount != ''){
       			if(money){
					if(this.ruleForm.amount> this.maxamount){
						this.notice = '按照国家法律规定，本平台每个用户最多充值5000元，您目前的充值额度已经超出限定。您目前最多能充值'+this.maxamount+'元。'
					}else{
						this.notice = ''
					}
	       		}else{
	          		this.notice = '请输入整数金额!';
	       		}
       		}else{
          		this.notice = '请输入正确的金额!';

       		}
       		
       		
		}
  }
}
