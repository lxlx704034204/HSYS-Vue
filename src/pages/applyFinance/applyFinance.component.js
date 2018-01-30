export default {
	name: 'applyFinance',
	components: {},
	props: [],
	data() {
		return {
			ruleForm: {
				financingCode: '',
				mobile: '',
				companyName: '',
				userName: '',
			},
			financing:[],
		};
	},
	created() {
		this.$store.state.headerType = 9;
		 this.financing = this.$util.getCodeMap("FINANCING");
		 console.log(this.financing);
	},
	methods: {
		submitForm(formName) {
			var that = this;
			console.log(this.ruleForm, 'ggg')
			if(this.ruleForm.financingCode == '') {
				$('#edu').focus();
				this.$message({
          message: '请选择金融额度',
          type: 'warning'
        });
			} else if(this.ruleForm.mobile == '') {
				$("input[name='mobile']").focus();
				this.$message({
          message: '手机号码不能为空',
          type: 'warning'
        });
			} else if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.ruleForm.mobile))) {
				$("input[name='mobile']").focus();
				this.$message({
          message: '请输入正确手机号',
          type: 'warning'
        });
			} else if(this.ruleForm.companyName == '') {
				$("input[name='companyNameName']").focus();
				this.$message({
          message: '公司不能为空',
          type: 'warning'
        });
			} else if(this.ruleForm.userName == '') {
				$("input[name='userName']").focus();
				this.$message({
          message: '姓名不能为空',
          type: 'warning'
        });
			} else {
				this.axios.post("financing/add",{
					financingCode: this.ruleForm.financingCode,
					mobile: this.ruleForm.mobile,
					companyName: this.ruleForm.companyName,
					userName: this.ruleForm.userName,
				})
				.then(function(data) {
						that.$alert('提交成功', '提示', {
							confirmButtonText: '确定',
							type: 'success',
						}).then(() => {
							that.$router.push('/financial')
		       	}).catch(() => {
		       	
		        });
				});
			}
		},
	},
}