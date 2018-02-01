export default {
    name: 'register',
    components: {},
    props: [],
    data() {
        return {
            btntxt: "获取验证码",
            time: 0,
            disabled: false,
            ruleForm: {
                login: '',
                password: '',
                confirmPassword: '',
                mobileNo: '',
                verificationCode: '',
                //				同意用户协议
                checkbox: '',
            },
        };
    },
    created() {
        var urlId = this.$route.path;
        this.$store.commit("switchHeaderType", 4);
    },
    computed: {

    },
    mounted() {

    },
    methods: {
        //  	验证手机号码部分
        sendcode() {
            var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
            if (this.ruleForm.mobileNo == '') {
                $(".regis_prompt4").html("手机号不能为空")
            } else if (!reg.test(this.ruleForm.mobileNo)) {
                $(".regis_prompt4").html("输入正确的手机号")
            } else {
                var that = this;
                this.axios.get('customer/checkPhone/' + this.ruleForm.mobileNo).then((res) => {
                    if (!res) {
                        $(".regis_prompt4").html("该手机号已使用")
                    } else {
                        that.time = 60;
                        that.disabled = true;
                        that.timer();
                        var msgs = {
                            msgType: 1,
                            bizType: 0,
                            phones: [that.ruleForm.mobileNo],
                        }
                        this.axios.post('msg/sendVerificationCodeNoLogin', msgs).then((res) => {
                            // if (!res) {
                            //     that.$alert('验证码已发送！', '提示', {
                            //         confirmButtonText: '确定',
                            //         type: 'success'
                            //     })
                            // }
                        });
                    }
                });
            }
        },
        timer() {
            if (this.time > 0) {
                this.time--;
                this.btntxt = this.time + "s后重新获取";
                setTimeout(this.timer, 1000);
                $(this.$refs.sendcodebtn).css("background", "#D1D1D1");
                $(this.$refs.sendcodebtn).css("border", "#D1D1D1 1px solid");
            } else {
                this.time = 0;
                this.btntxt = "获取验证码";
                this.disabled = false;
                $(this.$refs.sendcodebtn).css("background", "#009FE2");
                $(this.$refs.sendcodebtn).css("border", "#009FE2 1px solid");
            }
        },
        submitForm() {
            if (this.ruleForm.login == '') {
                this.$message({
                    message: '账户名称不能为空',
                    type: 'warning'
                });
            } else if (this.ruleForm.login.length < 4 || this.ruleForm.password.length > 15) {
                this.$message({
                    message: '6-15个字符,由字母,数字组成',
                    type: 'warning'
                });
            } else if (this.ruleForm.password == '') {
                this.$message({
                    message: '密码不能为空',
                    type: 'warning'
                });
            } else if (this.ruleForm.password.length < 6 || this.ruleForm.password.length > 15) {
                this.$message({
                    message: '请设置6-15位的密码',
                    type: 'warning'
                });
            } else if (this.ruleForm.confirmPassword == '') {
                this.$message({
                    message: '请再次确认密码',
                    type: 'warning'
                });
            } else if (this.ruleForm.confirmPassword != this.ruleForm.password) {
                this.$message({
                    message: '两次密码输入不一致请重新输入',
                    type: 'warning'
                });
            } else if (this.ruleForm.mobileNo == '') {
                this.$message({
                    message: '手机号码不能为空',
                    type: 'warning'
                });
            } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.ruleForm.mobileNo))) {
                this.$message({
                    message: '请输入正确手机号',
                    type: 'warning'
                });
            } else if (this.ruleForm.verificationCode == '') {
                this.$message({
                    message: '请输入验证码',
                    type: 'warning'
                });
            } else if (this.ruleForm.checkbox == false || this.ruleForm.checkbox == '') {
                this.$message({
                    message: '请阅读并同意用户协议',
                    type: 'warning'
                });
            } else {
                var that = this;
                var msgs = {
                    bizType: 0,
                    phone: that.ruleForm.mobileNo,
                    verificationCode: that.ruleForm.verificationCode
                }
                if (!/^[0-9a-zA-Z_]+$/.test(this.ruleForm.login)) {
                    $(".regis_prompt1").html("账户只能有英文字母、数字和_组成");
                    return false;
                }
                this.axios.post('msg/verifyRandomCodeNoLogin', msgs).then((res) => {
                    if (!res) {
                        that.$message({
                            message: '手机号或验证码错误',
                            type: 'warning'
                        });
                    } else {
                        this.axios.post("customer/register", that.ruleForm).then((res) => {
                            if (res && res.code && res.code.toString() !== "0") {
                                that.$alert(res.msg, '提示', {
                                    confirmButtonText: '确定',
                                    type: 'error',
                                })
                                return false;
                            } else {
                                that.$message({
                                    message: '注册成功',
                                    type: 'success'
                                });
                                that.$router.push('/login')
                            }
                            // that.$alert('注册成功', '提示', {
                            //     confirmButtonText: '确定',
                            //     type: 'success',
                            // }).then(() => {
                            //     that.$router.push('/login')
                            // })
                        });
                    }
                });
            }
        },
        corporatename() {
            if (this.ruleForm.login == "") {
                $(".regis_prompt1").html("账户不能为空")
            } else if (this.ruleForm.login.length < 6 || this.ruleForm.login.length > 15) {
                $(".regis_prompt1").html("6-15个字符,由字母,数字组成")
            } else {
                if (!/^[0-9a-zA-Z_]+$/.test(this.ruleForm.login)) {
                    $(".regis_prompt1").html("账户只能有英文字母、数字和_组成");
                    return false;
                }
                var that = this;
                $(".regis_prompt1").html("")
                this.axios.get("user/checkLogin/" + that.ruleForm.login).then((res) => {
                    if (!res) {
                        $(".regis_prompt1").html("账户名称已经被注册")
                    } else {
                        $(".regis_prompt1").html("")
                    }
                }, (rej) => {
                    $(".regis_prompt1").html("rej", rej.msg)
                });
            }
        },
        pwd() {
            var reg = /^\w{5,14}$/;
            if (this.ruleForm.password == "") {
                $(".regis_prompt2").html("密码不能为空")
            } else if (!reg.test(this.ruleForm.password)) {
                $(".regis_prompt2").html("请设置6-15位的密码")
            } else {
                $(".regis_prompt2").html("")
            }
        },
        pwds() {
            var reg = /^\w{5,14}$/;
            if (this.ruleForm.confirmPassword == "") {
                $(".regis_prompt3").html("确认密码不能为空")
            } else if (!reg.test(this.ruleForm.confirmPassword)) {
                $(".regis_prompt3").html("请设置6-15位的密码")
            } else if (this.ruleForm.password != this.ruleForm.confirmPassword) {
                $(".regis_prompt3").html("两次密码输入不一致请重新输入")
            } else {
                $(".regis_prompt3").html("")
            }
        },
        phone() {
            var reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
            if (this.ruleForm.mobileNo == '') {
                $(".regis_prompt4").html("请填写手机号码")
            } else if (!reg.test(this.ruleForm.mobileNo)) {
                $(".regis_prompt4").html("手机号码格式不正确")
            } else {
                $(".regis_prompt4").html("")
                var that = this;
                this.axios.get('customer/checkPhone/' + that.ruleForm.mobileNo).then((res) => {
                    if (!res) {
                        $(".regis_prompt4").html("该手机号已使用")
                    }
                }, (rej) => {
                    that.$alert(data.msg, '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    })
                });
            }
        },
        verif() {
            if (this.ruleForm.verificationCode == "") {
                $(".regis_prompt5").html("验证码不能为空")
            } else {
                $(".regis_prompt5").html("")
            }
        },
    }
}