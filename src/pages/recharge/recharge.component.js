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
		};
  },
  created() {
  	this.$store.state.headerType = 7;
  	var that = this;
	that.axios.get("account/recharge")
	.then(function(data) {
		console.log(data,'oo');
    	that.myacc  = data;
		that.amount = that.myacc.amount ;
		that.phone = that.myacc.phone;
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
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
//	提交
		applymon(){
			if(this.ruleForm.amount/1 + this.amount/1 > 5000|| this.ruleForm.amount/1 < 0 ||this.ruleForm.amount/1 == '' ){
				this.notice = '请输入正确金额!'
				$('#input1').focus();
			} else if(this.imageUrl == ''){
				this.$message({
            message: '请上传付款凭证',
            type: 'warning'
        });
			}else {
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
		},
//		发送到手机
		tophone(){
			if(this.ruleForm.amount/1+this.amount/1 > 5000 || this.ruleForm.amount/1 < 0 || this.ruleForm.amount == ''){
				this.notice = '请输入正确金额!'
				$('#input1').focus();
			} else if(this.ruleForm.amount != ''){
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
		},
//		输入金额失焦
		inputmon(){
			var g = /^[1-9]*[1-9][0-9]*$/;  
       		var money =  g.test(this.ruleForm.amount); 
       		console.log(money);
       		if(money){
						// this.notice = '';
						if(this.ruleForm.amount/1+ this.amount/1 > 5000){
							this.notice = '您输入的金额已超过5000元'
						}else if(this.ruleForm.amount == ''){
							this.notice = '请输入正确金额!'
						}else{
							this.notice = ''
						}
       		}else{
          		this.notice = '请输入正确金额!';
       		}
       		
		}
  }
}
