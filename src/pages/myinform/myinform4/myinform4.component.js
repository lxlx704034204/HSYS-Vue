import storage from "store2";
export default {
    name: 'myinform',
    components: {},
    props: [],
    data() {
        return {
            form: {},
            name: "",
            num: "",
            phone: "",
            phone1: "",
            phone2: "",
            phone3: "",
            phonea: "",
            phone1: "",
            phonea1: "",
            phones: false,
            phones1: false,
            phones2: false,
            phones3: false,
            phones1: false,
            btntxt: "获取验证码",
            disabled: false,
            time: 0,
            per: [],
            biz: 1,
            verif: '',
            verif1: '',
            verifs: false,
            verifa: '',
            verifs1: false,
            verifa1: '',
            pwd: "",
            pwd1: "",
            pwd2: "",
            floag: false,
            flage: false,
        }
    },
    computed: {

    },
    created() {
        this.name = storage.get("userName");
        this.num = storage.get("mobileNo");
    },
    mounted() {

    },
    methods: {
        code() {
            this.phones = false;
            this.phone = "";
            var that = this;
            this.axios.post('msg/sendVerificationCodePhone', {
                    msgType: '1',
                    bizType: "3",
                    phones: [that.num]
                }).then(function(data) {
                    that.time = 60;
                    that.disabled = true;
                    that.timer();
                })
                .catch(error => console.log(error))
        },
        timer() {
            if (this.time > 0) {
                this.time--;
                this.btntxt = this.time + "s后重新获取";
                setTimeout(this.timer, 1000);
                document.getElementById('fg1').style.background = '#D1D1D1';
            } else {
                this.time = 0;
                this.btntxt = "获取验证码";
                this.disabled = false;
                document.getElementById('fg1').style.background = '#009FE2';
            }
        },
        data: function() {
            return {
                disabled: false,
                time: 0,
                btntxt: "获取验证码"
            }
        },

        ph2() {
            if (this.pwd == "") {
                this.phone1 = "您的当前密码不能为空";
                this.phones1 = true;
            } else {
                this.phone1 = "";
                this.phones1 = false;
            }
        },
        ph3() {
            if (this.pwd1 == "") {
                this.phone2 = "您的新密码不能为空";
                this.phones2 = true;
            } else if (this.pwd1.length < 4 || this.pwd1.length > 15) {
                this.phone2 = "请设置4到15位长度密码";
                this.phones2 = true;
            } else {
                this.phone2 = "";
                this.phones2 = true;
            }
        },
        ph4() {
            if (this.pwd2 == "") {
                this.phone3 = "您的确认密码不能为空";
                this.phones3 = true;
            } else if (this.pwd2 != this.pwd1) {
                this.phone3 = "两次密码不一致";
                this.phones3 = true;
            } else {
                this.phone3 = "";
                this.phones3 = false;
            }
        },
        cancel() {
            this.$router.push({ path: '/companycenter/myinform' })
        },
        prese() {
            if (this.pwd != "" && this.pwd1 != "" && this.pwd2 != "" && this.verif1 != "") {
                var that = this;
                this.axios.post("msg/verifyRandomCode", {
                        bizType: 3,
                        phone: this.num,
                        verificationCode: this.verif1,
                    }).then(function(data) {
                        if (data == true) {
                            that.axios.put("password", {
                                    id: sessionStorage.id,
                                    oldPassword: that.pwd,
                                    password: that.pwd1,
                                    confirmPassword: that.pwd2,
                                    phone: that.num,
                                    verificationCode: that.verif1
                                }).then(function(data) {
                                    if (data == null) {
                                        that.$alert('修改成功', '提示', {
                                            confirmButtonText: '确定',
                                            type: 'success',
                                            callback: action => {
                                                that.$router.push({ path: '/companycenter/myinform' })
                                            }
                                        });
                                    } else {
                                        that.$message.error(data.msg);
                                    }
                                })
                                .catch(error => console.log(error))
                        } else {
                            that.$message.error('验证码输入错误,请重新输入');
                        }
                    })
                    .catch(error => console.log(error))
            } else {
                this.$message.error("请填写相关信息");
            }
        }
    }
}