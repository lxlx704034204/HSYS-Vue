export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 6) {
        callback(new Error('密码必须6个字符以上'));
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        pass: '',
        checkPass: '',
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    };
  },
  created () {
    // 调用数据
    var urlId = this.$route.path;
    this.$store.commit("switchHeaderType", 3);
  },
  methods: {
    submitForm(formName) {
      var phones = this.$route.query.phone;
      var pass = this.ruleForm2.pass;
      if(this.ruleForm2.pass == this.ruleForm2.checkPass){
        var that = this;
        this.axios.put('updatepaw?phone='+ phones +'&paw='+ pass).then((res) => {
          that.$router.push({ path: "forgetpwd4"});
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}